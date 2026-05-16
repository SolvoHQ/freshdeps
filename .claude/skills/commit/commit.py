"""Solvo commit ritual: enforces product-impact + note + tick-id in message.

Per V4 doc 5.5 — every workspace mutation goes through this skill so the
message carries the agent's reading of what changed and how it shifts the
product. V4.1 adds a `tick-id` trailer so commits can be correlated with
heartbeat ticks after the fact.
"""
import os
import subprocess
from pathlib import Path
from typing import Literal


ProductImpact = Literal["none", "refines-shape", "shifts-direction"]


def _stage_all(workspace_path: Path) -> None:
    """Stage every real change without letting unreadable junk abort it.

    `git add .` also walks untracked files, and in sync/FUSE-mounted
    workspaces that means git tries to index OS-locked conflict copies
    (e.g. `name 2.md`) and dies with EDEADLK / exit 128 — taking the
    whole commit down with it. Instead: stage tracked changes in one
    pass (this never touches untracked files, so it cannot hit the
    locked copies), then add the untracked files, degrading to per-file
    adds so a single unreadable path is skipped rather than fatal.
    """
    ws = str(workspace_path)
    subprocess.run(["git", "-C", ws, "add", "-u"], check=True)
    listed = subprocess.run(
        ["git", "-C", ws, "ls-files", "--others", "--exclude-standard", "-z"],
        check=True,
        capture_output=True,
        text=True,
    )
    untracked = [p for p in listed.stdout.split("\0") if p]
    if not untracked:
        return
    if subprocess.run(["git", "-C", ws, "add", "--", *untracked]).returncode == 0:
        return
    for path in untracked:
        subprocess.run(["git", "-C", ws, "add", "--", path])

# Owner GitHub identity. All Solvo agents commit as the project owner
# so the work shows up on their contribution graph; per-workspace
# attribution rides in the Co-authored-by trailer below. cli.py also
# reads these constants when emitting GIT_AUTHOR_*/GIT_COMMITTER_* env
# vars to the container, so any nested git init the agent does inherits
# the same identity automatically.
OPERATOR_NAME = "west0nG"
OPERATOR_EMAIL = "westonguo@outlook.com"


def commit(
    title: str,
    body: str,
    product_impact: ProductImpact,
    note: str,
    workspace_path: Path,
) -> None:
    if product_impact not in ("none", "refines-shape", "shifts-direction"):
        raise ValueError(
            "product_impact must be one of "
            "none/refines-shape/shifts-direction; got "
            f"{product_impact!r}"
        )
    tick_id = os.environ.get("SOLVO_TICK_ID", "n/a")
    # Resolve before .name so a relative path like "." or a trailing-
    # slash path doesn't collapse the slug to empty (which silently
    # produces a `Co-authored-by: solvo- <…>` trailer with no agent ID).
    workspace_slug = Path(workspace_path).resolve().name
    if not workspace_slug:
        raise ValueError(
            f"workspace_path resolved to empty slug: {workspace_path!r}"
        )
    message = (
        f"{title}\n\n{body}\n\n"
        f"---\n"
        f"product-impact: {product_impact}\n"
        f"note: {note}\n"
        f"tick-id: {tick_id}\n"
        f"\n"
        f"Co-authored-by: solvo-{workspace_slug} <agent@foundagent.net>\n"
    )
    subprocess.run(
        ["git", "-C", str(workspace_path), "config", "user.name", OPERATOR_NAME],
        check=True,
    )
    subprocess.run(
        ["git", "-C", str(workspace_path), "config", "user.email", OPERATOR_EMAIL],
        check=True,
    )
    _stage_all(Path(workspace_path))
    subprocess.run(
        ["git", "-C", str(workspace_path), "commit", "-m", message],
        check=True,
    )
