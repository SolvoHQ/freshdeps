"""One-shot LIVE supply-yield scan for problem #70.

Sources real GitHub issues via the pre-registered Issues Search query
(product/supply-yield-live-test.md section 0a), enriches each with minimal
one-shot logic (channel / fix_sha / release_tag), runs them through the
frozen #67 verifier verify.py as-is, and dumps raw results.

Hard caps (section 0b): <=60 issues, <=400 core API calls, <=15 min
wall-clock, stop cleanly on rate-limit (HTTP 403/429). No hand-filtering,
no editing of verify.py. Stdlib only, matching verify.py's style.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

GITHUB_API = "https://api.github.com"

PRE_REG_QUERY = (
    '("not been released" OR "not released yet" OR "hasn\'t been released" '
    'OR "not yet been released" OR "please cut a release") '
    'is:issue created:>=2026-04-16'
)

MAX_ISSUES = 60
MAX_API_CALLS = 400
MAX_WALL_SECONDS = 15 * 60

OUT_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..",
    "product", "artifacts", "supply-scan-raw-70.json"
)

# verify.py lives in the same directory.
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from verify import verify  # noqa: E402


class RateLimited(Exception):
    """Raised when GitHub returns 403/429 -> stop the run cleanly."""


class CallCounter(object):
    def __init__(self):
        self.n = 0

    def bump(self):
        self.n += 1


COUNTER = CallCounter()


def _gh_get(path, accept="application/vnd.github+json"):
    """GET {GITHUB_API}{path}. Returns (status_code, parsed_json_or_None).

    Counts every call against the core-API budget. Raises RateLimited on
    403/429 so the caller can stop cleanly and record the binding cap.
    """
    COUNTER.bump()
    url = GITHUB_API + path
    req = urllib.request.Request(url)
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    req.add_header("Accept", accept)
    req.add_header("User-Agent", "solvo-supply-yield-scan")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            status = resp.getcode()
            raw = resp.read()
    except urllib.error.HTTPError as e:
        if e.code in (403, 429):
            raise RateLimited("HTTP %s on %s" % (e.code, path))
        return e.code, None
    try:
        return status, json.loads(raw.decode("utf-8"))
    except (ValueError, UnicodeDecodeError):
        return status, None


def source_issues():
    """Run the pre-registered search query; return first MAX_ISSUES items."""
    items = []
    page = 1
    while len(items) < MAX_ISSUES:
        qs = urllib.parse.urlencode({
            "q": PRE_REG_QUERY,
            "sort": "created",
            "order": "desc",
            "per_page": 100,
            "page": page,
        })
        status, body = _gh_get("/search/issues?" + qs)
        if status != 200 or not isinstance(body, dict):
            break
        page_items = body.get("items") or []
        if not page_items:
            break
        items.extend(page_items)
        total = body.get("total_count", 0)
        if len(items) >= total:
            break
        page += 1
        if page > 3:  # 3 pages * 100 = 300 >> 60; safety stop
            break
    return items[:MAX_ISSUES]


def detect_channel(repo):
    """Root contents -> channel by manifest precedence."""
    status, body = _gh_get("/repos/%s/contents/" % repo)
    if status != 200 or not isinstance(body, list):
        return "out-of-channel"
    names = set()
    for entry in body:
        if isinstance(entry, dict) and entry.get("type") == "file":
            names.add(entry.get("name"))
    if "Cargo.toml" in names:
        return "crates"
    if "package.json" in names:
        return "npm"
    if ("pyproject.toml" in names or "setup.py" in names
            or "setup.cfg" in names):
        return "pypi"
    return "out-of-channel"


def find_fix(repo, issue_number):
    """Scan issue timeline (first page) for the most recent merged same-repo
    PR linked via cross-reference / closing event.

    Returns (fix_sha, pr_url, pr_base_ref) or (None, None, None).
    """
    status, body = _gh_get(
        "/repos/%s/issues/%s/timeline?per_page=100" % (repo, issue_number)
    )
    if status != 200 or not isinstance(body, list):
        return None, None, None

    pr_numbers = []
    for ev in body:
        if not isinstance(ev, dict):
            continue
        etype = ev.get("event")
        if etype == "cross-referenced":
            src = ev.get("source") or {}
            issue = src.get("issue") or {}
            pr = issue.get("pull_request")
            repo_obj = issue.get("repository") or {}
            full = repo_obj.get("full_name")
            if pr and full == repo and isinstance(issue.get("number"), int):
                pr_numbers.append(issue["number"])
        elif etype in ("closed", "merged"):
            commit_id = ev.get("commit_id")
            # closing/merge events sometimes carry a direct commit; the
            # spec wants a merged PR's merge_commit_sha, so we still rely
            # on the PR lookup below where a PR is referenced.
            if commit_id and ev.get("event") == "merged":
                pass

    best = None  # (number, sha, pr_url, base_ref)
    for num in sorted(set(pr_numbers), reverse=True):
        st, pr = _gh_get("/repos/%s/pulls/%s" % (repo, num))
        if st != 200 or not isinstance(pr, dict):
            continue
        if pr.get("merged") and pr.get("merge_commit_sha"):
            base_ref = (pr.get("base") or {}).get("ref")
            best = (num, pr["merge_commit_sha"], pr.get("html_url"),
                    base_ref)
            break  # numbers desc => first merged is most recent
    if best is None:
        return None, None, None
    return best[1], best[2], best[3]


def get_release_tag(repo):
    """Latest release tag; fallback to newest tag; else None."""
    status, body = _gh_get("/repos/%s/releases/latest" % repo)
    if status == 200 and isinstance(body, dict):
        tag = body.get("tag_name")
        if tag:
            return tag
    status, body = _gh_get("/repos/%s/tags?per_page=1" % repo)
    if status == 200 and isinstance(body, list) and body:
        first = body[0]
        if isinstance(first, dict):
            return first.get("name")
    return None


def cap_check(start_time):
    """Return a cap-name string if a hard cap is exceeded, else None."""
    if COUNTER.n >= MAX_API_CALLS:
        return "api-calls (%d >= %d)" % (COUNTER.n, MAX_API_CALLS)
    if (time.time() - start_time) >= MAX_WALL_SECONDS:
        return "wall-clock (>= %d s)" % MAX_WALL_SECONDS
    return None


def main():
    start = time.time()
    cap_bound = None

    try:
        issues = source_issues()
    except RateLimited as e:
        # Could not even source -> report cleanly with empty candidates.
        out = {
            "query": PRE_REG_QUERY,
            "n_surfaced": 0,
            "cap_that_bound": "rate-limit during sourcing: %s" % e,
            "api_calls_used": COUNTER.n,
            "wall_clock_seconds": round(time.time() - start, 2),
            "candidates": [],
        }
        _write(out)
        _print_summary(out)
        return

    candidates = []
    for idx, issue in enumerate(issues):
        if idx >= MAX_ISSUES:
            cap_bound = "issue-count (%d)" % MAX_ISSUES
            break
        c = cap_check(start)
        if c:
            cap_bound = c
            break

        repo_url = issue.get("repository_url", "") or ""
        # repository_url -> https://api.github.com/repos/owner/name
        issue_repo = repo_url.split("/repos/", 1)[-1] if repo_url else None
        number = issue.get("number")
        reporter = (issue.get("user") or {}).get("login")
        issue_url = issue.get("html_url")
        issue_title = issue.get("title")

        row = {
            "issue_url": issue_url,
            "issue_title": issue_title,
            "reporter": reporter,
            "issue_repo": issue_repo,
            "channel": None,
            "fix_sha": None,
            "fix_repo": issue_repo,
            "release_tag": None,
            "pr_url": None,
            "pr_base_ref": None,
        }

        try:
            if not issue_repo or number is None:
                raise ValueError("missing issue_repo or number")
            row["channel"] = detect_channel(issue_repo)
            fix_sha, pr_url, pr_base_ref = find_fix(issue_repo, number)
            row["fix_sha"] = fix_sha
            row["pr_url"] = pr_url
            row["pr_base_ref"] = pr_base_ref
            row["release_tag"] = get_release_tag(issue_repo)
        except RateLimited as e:
            cap_bound = "rate-limit: %s" % e
            # verify the partial row, append, then stop the loop.
            _verify_into(row)
            candidates.append(row)
            break
        except Exception as e:  # noqa: BLE001 - one bad issue must not abort
            row["enrich_error"] = "%s: %s" % (type(e).__name__, e)

        _verify_into(row)
        candidates.append(row)

    if cap_bound is None:
        cap_bound = "issue-count (processed all %d surfaced)" % len(issues)

    out = {
        "query": PRE_REG_QUERY,
        "n_surfaced": len(issues),
        "cap_that_bound": cap_bound,
        "api_calls_used": COUNTER.n,
        "wall_clock_seconds": round(time.time() - start, 2),
        "candidates": candidates,
    }
    _write(out)
    _print_summary(out)


def _verify_into(row):
    """Call frozen verify() on the row; record disposition + reason."""
    try:
        v = verify({
            "channel": row.get("channel"),
            "fix_sha": row.get("fix_sha"),
            "release_tag": row.get("release_tag"),
            "fix_repo": row.get("fix_repo"),
        })
        row["verifier_disposition"] = v.get("disposition")
        row["verifier_reason"] = v.get("reason")
    except Exception as e:  # noqa: BLE001
        row["verifier_disposition"] = "indeterminate"
        row["verifier_reason"] = "verify() raised %s: %s" % (
            type(e).__name__, e)


def _write(out):
    path = os.path.abspath(OUT_PATH)
    with open(path, "w") as f:
        json.dump(out, f, indent=2)
    return path


def _print_summary(out):
    cands = out["candidates"]
    by_disp = {}
    for c in cands:
        d = c.get("verifier_disposition") or "MISSING"
        by_disp[d] = by_disp.get(d, 0) + 1

    print("=== SUPPLY-YIELD LIVE SCAN SUMMARY (#70) ===")
    print("query: %s" % out["query"])
    print("n_surfaced: %d" % out["n_surfaced"])
    print("cap_that_bound: %s" % out["cap_that_bound"])
    print("api_calls_used: %d" % out["api_calls_used"])
    print("wall_clock_seconds: %s" % out["wall_clock_seconds"])
    print("count by disposition:")
    for d in sorted(by_disp):
        print("  %s: %d" % (d, by_disp[d]))

    passing = [c for c in cands
               if c.get("verifier_disposition") == "fix-NOT-yet-installable"]
    print("PASSING SET (fix-NOT-yet-installable) n=%d:" % len(passing))
    if not passing:
        print("  (none)")
    for c in passing:
        print("  - %s | reporter=%s | repo=%s | channel=%s | "
              "fix_sha=%s | release_tag=%s | disp=%s" % (
                  c.get("issue_url"), c.get("reporter"),
                  c.get("issue_repo"), c.get("channel"),
                  c.get("fix_sha"), c.get("release_tag"),
                  c.get("verifier_disposition")))
    print("=== END SUMMARY ===")


if __name__ == "__main__":
    main()
