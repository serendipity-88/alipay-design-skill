# Alipay Design Skill

让 coding agent 生成更接近真实支付、金融、生活服务产品的界面，而不是停留在“把组件摆上去”的层面。

Alipay Design Skill 不是组件库，也不是设计规范的简单搬运，而是为 agent 准备的一套「产品设计判断力」。当你说“做一个转账成功页”“做一个交易查询后台”“做一个附近优惠商家页”时，agent 不应该立刻开始写卡片和按钮，而应该先判断用户刚经历了什么、页面要承接哪种情绪、信息密度应该多高、应该使用移动端还是 Web 后台，以及哪些业务状态不能遗漏。

组件库解决的是“有什么组件”。Alipay Design Skill 解决的是“什么时候该用什么结构、什么层级、什么语气，以及最终交付的页面是否像一个可信的支付服务产品”。

## 为什么做这个

现在的 coding agent 已经很会写 React，也很会调用 `antd`、`antd-mobile` 这类组件库。但一到真实业务界面，生成结果经常会暴露出几个问题：

- 把结果页写成普通信息卡片，缺少完成后的情绪承接
- 把运营页写成堆满卡片的活动海报，缺少信任递进和行动路径
- 把后台页写成通用 CRUD，缺少筛选、状态、空态、权限和批量操作的完整性
- 在 H5、小程序、Web 后台之间混用组件、单位和交互习惯
- 视觉上看起来“能跑”，但不像一个成熟支付产品

Alipay Design Skill 把这些判断前置成工作流：先理解场景，再选择页面模式、组件体系、视觉 token 和代码模板，最后通过检查脚本完成交付前自检。

## 适合谁

如果你经常让 agent 生成支付、金融、生活服务、电商交易、运营承接、商户后台、管理端表单这类页面，Alipay Design Skill 会很有用。

典型适用场景包括：

- 移动端支付结果页、收银台、签约确认、活动承接页
- 优惠券、附近商家、会员权益、安全教育等生活服务页面
- Web 后台的表格查询、分步表单、单据详情、成员管理、设置页
- 需要“支付服务类产品气质”的原型、Demo 或可运行页面

Alipay Design Skill 不试图替代设计师，也不试图替代组件库。这个项目的价值在于，把一部分高频、稳定、可复用的产品设计判断交给 agent，让第一次生成就更接近可评审的版本。

## 工作方式

Skill 被触发后，会按一条相对固定的路径推进：

1. 先判断用户角色、业务目标和情绪状态
2. 再判断目标平台：H5、小程序还是 Web 后台
3. 根据场景选择页面模式和信息密度
4. 读取对应的组件映射、Design Token、页面策略和代码模板
5. 写代码前先拆组件树、数据结构、状态和事件
6. 生成平台正确、状态完整、可继续开发的代码
7. 用 checklist 和脚本检查常见问题

这套流程的重点不是让 agent “多问几句”，而是减少低级判断错误：该克制的时候克制，该承接情绪的时候承接情绪，该补状态的时候补状态。

## 和直接使用 Ant Design 的差异

Ant Design、Ant Design Mobile、Ant Design Mini 和 Pro Components 提供了很好的组件与设计基础。Alipay Design Skill 是面向 agent 的上层工作流，把公开规范、组件习惯、页面模式和业务场景组织成可执行的生成过程。

简单说：

| 直接使用组件库 | 使用 Alipay Design Skill |
| --- | --- |
| 你告诉 agent 用哪个组件 | 先帮助 agent 判断页面应该怎么组织 |
| 关注单个组件是否正确 | 关注完整页面是否像真实业务 |
| 容易遗漏 loading / empty / error | 把状态完整性放进交付检查 |
| 多端差异靠人工提醒 | 先区分 H5 / 小程序 / Web 后台 |
| 输出常常像通用模板 | 输出更接近支付服务类产品语境 |

## 安装

### Claude Code

个人级安装：

```bash
cp -R alipay-design ~/.claude/skills/alipay-design
```

项目级安装：

```bash
mkdir -p .claude/skills
cp -R alipay-design .claude/skills/alipay-design
```

### Codex

```bash
cp -R alipay-design ~/.codex/skills/alipay-design
```

### 其他 Coding Agent CLI

把 `alipay-design/` 作为完整 Skill 目录安装，并保留目录内的相对路径：

```text
alipay-design/
  SKILL.md
  references/
  assets/
  scripts/
```

Skill 目录内资源都使用相对路径，例如 `references/design-intent.md`、`references/templates/web-table-query.tsx`。如果你的 Agent 不支持自动解析 Skill 目录，请以 `SKILL.md` 所在目录作为 `<skill-dir>`。

## 示例

你可以这样使用：

```text
用 alipay-design 做一个 H5 转账成功页，要有优惠承接和完成按钮
```

```text
用 alipay-design 做一个 Web 后台交易流水查询页，要有筛选、导出、空态和错误态
```

```text
用 alipay-design 设计一个附近优惠商家列表页，偏生活服务运营场景
```

## 目录结构

```text
alipay-design/
├── SKILL.md
├── LICENSE
├── NOTICE
├── agents/
├── assets/
├── references/
│   ├── design-intent.md
│   ├── design-philosophy.md
│   ├── page-patterns.md
│   ├── page-strategies.md
│   ├── mobile-components.md
│   ├── mobile-tokens.md
│   ├── web-components.md
│   ├── web-tokens.md
│   └── templates/
└── scripts/
    └── verify-design.sh
```

## 质量验证

生成 `.tsx` 或 `.html` 后，可以运行静态检查脚本：

```bash
bash alipay-design/scripts/verify-design.sh <output-file>
```

脚本会检查平台混用、旧色值、emoji 图标、inline style、非标间距、纯黑阴影、卡片描边、三态缺失等问题。

## 来源与许可

本项目基于公开设计资料和开源组件库进行 Skill 化整理，面向学习、原型和代码生成场景。相关产品名和商标归各自权利人所有。

MIT License，详见 [alipay-design/LICENSE](alipay-design/LICENSE)。第三方归属说明见 [alipay-design/NOTICE](alipay-design/NOTICE)。
