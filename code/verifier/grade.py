"""Grader — the ONLY file permitted to read `_ground_truth`.

It loads dataset.json, quarantines `_ground_truth` into a side table keyed
by id, hands verify() a row with that key physically removed, then scores
the verifier and the naive baseline against the hand-labels.
"""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from verify import verify  # noqa: E402

DATASET = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "dataset.json")

GT_CLASSES = ["SEAM", "not-seam", "indet", "excl"]
VERIFIER_PRED_COLS = ["SEAM", "not-SEAM", "indeterminate"]


def baseline(row):
    """Strongest trivial heuristic: a linked merged PR => claim seam.

    No indeterminate class. Returns predicted_seam: bool.
    """
    return row["has_linked_merged_pr"] is True


def gt_is_positive(gt):
    return gt == "SEAM"


def fmt_ratio(num, den):
    if den == 0:
        return "n/a (0/0)"
    return "%.3f (%d/%d)" % (num / den, num, den)


def main():
    with open(DATASET) as f:
        rows = json.load(f)

    # Quarantine ground truth.
    ground_truth = {}
    stripped_rows = []
    for r in rows:
        rid = r["id"]
        gt = r["_ground_truth"]
        ground_truth[rid] = gt
        clean = dict(r)
        del clean["_ground_truth"]          # physically removed
        assert "_ground_truth" not in clean
        stripped_rows.append(clean)

    results = []
    api_failures = []
    for clean in stripped_rows:
        rid = clean["id"]
        out = verify(clean)
        disp = out["disposition"]
        reason = out["reason"]
        if disp == "indeterminate" and "github compare failed" in reason:
            api_failures.append((rid, clean["fix_repo"], reason))
        results.append({
            "id": rid,
            "issue_repo": clean["issue_repo"],
            "channel": clean["channel"],
            "has_pr": clean["has_linked_merged_pr"],
            "disposition": disp,
            "reason": reason,
            "baseline_pred": baseline(clean),
            "gt": ground_truth[rid],
        })

    # ---- Verifier confusion 4x3 ----
    vmat = {g: {c: 0 for c in VERIFIER_PRED_COLS} for g in GT_CLASSES}
    for res in results:
        g = res["gt"]
        if res["disposition"] == "fix-NOT-yet-installable":
            col = "SEAM"
        elif res["disposition"] == "indeterminate":
            col = "indeterminate"
        else:  # fix-IS-in-installable-release
            col = "not-SEAM"
        vmat[g][col] += 1

    # ---- Verifier binary (positive class = SEAM) ----
    v_tp = v_fp = v_fn = v_tn = 0
    for res in results:
        pos_gt = gt_is_positive(res["gt"])
        pred_pos = res["disposition"] == "fix-NOT-yet-installable"
        if pos_gt and pred_pos:
            v_tp += 1
        elif not pos_gt and pred_pos:
            v_fp += 1
        elif pos_gt and not pred_pos:
            v_fn += 1
        else:
            v_tn += 1

    # ---- Baseline binary ----
    b_tp = b_fp = b_fn = b_tn = 0
    bmat = {g: {"seam": 0, "not-seam": 0} for g in GT_CLASSES}
    for res in results:
        pos_gt = gt_is_positive(res["gt"])
        pred_pos = res["baseline_pred"] is True
        bmat[res["gt"]]["seam" if pred_pos else "not-seam"] += 1
        if pos_gt and pred_pos:
            b_tp += 1
        elif not pos_gt and pred_pos:
            b_fp += 1
        elif pos_gt and not pred_pos:
            b_fn += 1
        else:
            b_tn += 1

    # ---- indeterminate-rate per GT class (verifier) ----
    per_class_total = {g: 0 for g in GT_CLASSES}
    per_class_indet = {g: 0 for g in GT_CLASSES}
    for res in results:
        per_class_total[res["gt"]] += 1
        if res["disposition"] == "indeterminate":
            per_class_indet[res["gt"]] += 1

    # ---- SEAM-decisiveness sanity gate (ids 1..5) ----
    seam_ids = [1, 2, 3, 4, 5]
    indecisive = [
        r["id"] for r in results
        if r["id"] in seam_ids and r["disposition"] == "indeterminate"
    ]
    gate_passed = len(indecisive) == 0

    # ---- Verdict ----
    def prec(tp, fp):
        return None if (tp + fp) == 0 else tp / (tp + fp)

    def rec(tp, fn):
        return None if (tp + fn) == 0 else tp / (tp + fn)

    v_prec, v_rec = prec(v_tp, v_fp), rec(v_tp, v_fn)
    b_prec, b_rec = prec(b_tp, b_fp), rec(b_tp, b_fn)

    if not gate_passed:
        verdict = "INCONCLUSIVE-gate-failed"
    else:
        # "beats baseline" = strictly higher precision at >= equal recall,
        # the metric that matters for a false-positive filter.
        vp = -1.0 if v_prec is None else v_prec
        bp = -1.0 if b_prec is None else b_prec
        vr = -1.0 if v_rec is None else v_rec
        br = -1.0 if b_rec is None else b_rec
        if vp > bp and vr >= br:
            verdict = "GREEN-verifier-beats-baseline"
        else:
            verdict = "RED-does-not-beat-baseline"

    # ================= OUTPUT =================
    print("=" * 72)
    print("UPSTREAM-FIX VERIFICATION PRIMITIVE — v0.1 GRADING")
    print("=" * 72)
    print("dataset: %s rows (n=36)" % len(rows))
    print("CAVEAT: n=36 from a deliberately seam-biased pool; "
          "precision/recall are NOT a population base rate.")
    print()

    if not gate_passed:
        print("!" * 72)
        print("!! SEAM-DECISIVENESS GATE: FAILED")
        print("!! Indeterminate GT==SEAM ids: %s" % indecisive)
        print("!! VERDICT IS INCONCLUSIVE — re-run the spike; do NOT read")
        print("!! these numbers as a result.")
        print("!" * 72)
    else:
        print("SEAM-DECISIVENESS GATE: PASSED "
              "(ids 1-5 all got a decisive disposition)")
    print()

    print("-" * 72)
    print("PRECISION / RECALL  (positive class = SEAM)")
    print("-" * 72)
    print("%-12s %-22s %-22s" % ("", "VERIFIER", "BASELINE"))
    print("%-12s %-22s %-22s" % (
        "TP", v_tp, b_tp))
    print("%-12s %-22s %-22s" % ("FP", v_fp, b_fp))
    print("%-12s %-22s %-22s" % ("FN", v_fn, b_fn))
    print("%-12s %-22s %-22s" % ("TN", v_tn, b_tn))
    print("%-12s %-22s %-22s" % (
        "precision", fmt_ratio(v_tp, v_tp + v_fp),
        fmt_ratio(b_tp, b_tp + b_fp)))
    print("%-12s %-22s %-22s" % (
        "recall", fmt_ratio(v_tp, v_tp + v_fn),
        fmt_ratio(b_tp, b_tp + b_fn)))
    print()

    print("-" * 72)
    print("VERIFIER CONFUSION MATRIX  (rows=GT, cols=predicted)")
    print("-" * 72)
    hdr = "%-10s" % "GT\\pred"
    for c in VERIFIER_PRED_COLS:
        hdr += "%-15s" % c
    print(hdr)
    for g in GT_CLASSES:
        line = "%-10s" % g
        for c in VERIFIER_PRED_COLS:
            line += "%-15s" % vmat[g][c]
        print(line)
    print()

    print("-" * 72)
    print("BASELINE CONFUSION MATRIX  (rows=GT, cols=baseline pred)")
    print("-" * 72)
    print("%-10s%-15s%-15s" % ("GT\\pred", "seam", "not-seam"))
    for g in GT_CLASSES:
        print("%-10s%-15s%-15s" % (
            g, bmat[g]["seam"], bmat[g]["not-seam"]))
    print()

    print("-" * 72)
    print("INDETERMINATE-RATE PER GT CLASS (verifier)")
    print("-" * 72)
    for g in GT_CLASSES:
        tot = per_class_total[g]
        ind = per_class_indet[g]
        rate = "n/a" if tot == 0 else "%.3f" % (ind / tot)
        print("%-10s %2d/%-2d  rate=%s" % (g, ind, tot, rate))
    print()

    print("-" * 72)
    print("PER-ROW RESULTS")
    print("-" * 72)
    print("%-3s %-34s %-14s %-6s %-26s %-7s %-9s" % (
        "id", "issue_repo", "channel", "has_pr",
        "verifier_disposition", "base", "gt"))
    for res in results:
        print("%-3s %-34s %-14s %-6s %-26s %-7s %-9s" % (
            res["id"], res["issue_repo"][:34], res["channel"],
            str(res["has_pr"]), res["disposition"],
            str(res["baseline_pred"]), res["gt"]))
    print()
    print("PER-ROW VERIFIER REASONS")
    for res in results:
        print("  [%2d] %s" % (res["id"], res["reason"]))
    print()

    if api_failures:
        print("-" * 72)
        print("GITHUB API FAILURES (%d)" % len(api_failures))
        print("-" * 72)
        for rid, repo, reason in api_failures:
            print("  [%2d] %s :: %s" % (rid, repo, reason))
    else:
        print("GITHUB API FAILURES: none")
    print()

    print("=" * 72)
    print("VERDICT: %s" % verdict)
    print("  verifier precision=%s recall=%s" % (
        "n/a" if v_prec is None else "%.3f" % v_prec,
        "n/a" if v_rec is None else "%.3f" % v_rec))
    print("  baseline precision=%s recall=%s" % (
        "n/a" if b_prec is None else "%.3f" % b_prec,
        "n/a" if b_rec is None else "%.3f" % b_rec))
    print("=" * 72)

    if not gate_passed:
        sys.exit(2)


if __name__ == "__main__":
    main()
