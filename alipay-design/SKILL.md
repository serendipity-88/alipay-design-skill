---
name: alipay-design
description: |
  支付宝设计风格与支付、金融、生活服务类 UI 设计 Skill。
  用于生成或评审 H5、小程序、Web 后台界面；会先判断场景、平台、页面模式和信息密度，
  再选择 antd-mobile、antd-mini、antd、@ant-design/pro-components 与 Design Token。
  当用户明确提到支付宝风格、蚂蚁/Ant Design 体系、支付结果、收银台、商家优惠、
  生活服务运营页、交易查询、金融/支付后台时触发；泛泛说"做个页面"时先确认是否采用本规范。
user-invocable: true
---

# 支付宝设计规范

## 执行规则

本 Skill 包含多个 **Checkpoint**（标记为 `> **Checkpoint**`）。Checkpoint 是自检质量门：必须在继续前完成检查。只有当关键信息缺失且无法合理推断时，才向用户追问；如果用户需求已经足够明确，就直接推进。

## 资源路径约定

本 Skill 面向多个 coding agent CLI 分发。所有资源路径都相对于本 `SKILL.md` 所在目录解析，不绑定 Claude Code、Codex 或任何特定安装目录。

- 读取资料时使用 `references/...`
- 读取模板时使用 `references/templates/...`
- 运行脚本时使用 `<skill-dir>/scripts/...`
- 如果当前 Agent 支持技能目录变量，可以用该变量代替 `<skill-dir>`

## Pass 0: 场景理解

在做任何设计决策之前，先回答以下问题。能从用户请求合理推断的就直接补全；只有影响平台、主流程或视觉策略的关键信息缺失时才追问：

1. **谁在用？** 用户角色（新用户/老用户/商户/运营）
2. **什么场景？** 用户刚做了什么、即将做什么
3. **核心目标？** 这个页面要解决什么问题
4. **情绪状态？** 用户此刻的感受（成功/受阻/中性/焦虑）

> **Checkpoint**: 以上 4 点已明确或有合理默认值后，才进入 Phase 1。

## Phase 1: 确定平台

根据用户意图判断目标平台，不确定时询问：

| 关键词 | 平台 | 组件库 |
|--------|------|--------|
| H5、手机网页、移动端页面 | H5 | `antd-mobile` v5 |
| 小程序、支付宝小程序 | 小程序 | `antd-mini` v3 |
| 后台、管理端、Web、PC | Web | `antd` v5 + `@ant-design/pro-components` |
| 原型、低保真设计 | 按目标平台选择 | 同上 |

## Phase 2: 设计意图与视觉规范

先读取 `references/design-intent.md`，根据 Pass 0 的场景和情绪，选择视觉策略和信息密度级别。

> **Checkpoint**: 选定情绪类型和信息密度级别后才继续。

再读取 `references/design-philosophy.md`。核心哲学是 **"轻Design"**：轻灵、自然、年轻。内容优先，减少视觉噪音。

### 五大页面模式

| 模式 | 典型场景 | 视觉策略 |
|------|----------|----------|
| 情绪头部型 | 支付结果、收付款 | 大面积品牌渐变 + 情绪反馈 + 主操作 |
| 信息密集型 | 首页、理财、频道页 | 头部认知锚点 + 卡片流 + 功能入口 |
| 轻量列表型 | 消息、我的、卡包 | 浅色头部 + 列表内容 + 安静层级 |
| 沉浸暗色型 | 视频、图片内容 | 暗背景 + 内容优先 + 克制操作 |
| 极简表单型 | 登录、搜索、表单 | 留白 + 单任务聚焦 + 少装饰 |

### 关键视觉规则

- **卡片用阴影而非描边**：`box-shadow: 0 4px 12px rgba(90, 110, 149, 0.12)`
- **圆角按场景递进**：小元素小圆角，大元素大圆角。情绪头部型主卡片 20-24px，信息密集型主卡片 12-16px，极简表单型尽量克制卡片
- **间距基于 4px 系统**：xs=4, sm=8, md=12, lg=16, xl=24, xxl=32
- **减少分割线**，用间距、背景和卡片层级替代
- **动效有节制**：标准过渡 300ms + `cubic-bezier(0.4, 0, 0.2, 1)`
- **AI 场景**可用蓝紫渐变：`linear-gradient(135deg, #1677FF, #7B61FF)`

### 品牌色与语义色

| 语义 | 色值 |
|------|------|
| 品牌主色 | `#1677ff` |
| 成功 | `#00b578`（移动）/ `#52c41a`（Web） |
| 警告 | `#ff8f1f`（移动）/ `#faad14`（Web） |
| 危险/错误 | `#ff3141`（移动）/ `#ff4d4f`（Web） |
| 主文本 | `#333333` |
| 次要文本 | `#666666` |
| 辅助文本 | `#999999` |
| 边框 | `#eeeeee`（H5）/ `#e5e5e5`（小程序） |
| 背景 | `#f5f5f5` |

## Phase 3: 参考到代码 Pipeline

每步有明确产出，不得跳步。公开版以 **代码模板 + 页面模式 + 组件规范 + Design Token** 构成工作流。

### Step 1: 匹配资源

读取 `references/templates/README.md`，选择最接近的页面类型。同时按平台读取：

| 资源 | 何时读取 |
|------|----------|
| `references/page-patterns.md` | 需要页面结构、布局范式、表单/列表/结果页策略 |
| `references/page-strategies.md` | 需要业务目标、内容组合、用户心智 |
| `references/mobile-components.md` | H5 / 小程序组件选择 |
| `references/mobile-tokens.md` | H5 / 小程序 token 和单位 |
| `references/web-components.md` | Web 后台组件选择 |
| `references/web-tokens.md` | Web 后台 token 和主题 |

**优先级**：代码模板 > 页面模式 + 组件规范 > 设计理念 CSS 骨架。

### Step 2: 组件拆解

在写代码前，先拆解出：

1. **组件树**：页面由哪些组件嵌套组成
2. **组件映射**：每个组件对应哪个库组件，或需要自定义
3. **数据接口**：定义 TypeScript interface，明确动态区域的数据结构
4. **状态与事件**：列出选中、加载、空、错误和用户操作

示例格式：

```text
组件树:
├── GradientHeader
├── BenefitCard
├── CategoryTabs
├── MerchantList
│   └── MerchantCard
└── BottomAction

数据接口:
interface Merchant { name: string; distance: number; benefits: string[] }

状态: selectedTab, merchants[], loading, error, hasMore
```

> **Checkpoint**: 组件树、数据接口、状态与事件都已明确后，才进入 Step 3。

### Step 3: 代码骨架

1. 按组件树创建 JSX / AXML 结构
2. 按目标平台选择正确组件库和单位
3. 用 `[A]`~`[F]` 插槽标记可替换内容区域
4. 优先将样式整理到 CSS Modules、className 或 CSS variables

### Step 4: 视觉与状态检查

- [ ] 页面模式与场景匹配
- [ ] 色值来自 Design Token 或本 Skill 约定
- [ ] 间距来自 4px 系统
- [ ] 圆角、阴影和层级一致
- [ ] loading / empty / error 状态完整
- [ ] 平台组件没有混用

> **Checkpoint**: 检查通过后才交付代码。

## 模板索引

### 移动端模板

| 页面 | 文件 | 设计模式 |
|------|------|----------|
| 支付结果页 | `references/templates/payment-result.tsx` | 情绪头部型 |
| 轻触支付页 / 确认付款页 | `references/templates/tap-to-pay-payment.tsx` | 沉浸教育型 |
| 红包承接页 | `references/templates/reward-landing.tsx` | 营销承接型 |
| 受阻教育页 | `references/templates/blocked-education.tsx` | 情绪安抚型 |
| 附近优惠商家页 | `references/templates/nearby-merchants.tsx` | 活动运营型 |
| 集卡活动页 | `references/templates/card-collection.tsx` | 活动运营型 |
| 安全感教育页 | `references/templates/security-education.tsx` | 长页面教育型 |
| 服务频道首页 | `references/templates/tap-to-pay-hub.tsx` | 信息密集型 |

### Web 模板

| 页面 | 文件 | 设计模式 |
|------|------|----------|
| 表格查询页 | `references/templates/web-table-query.tsx` | ProTable 查询 |
| 基础表单页 | `references/templates/web-basic-form.tsx` | ProForm 表单 |
| 分步表单页 | `references/templates/web-step-form.tsx` | StepsForm 分步 |
| 单据详情页 | `references/templates/web-detail-page.tsx` | ProDescriptions + Timeline |
| 成功结果页 | `references/templates/web-success-result.tsx` | Result 结果 |
| 成员列表页 | `references/templates/web-member-list.tsx` | ProTable 成员管理 |
| 可编辑列表页 | `references/templates/web-editable-list.tsx` | EditableProTable |
| 设置页 | `references/templates/web-settings.tsx` | Tabs 设置面板 |
| 搜索页 | `references/templates/web-search.tsx` | 搜索结果列表 |
| 左右布局页 | `references/templates/web-split-layout.tsx` | 左列表右详情 |
| 工作项列表页 | `references/templates/web-work-item-list.tsx` | StatisticCard + ProList |

## Phase 4: 组件选择与代码生成

根据平台读取对应参考文件：

- **H5 / 小程序**：读取 `references/mobile-components.md` + `references/mobile-tokens.md`
- **Web**：读取 `references/web-components.md` + `references/web-tokens.md`
- **页面模式参考**：读取 `references/page-patterns.md`
- **Pro 组件详情**：参考 `@ant-design/pro-components` 官方文档（https://procomponents.ant.design/）

### 代码规则

1. **Import 路径必须正确**：
   - H5：`import { Button } from 'antd-mobile'`
   - 小程序：JSON 注册 `"ant-button": "antd-mini/es/Button/index"`
   - Web 基础：`import { Button } from 'antd'`
   - Web 业务：`import { ProCard } from '@ant-design/pro-components'`
   - 不要混用不同平台的包

2. **颜色使用 Token，不硬编码**：
   - H5：用 CSS 变量 `var(--adm-color-primary)`
   - 小程序：用 Less 变量 `@COLOR_BRAND1`
   - Web：用 ConfigProvider theme token

3. **单位**：
   - H5：px
   - 小程序：rpx（1rpx ≈ 0.5px @ 750rpx 设计稿）
   - Web：px

4. **优先使用组件库内置组件**，不要用 div+css 手写已有组件功能。

5. **Web 端优先用 Pro 系列组件**（ProTable, ProForm, ProCard, ProDescriptions），它们封装了常见业务模式。

6. **输出必须是可运行的代码文件**（.tsx / .axml+.json+.js），不是 markdown 文档中的代码块。只有当用户只是要方案说明或评审意见时，才输出文档式回答。

7. **严禁使用 emoji 作为图标**。必须使用图标组件或 inline SVG：
   - H5：`import { CheckCircleFill, RightOutline } from 'antd-mobile-icons'`
   - Web：`import { CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons'`
   - 小程序：`<ant-icon type="CheckCircleFill" />`
   - 图标库中没有的图标：写 inline SVG，保持线性风格、1px 描边、currentColor

## Phase 5: 质量验证清单

输出代码前逐项检查，任何一项失败必须修复后再输出：

### 5.1 设计意图

- [ ] 视觉策略与用户情绪匹配
- [ ] 信息密度与页面目标匹配
- [ ] 品牌蓝只出现在 CTA、关键数字、选中态、链接文字
- [ ] 没有使用竞品品牌色做强调或装饰
- [ ] 同层级元素圆角一致、投影参数一致

### 5.2 代码正确性

- [ ] 产出是实际代码文件，不是 markdown 代码块
- [ ] 代码无语法错误，可直接运行
- [ ] import 路径来自正确的包，不混用平台
- [ ] 组件 props 名称和类型正确
- [ ] 单位正确：H5 用 px，小程序用 rpx，Web 用 px

### 5.3 颜色与 Token

- [ ] 颜色使用 Design Token 或 Skill 约定，不随意写近似色
- [ ] 品牌蓝是 `#1677ff`，不是 `#1890ff`
- [ ] 文字色层级正确：主文本 `#333`，次文本 `#666`，辅助 `#999`
- [ ] 页面背景色用 `#f5f5f5`，纯白留给卡片

### 5.4 布局与间距

- [ ] 间距值来自 4px 系统（4/8/12/16/24/32）
- [ ] 页面结构清晰：导航区 / 内容区 / 操作区分明确
- [ ] 使用的页面模式与场景匹配
- [ ] 移动端可点击区域 ≥ 44×44px

### 5.5 卡片与层级

- [ ] 卡片用阴影区分层级，不用 border 描边
- [ ] 阴影颜色用冷灰蓝调，不用纯黑阴影
- [ ] 圆角与页面模式匹配
- [ ] 卡片内间距和卡片间距足够呼吸

### 5.6 图标与图形

- [ ] 不出现系统 emoji 字符
- [ ] 图标来自对应平台图标库
- [ ] 图标库缺少的图标用 inline SVG
- [ ] 装饰性大图标用 CSS 或 SVG 绘制

### 5.7 代码结构

- [ ] 生成代码无新增 inline `style={{}}` 对象
- [ ] 使用语义 HTML 标签，不全是 `<div>`
- [ ] 列表渲染有 `key` prop 或 `a:key`
- [ ] 数据获取页面有 loading / empty / error 三态
- [ ] 单文件超过 300 行时拆子组件

### 5.8 自动化验证

对 `.tsx` / `.html` 文件运行静态检查脚本：

```bash
bash <skill-dir>/scripts/verify-design.sh <输出文件路径>
```

脚本检查 P0（阻塞）+ P1（质量）+ P2（建议）三级问题，包括：硬编码色值、emoji、inline style、平台混用、非标间距、纯黑阴影、border 描边、三态缺失、语义标签比例、文件行数。P0 错误必须修复后再交付。
