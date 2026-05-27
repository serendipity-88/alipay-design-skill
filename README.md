# Alipay Design Skill

面向 coding agent 的支付、金融、生活服务类 UI 设计 Skill，覆盖移动端 H5、小程序和 Web 后台。

它把公开设计规范、开源组件库、页面模式、Design Token、代码模板和质量验证脚本组织成一套可执行工作流，帮助 Agent 生成更稳定、更像真实产品的界面代码。

## 能力概览

- **多端覆盖**：H5、小程序、Web 后台
- **场景判断**：先识别用户角色、业务目标、情绪状态和信息密度
- **页面模式**：结果页、表单、列表、详情、营销承接、活动运营、教育引导等
- **组件映射**：匹配 `antd-mobile`、`antd-mini`、`antd`、`@ant-design/pro-components`
- **视觉规范**：品牌色、语义色、字号、4px 间距系统、圆角、阴影、动效参数
- **代码模板**：内置 19 份可改造模板，覆盖移动端和 Web 后台常见页面
- **质量验证**：检查平台混用、旧色值、内联样式、非标间距、状态缺失等问题

## 适合做什么

- 支付结果页、收银台、收付款、签约确认等交易链路页面
- 优惠券、商家列表、活动承接、生活服务运营页面
- 登录、搜索、消息、卡包、我的等移动端基础页面
- Web 后台的表格查询、表单、分步表单、详情页、设置页、成员列表、工作项列表
- 需要支付、金融、服务类产品气质的原型、Demo 或可运行页面

## 工作流

1. **场景理解**：谁在用、刚做了什么、要完成什么目标、情绪状态如何
2. **平台判断**：H5、小程序还是 Web 后台
3. **设计意图**：选择页面模式、信息密度和视觉策略
4. **资源匹配**：选择模板、页面模式、组件规范和 Token
5. **组件拆解**：先列组件树、数据接口、状态和事件
6. **代码生成**：按目标平台使用正确组件库和 Token
7. **质量验证**：通过 checklist 和脚本检查常见问题

## 和直接使用组件库的差异

组件库提供组件能力，Skill 提供面向 Agent 的设计决策流程。

| 问题 | 直接使用组件库 | 使用这个 Skill |
|------|----------------|----------------|
| 页面该怎么组织 | 需要自己判断 | 根据场景匹配页面模式 |
| 多端怎么选 | 需要查不同文档 | 先判断 H5 / 小程序 / Web |
| 视觉层级怎么定 | 容易写成普通后台或普通列表 | 使用支付服务类页面的层级、间距和情绪策略 |
| 业务状态是否完整 | 容易遗漏 | 检查 loading / empty / error 等状态 |
| 代码是否符合平台 | 依赖人工 review | 脚本检查平台混用和常见反模式 |

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

Skill 目录内资源都使用相对路径，例如 `references/design-intent.md`、`references/templates/web-table-query.tsx`。如果你的 Agent 不支持自动解析 Skill 目录，请让它以 `SKILL.md` 所在目录作为 `<skill-dir>`。

## 示例请求

- “用支付服务风格做一个 H5 转账成功页”
- “设计一个附近优惠商家列表页”
- “做一个交易流水查询页面，Web 后台，要有筛选和导出”
- “用 antd-mini 做一个小程序地址编辑页”
- “做一个生活服务活动承接页 Demo”

## 平台与组件库

| 平台 | 组件库 |
|------|--------|
| H5 手机网页 | `antd-mobile` v5 |
| 小程序 | `antd-mini` v3 |
| Web 后台 / PC | `antd` v5 + `@ant-design/pro-components` |

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

生成 `.tsx` 或 `.html` 后，可运行静态检查脚本：

```bash
bash alipay-design/scripts/verify-design.sh <output-file>
```

如果 Skill 已安装到某个 Agent 的技能目录，请把 `alipay-design` 替换为实际的 `<skill-dir>`。

## 来源与许可

本项目基于公开设计资料和开源组件库进行 Skill 化整理，面向学习、原型和代码生成场景。相关产品名和商标归各自权利人所有。

MIT License，详见 [alipay-design/LICENSE](alipay-design/LICENSE)。第三方归属说明见 [alipay-design/NOTICE](alipay-design/NOTICE)。
