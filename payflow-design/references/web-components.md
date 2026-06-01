# Web Components

## antd (基础组件)

包：`antd` v5/v6（以目标项目 `package.json` 为准）
Import：`import { Button, Table, Form, ... } from 'antd'`

### 通用
| 组件 | 用途 |
|------|------|
| Button | 按钮。type(primary/default/dashed/text/link), danger, size(large/middle/small), loading, icon, block |
| FloatButton | 悬浮按钮 |
| Icon | 图标（从 `@ant-design/icons` 导入） |
| Typography | 排版。Typography.Title/Text/Paragraph/Link |

### 布局
| 组件 | 用途 |
|------|------|
| Divider | 分割线 |
| Flex | 弹性布局。gap, justify, align, vertical, wrap |
| Grid (Row/Col) | 栅格。Row: gutter, justify, align; Col: span, offset |
| Layout | 页面布局。Layout/Header/Sider/Content/Footer |
| Space | 间距。size(small/middle/large), direction, wrap |
| Splitter | 分割面板（使用前确认目标项目 antd 版本支持） |

### 导航
| 组件 | 用途 |
|------|------|
| Anchor | 锚点 |
| Breadcrumb | 面包屑 |
| Dropdown | 下拉菜单 |
| Menu | 菜单导航。mode(vertical/horizontal/inline), items |
| Pagination | 分页 |
| Steps | 步骤条 |
| Tabs | 标签页 |

### 数据展示
| 组件 | 用途 |
|------|------|
| Avatar | 头像 |
| Badge | 徽标 |
| Calendar | 日历 |
| Card | 卡片。title, extra, actions, bordered, hoverable |
| Carousel | 走马灯 |
| Collapse | 折叠面板 |
| Descriptions | 描述列表。Descriptions.Item: label, children, span |
| Empty | 空状态 |
| Image | 图片预览 |
| List | 列表。List.Item: List.Item.Meta(title, description, avatar) |
| Popover | 气泡卡片 |
| QRCode | 二维码 |
| Segmented | 分段器 |
| Statistic | 统计数值。title, value, prefix, suffix, precision |
| Table | 表格。columns, dataSource, pagination, rowSelection, loading |
| Tag | 标签。color, closable, bordered |
| Timeline | 时间线 |
| Tooltip | 文字提示 |
| Tour | 漫游式引导 |
| Tree | 树形控件 |
| Masonry | 瀑布流布局（使用前确认目标项目 antd 版本支持；不确定时用 Grid/List 自定义） |

### 数据录入
| 组件 | 用途 |
|------|------|
| AutoComplete | 自动完成 |
| Cascader | 级联选择 |
| Checkbox | 复选框 |
| ColorPicker | 颜色选择器 |
| DatePicker | 日期选择 |
| Form | 表单。Form.Item: label, name, rules, required, tooltip |
| Input | 输入框。Input.Search, Input.TextArea, Input.Password |
| InputNumber | 数字输入框 |
| Mentions | 提及 |
| Radio | 单选框 |
| Rate | 评分 |
| Select | 选择器。options, mode(multiple/tags), showSearch |
| Slider | 滑动输入 |
| Switch | 开关 |
| TimePicker | 时间选择 |
| Transfer | 穿梭框 |
| TreeSelect | 树选择 |
| Upload | 上传。action, listType(text/picture/picture-card/picture-circle) |

### 反馈
| 组件 | 用途 |
|------|------|
| Alert | 警告提示。type(success/info/warning/error), message, description, closable |
| Drawer | 抽屉 |
| Message | 全局提示。message.success/error/warning/info/loading |
| Modal | 模态对话框。Modal.confirm/info/success/error/warning |
| Notification | 通知提醒 |
| Popconfirm | 气泡确认 |
| Progress | 进度。type(line/circle/dashboard), percent, status |
| Result | 结果。status(success/error/info/warning/404/403/500), title, subTitle, extra |
| Skeleton | 骨架屏 |
| Spin | 加载中 |
| Watermark | 水印 |

### 其他
| 组件 | 用途 |
|------|------|
| Affix | 固钉 |
| App | 应用容器（提供 message/notification/modal 静态方法的上下文） |
| ConfigProvider | 全局配置（主题、国际化） |

---

## @ant-design/pro-components (业务组件)

包：`@ant-design/pro-components`（开源，npm 安装）
Import：`import { ProCard, ProTable, ... } from '@ant-design/pro-components'`
文档：https://procomponents.ant.design/

### 高频业务组件

| 组件 | 用途 | 关键 props |
|------|------|-----------|
| ProCard | 高级卡片，支持分栏、折叠、标签页 | title, extra, split(vertical/horizontal), tabs, collapsible |
| ProTable | 高级表格，内置搜索/工具栏/分页 | columns, request, search, toolBarRender |
| ProForm | 高级表单，支持分步/弹窗/抽屉 | ProFormText/Select/DatePicker 等子组件 |
| ProDescriptions | 高级描述列表，可编辑 | columns, dataSource, editable |
| ProList | 高级列表，支持卡片/展开/选择 | metas(title/description/avatar/actions/extra), cardProps |
| EditableProTable | 可编辑表格 | columns, value, onChange |
| PageContainer | 页面容器（带面包屑/标题/标签页） | title, subTitle, breadcrumb, tabList, extra |
| FooterToolbar | 底部操作栏 | extra, children |
| ProSkeleton | 高级骨架屏 | type(list/result/descriptions) |
| LoginForm | 登录表单 | onFinish, logo, title |
| StatisticCard | 统计卡片 | statistic, chart, footer |

---

## 常见 Web 页面组件组合

### 后台列表页
```
PageContainer > ProTable(带 search + toolBarRender) > Modal(详情/编辑)
```

### 后台详情页
```
PageContainer > ProDescriptions + ProCard(分栏) > FooterToolbar(操作)
```

### 后台表单页
```
PageContainer > ProCard > ProForm(StepsForm 分步 / ModalForm 弹窗)
```

### 仪表盘
```
PageContainer > Row/Col > ProCard(Statistic) + ProTable + 图表
```
