# 页面模板

本目录包含 19 份可改造代码模板，覆盖移动端和 Web 后台常见页面。模板用于帮助 Agent 快速获得页面骨架、组件拆分、状态结构和视觉层级。

## 使用流程

1. 根据用户需求判断平台和页面类型
2. 读取最接近的模板文件
3. 按 `[A]`~`[F]` 标记替换业务内容、数据字段和操作入口
4. 结合 `design-philosophy.md`、`page-patterns.md`、`page-strategies.md` 和平台 tokens 调整视觉
5. 生成最终代码时，将模板样式整理到 CSS Modules、className 或 CSS variables

## 移动端模板（8 份）

| 页面 | 文件 | 设计模式 |
|------|------|----------|
| 支付结果页 | `payment-result.tsx` | 情绪头部型 |
| 轻触支付页 / 确认付款页 | `tap-to-pay-payment.tsx` | 沉浸教育型 |
| 红包承接页 | `reward-landing.tsx` | 营销承接型 |
| 受阻教育页 | `blocked-education.tsx` | 情绪安抚型 |
| 附近优惠商家页 | `nearby-merchants.tsx` | 活动运营型 |
| 集卡活动页 | `card-collection.tsx` | 活动运营型 |
| 安全感教育页 | `security-education.tsx` | 长页面教育型 |
| 服务频道首页 | `tap-to-pay-hub.tsx` | 信息密集型 |

## Web 模板（11 份）

| 页面 | 文件 | 设计模式 |
|------|------|----------|
| 表格查询页 | `web-table-query.tsx` | ProTable 查询 |
| 基础表单页 | `web-basic-form.tsx` | ProForm 表单 |
| 分步表单页 | `web-step-form.tsx` | StepsForm 分步 |
| 单据详情页 | `web-detail-page.tsx` | ProDescriptions + Timeline |
| 成功结果页 | `web-success-result.tsx` | Result 结果 |
| 成员列表页 | `web-member-list.tsx` | ProTable 成员管理 |
| 可编辑列表页 | `web-editable-list.tsx` | EditableProTable |
| 设置页 | `web-settings.tsx` | Tabs 设置面板 |
| 搜索页 | `web-search.tsx` | 搜索结果列表 |
| 左右布局页 | `web-split-layout.tsx` | 左列表右详情 |
| 工作项列表页 | `web-work-item-list.tsx` | StatisticCard + ProList |

## 设计原则

1. **内容可替换**：关键区域用 `[A]`~`[F]` 标记，方便定位修改
2. **结构可运行**：模板应能作为页面骨架继续开发
3. **平台不混用**：移动端、Web 后台、小程序组件和单位必须分开
4. **状态要完整**：数据页面必须补齐 loading / empty / error
5. **最终要工程化**：从模板迁移到项目时，优先使用 CSS Modules、className 或 CSS variables
