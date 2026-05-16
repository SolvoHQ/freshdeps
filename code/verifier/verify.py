"""Deterministic upstream-fix verification primitive.

verify(row) decides whether a merged upstream fix is already in an
installable release, or not yet. It NEVER sees `_ground_truth` — grade.py
strips that key before calling. This module does not reference it at all.

The actual discriminator (is the fix commit an ancestor of the release tag)
is computed LIVE against the GitHub compare API on fix_repo. No "already
shipped" conclusion is ever copied in from a dataset field.
"""

import json
import os
import urllib.error
import urllib.request

GITHUB_API = "https://api.github.com"

DISPOSITION_NOT_INSTALLABLE = "fix-NOT-yet-installable"
DISPOSITION_IN_RELEASE = "fix-IS-in-installable-release"
DISPOSITION_INDETERMINATE = "indeterminate"


def _toggle_v_prefix(tag):
    if tag.startswith("v"):
        return tag[1:]
    return "v" + tag


def _gh_get(path):
    """GET {GITHUB_API}{path}. Returns (status_code, parsed_json_or_None).

    A non-200 or unparseable body yields (status, None). Network/other
    exceptions raise urllib.error.URLError / OSError to the caller.
    """
    url = GITHUB_API + path
    req = urllib.request.Request(url)
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("User-Agent", "solvo-upstream-fix-verifier")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            status = resp.getcode()
            raw = resp.read()
    except urllib.error.HTTPError as e:
        return e.code, None
    try:
        return status, json.loads(raw.decode("utf-8"))
    except (ValueError, UnicodeDecodeError):
        return status, None


def _resolve_full_sha(fix_repo, short_sha):
    """Resolve a (possibly short) sha to its full sha via the commits API.

    Returns the full sha string, or None on any failure.
    """
    status, body = _gh_get("/repos/%s/commits/%s" % (fix_repo, short_sha))
    if status == 200 and isinstance(body, dict):
        full = body.get("sha")
        if isinstance(full, str) and full:
            return full
    return None


def _compare(fix_repo, base, head):
    """GitHub compare base...head. Returns (status, status_str_or_None).

    status_str is the API `status` field ("ahead"/"behind"/"identical"/
    "diverged") on a 200 with a parseable body, else None.
    """
    status, body = _gh_get(
        "/repos/%s/compare/%s...%s" % (fix_repo, base, head)
    )
    if status == 200 and isinstance(body, dict):
        st = body.get("status")
        if isinstance(st, str):
            return status, st
        return status, None
    return status, None


def verify(row):
    """Pure-ish decision function (network reads only, no GT access).

    Returns {"disposition": <str>, "reason": <str>}.
    """
    if "_ground_truth" in row:
        # Hard anti-circularity guard: verify must never receive GT.
        raise RuntimeError(
            "verify() received a row containing _ground_truth; "
            "grade.py must strip it before calling."
        )

    channel = row.get("channel")
    fix_sha = row.get("fix_sha")
    release_tag = row.get("release_tag")
    fix_repo = row.get("fix_repo")

    # Rule 1
    if channel == "out-of-channel":
        return {
            "disposition": DISPOSITION_INDETERMINATE,
            "reason": "out-of-scope channel",
        }

    # Rule 2
    if not fix_sha:
        return {
            "disposition": DISPOSITION_INDETERMINATE,
            "reason": "no identifiable merged fix commit",
        }

    # Rule 3
    if not release_tag:
        return {
            "disposition": DISPOSITION_INDETERMINATE,
            "reason": "cannot resolve installable release tag",
        }

    # Rule 4 — live ancestry via GitHub compare on fix_repo.
    tried = []

    def attempt(base, head):
        st_code, st_str = _compare(fix_repo, base, head)
        tried.append("compare %s...%s -> HTTP %s%s" % (
            base, head, st_code, "" if st_str is None else (" " + st_str)))
        return st_code, st_str

    st_code, st_str = attempt(release_tag, fix_sha)

    # 404 fallback: toggle the v-prefix on the release tag.
    if st_str is None and st_code == 404:
        st_code, st_str = attempt(_toggle_v_prefix(release_tag), fix_sha)

    # 404 fallback: short sha -> resolve full sha, retry both tag forms.
    if st_str is None and st_code == 404:
        full = _resolve_full_sha(fix_repo, fix_sha)
        if full and full != fix_sha:
            st_code, st_str = attempt(release_tag, full)
            if st_str is None and st_code == 404:
                st_code, st_str = attempt(_toggle_v_prefix(release_tag), full)

    if st_str is None:
        # ANY non-200 after all fallbacks => indeterminate. NEVER infer.
        return {
            "disposition": DISPOSITION_INDETERMINATE,
            "reason": "github compare failed (last HTTP %s); %s"
            % (st_code, " | ".join(tried)),
        }

    # status is relative to base=release_tag, head=fix_sha.
    #   "behind"    => head is behind base => fix is reachable from tag
    #   "identical" => fix == tag commit   => fix is in the tag
    #   "ahead"     => head ahead of base  => fix NOT in tag
    #   "diverged"  => fix not an ancestor => fix NOT in tag
    if st_str in ("behind", "identical"):
        return {
            "disposition": DISPOSITION_IN_RELEASE,
            "reason": "fix_sha is an ancestor of %s (compare status=%s)"
            % (release_tag, st_str),
        }
    if st_str in ("ahead", "diverged"):
        return {
            "disposition": DISPOSITION_NOT_INSTALLABLE,
            "reason": "fix_sha not in %s (compare status=%s)"
            % (release_tag, st_str),
        }

    return {
        "disposition": DISPOSITION_INDETERMINATE,
        "reason": "unrecognized compare status=%r" % (st_str,),
    }
