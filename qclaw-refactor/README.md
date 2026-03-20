# QClaw ChatRebuildView Refactor Draft

这个目录提供了一个针对 `bluegitter/QClaw` 仓库中
`src/v0.1.1/src/renderer/src/views/ChatRebuildView.vue` 的拆分式重构草案。

目标：

- 将主视图缩减为“页面装配层”；
- 把消息区、输入区、模型设置、技能管理、远控面板、关于面板拆成独立组件；
- 把系统设置 Tab 状态抽到 composable；
- 把共享结构抽到 `types.ts`，方便后续继续迁移原始业务逻辑。

> 说明：当前工作区没有原始 QClaw 源码，因此这里采用镜像目录方式提供可落地的模块拆分骨架，便于后续迁回目标仓库。
