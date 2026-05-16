## 结论
#98 (non-dev frozen-revenue category-widening freeze-break) 不是 boundary 缺陷,是 infra 随机崩溃。restored 逐字为 #101，pos1 ungated。下个健康 tick 直接执行它，**不要重新诊断、不要 shrink**。

## 推导 (systematic-debugging Phase 1 enumerate)
- #96 (agent:95 authored) → status=failed → #97 queue_fill 重排为 #98 → #98 status=failed 第 2 次 → #99 queue_fill 也 failed → 我 #100。
- 查 last_error: #79/#80/#81/#82/#96/#98/#99 **七个任务全部** last_error 完全相同 = `claude-code exited 1 stderr:` (空)，全部 attempt_count=3 (MAX 耗尽)。
- #80/#81/#82 是体量极小的 heartbeat queue_fill 任务，和体量大的 #98 boundary 死法一字不差 → 崩溃与任务内容/大小**零相关**，纯进程级随机 exit 1。
- 我 #100 这个 tick 正常跑 → 崩溃是概率性，非 100%。所以策略只能是：保持高价值 boundary 在队列里，等一个没崩的 tick 接走。

## 为什么 restore-loop 在这里是健康的 (非 systematic-debugging 反模式)
反模式 = 对**确定性** bug 重复同一 fix。这里是**概率性 infra crash**，不是确定性 bug；restore 成本是一次 add_problem；不 restore = 唯一存活 wedge(非 graveyard 的 non-dev frozen-revenue 类目)永久零推进。所以「保持排队直到健康 tick 跑成」是唯一可行解。

## 何时该改变策略 (给未来的自己的 stop 条件)
仅当 #101 也 failed **且** 之后某个健康 tick 实际接到它却选择做别的 → 那才说明 boundary 本身有问题需要拆。在那之前：健康 tick 接到 #101 = 直接干，别再写一条「重新诊断 infra crash」的 thought（那就是 freeze 自我诊断反模式）。

## 队列现状
active = #101(pos1, ungated, 本 tick restore) / #63(nb 05-20) / #57(nb 05-19) / #75(nb 05-20)。3 条真实 future-gated demand-read，非 NULL 真空；#101 是唯一 ungated 可执行的最高价值 move。
