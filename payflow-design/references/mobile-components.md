# Mobile Components

## antd-mobile (H5)

包：`antd-mobile` v5  
Import：`import { Button, Card, ... } from 'antd-mobile'`

### 通用
| 组件 | 用途 |
|------|------|
| Button | 按钮。props: color(default/primary/success/warning/danger), fill(solid/outline/none), size(mini/small/middle/large), loading, disabled, block |
| Icon | 图标 |

### 布局
| 组件 | 用途 |
|------|------|
| AutoCenter | 自动居中 |
| Divider | 分割线。props: contentPosition(left/center/right), direction(horizontal/vertical) |
| Grid | 栅格布局。props: columns, gap |
| SafeArea | 安全区适配（刘海屏等）。props: position(top/bottom) |
| Space | 间距布局。props: direction(horizontal/vertical), wrap, block, justify, align |

### 导航
| 组件 | 用途 |
|------|------|
| CapsuleTabs | 胶囊标签页 |
| IndexBar | 索引栏（通讯录样式） |
| JumboTabs | 大标签页 |
| NavBar | 导航栏。props: back, backIcon, onBack, right |
| SideBar | 侧边栏导航 |
| TabBar | 底部标签栏。props: activeKey, onChange |
| Tabs | 标签页。props: activeKey, onChange, stretch |

### 信息展示
| 组件 | 用途 |
|------|------|
| Avatar | 头像。props: src, fit |
| Card | 卡片。props: title, extra, headerStyle, bodyStyle |
| Collapse | 折叠面板 |
| Ellipsis | 文本省略。props: content, rows, expandText |
| FloatingPanel | 浮动面板（可拖拽） |
| Image | 图片。props: src, fit, width, height, lazy |
| ImageViewer | 图片预览 |
| InfiniteScroll | 无限滚动 |
| List | 列表。List.Item props: title, description, prefix, extra, arrow |
| PageIndicator | 页码指示器 |
| Segmented | 分段器 |
| Steps | 步骤条。props: current, direction(horizontal/vertical) |
| Swiper | 轮播 |
| Tag | 标签。props: color, fill(solid/outline), round |
| WaterMark | 水印 |
| Footer | 页脚 |

### 信息录入
| 组件 | 用途 |
|------|------|
| Cascader | 级联选择（弹出式） |
| CascaderView | 级联选择（面板式） |
| CheckList | 勾选列表 |
| Checkbox | 复选框 |
| Form | 表单。Form.Item props: label, name, rules, required |
| Input | 输入框。props: placeholder, clearable, type |
| Picker | 选择器（弹出式） |
| PickerView | 选择器（面板式） |
| Radio | 单选框 |
| Rate | 评分 |
| SearchBar | 搜索栏 |
| Selector | 选择组 |
| Slider | 滑动输入条 |
| Stepper | 步进器 |
| Switch | 开关 |
| TextArea | 多行输入 |

### 反馈
| 组件 | 用途 |
|------|------|
| ActionSheet | 动作面板 |
| Dialog | 对话框。Dialog.alert / Dialog.confirm |
| Empty | 空状态 |
| ErrorBlock | 异常状态。props: status(default/disconnected/empty/busy) |
| Loading | 加载中 |
| Mask | 遮罩层 |
| Modal | 弹窗 |
| Popover | 气泡弹出 |
| Popup | 弹出层。props: position(bottom/top/left/right), visible |
| ProgressBar | 进度条 |
| ProgressCircle | 环形进度 |
| PullToRefresh | 下拉刷新 |
| Result | 结果页。props: status(success/error/info/warning/waiting) |
| Skeleton | 骨架屏 |
| SwipeAction | 滑动操作 |
| Toast | 轻提示。Toast.show({ content, icon }) |

### 引导提示
| 组件 | 用途 |
|------|------|
| Badge | 徽标。props: content, color |
| NoticeBar | 通告栏。props: content, color(default/alert/error/info), closeable, icon |

### 试验性
| 组件 | 用途 |
|------|------|
| Calendar / CalendarPicker | 日历选择 |
| Dropdown | 下拉菜单 |
| FloatingBubble | 浮动气泡 |
| ImageUploader | 图片上传 |
| NumberKeyboard | 数字键盘 |
| PasscodeInput | 密码输入 |
| ResultPage | 结果页面（增强版） |
| TreeSelect | 树形选择 |
| VirtualInput | 虚拟输入框 |

---

## antd-mini (小程序)

包：`antd-mini` v3  
在小程序 JSON 中注册：`"usingComponents": { "ant-button": "antd-mini/es/Button/index" }`

### 通用
| 组件 | 路径 | 用途 |
|------|------|------|
| Button | Button/index | 按钮。props: type(primary/default/text), danger, disabled, loading, size |
| Icon | Icon/index | 图标。props: type, style |
| SafeArea | SafeArea/index | 安全区 |
| Sticky | Sticky/index | 吸顶 |

### 布局
| 组件 | 路径 | 用途 |
|------|------|------|
| Divider | Divider/index | 分割线 |
| Grid | Grid/index | 栅格。props: columns |
| Space | Space/index | 间距 |

### 导航
| 组件 | 路径 | 用途 |
|------|------|------|
| Footer | Footer/index | 页脚 |
| GuideTour | GuideTour/index | 引导 |
| PopoverList | PopoverList/index | 气泡菜单 |
| Steps | Steps/index | 步骤条 |
| TabBar | TabBar/index | 底部标签栏 |
| Tabs | Tabs/index | 标签页 |

### 数据展示
| 组件 | 路径 | 用途 |
|------|------|------|
| Avatar | Avatar/index | 头像 |
| Calendar | Calendar/index | 日历 |
| Card | Card/index | 卡片 |
| Collapse | Collapse/index | 折叠面板 |
| Empty | Empty/index | 空状态 |
| IndexBar | IndexBar/index | 索引栏 |
| List | List/index | 列表 |
| PageContainer | PageContainer/index | 页面容器 |
| SwipeAction | SwipeAction/index | 滑动操作 |
| Table | Table/index | 表格 |
| Tag | Tag/index | 标签 |
| Typography | Typography/index | 排版 |

### 数据录入
| 组件 | 路径 | 用途 |
|------|------|------|
| Checkbox | Checkbox/index | 复选框 |
| Checklist | Checklist/index | 勾选列表 |
| DatePicker | DatePicker/index | 日期选择 |
| Form | Form/index | 表单 |
| ImageUpload | ImageUpload/index | 图片上传 |
| Input | Input/index | 输入框 |
| NumberKeyboard | NumberKeyboard/index | 数字键盘 |
| Picker | Picker/index | 选择器 |
| Radio | Radio/index | 单选框 |
| RareWordsKeyboard | RareWordsKeyboard/index | 生僻字键盘 |
| Selector | Selector/index | 选择组 |
| Slider | Slider/index | 滑动输入 |
| Stepper | Stepper/index | 步进器 |
| Switch | Switch/index | 开关 |

### 反馈引导
| 组件 | 路径 | 用途 |
|------|------|------|
| ActionSheet | ActionSheet/index | 动作面板 |
| Badge | Badge/index | 徽标 |
| Dialog | Dialog/index | 对话框 |
| Feedback | Feedback/index | 反馈 |
| Loading | Loading/index | 加载 |
| NoticeBar | NoticeBar/index | 通告栏 |
| Popover | Popover/index | 气泡 |
| Popup | Popup/index | 弹出层 |
| Progress | Progress/index | 进度条 |
| Rate | Rate/index | 评分 |
| Result | Result/index | 结果 |
| Skeleton | Skeleton/index | 骨架屏 |
| Toast | Toast/index | 轻提示 |

### 业务组件
| 组件 | 路径 | 用途 |
|------|------|------|
| Countdown | Countdown/index | 倒计时 |
| NumberInput | NumberInput/index | 金额输入 |
| Postscript | Postscript/index | 附言/备注 |
| SelectContact | SelectContact/index | 选择联系人 |
| Terms | Terms/index | 协议勾选 |
| Voucher | Voucher/index | 券/票 |

---

## H5 与小程序组件对照

| 功能 | antd-mobile (H5) | antd-mini (小程序) |
|------|-------------------|-------------------|
| 按钮 | Button | Button |
| 对话框 | Dialog | Dialog |
| 弹出层 | Popup | Popup |
| 轻提示 | Toast | Toast |
| 列表 | List | List |
| 表单 | Form | Form |
| 输入框 | Input | Input |
| 选择器 | Picker | Picker |
| 标签页 | Tabs | Tabs |
| 底部栏 | TabBar | TabBar |
| 卡片 | Card | Card |
| 标签 | Tag | Tag |
| 步骤条 | Steps | Steps |
| 复选框 | Checkbox | Checkbox |
| 单选框 | Radio | Radio |
| 开关 | Switch | Switch |
| 骨架屏 | Skeleton | Skeleton |
| 空状态 | Empty | Empty |
| 结果 | Result | Result |
| 日历 | Calendar | Calendar |
| 金额输入 | 无（用 Input） | NumberInput |
| 券组件 | 无 | Voucher |
| 倒计时 | 无 | Countdown |
