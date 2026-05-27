# Mobile Design Tokens

## antd-mobile (H5) — CSS Variables

用于移动端 H5 页面，在 `:root` 或任意容器上覆盖即可自定义主题。

### 颜色

| Token | 默认值 | 语义 |
|-------|--------|------|
| `--adm-color-primary` | `#1677ff` | 品牌主色 |
| `--adm-color-success` | `#00b578` | 成功 |
| `--adm-color-warning` | `#ff8f1f` | 警告 |
| `--adm-color-danger` | `#ff3141` | 危险/错误 |
| `--adm-color-yellow` | `#ff9f18` | 黄色 |
| `--adm-color-orange` | `#ff6430` | 橙色 |
| `--adm-color-wathet` | `#e7f1ff` | 浅蓝背景 |
| `--adm-color-text` | `#333333` | 主文本 |
| `--adm-color-text-secondary` | `#666666` | 次要文本 |
| `--adm-color-weak` | `#999999` | 弱化文本 |
| `--adm-color-light` | `#cccccc` | 更弱文本 |
| `--adm-color-border` | `#eeeeee` | 边框 |
| `--adm-color-box` | `#f5f5f5` | 填充/卡片背景 |
| `--adm-color-background` | `#ffffff` | 页面背景 |
| `--adm-color-white` | `#ffffff` | 白色 |
| `--adm-color-highlight` | `var(--adm-color-danger)` | 高亮（同危险色） |

### 圆角

| Token | 默认值 |
|-------|--------|
| `--adm-radius-s` | `4px` |
| `--adm-radius-m` | `8px` |
| `--adm-radius-l` | `12px` |

### 字号

| Token | 值 | 用途 |
|-------|-----|------|
| `--adm-font-size-1` | `9px` | 极小 |
| `--adm-font-size-2` | `10px` | |
| `--adm-font-size-3` | `11px` | |
| `--adm-font-size-4` | `12px` | 辅助文本 |
| `--adm-font-size-5` | `13px` | 正文（默认 main） |
| `--adm-font-size-6` | `14px` | |
| `--adm-font-size-7` | `15px` | |
| `--adm-font-size-8` | `16px` | |
| `--adm-font-size-9` | `17px` | |
| `--adm-font-size-10` | `18px` | 大字 |

### 字体

```css
--adm-font-family: -apple-system, blinkmacsystemfont, 'Helvetica Neue',
  helvetica, segoe ui, arial, roboto, 'PingFang SC', 'miui',
  'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
```

### 自定义主题示例

```css
:root:root {
  --adm-color-primary: #1677ff;
}
```

注意使用 `:root:root` 双重选择器提升优先级。局部主题可加在任意容器节点上。

---

## antd-mini (小程序) — Less Variables

用于支付宝小程序，通过 Less 变量覆盖定制主题。单位使用 `rpx`。

### 颜色

| 变量 | 默认值 | 语义 |
|------|--------|------|
| `@COLOR_BRAND1` | `#1677ff` | 品牌主色 |
| `@COLOR_BRAND2` | `#1677ff` | 品牌辅色 |
| `@COLOR_RED` | `#ff3141` | 红色/危险 |
| `@COLOR_GREEN` | `#22b35e` | 绿色/成功 |
| `@COLOR_YELLOW` | `#ff9f18` | 黄色/警告 |
| `@COLOR_ORANGE` | `#ff6430` | 橙色 |
| `@COLOR_WATHET` | `#e7f1ff` | 浅蓝背景 |
| `@COLOR_TEXT_PRIMARY` | `#333333` | 主文本 |
| `@COLOR_TEXT_SECONDARY` | `#666666` | 次要文本 |
| `@COLOR_TEXT_ASSIST` | `#999999` | 辅助文本 |
| `@COLOR_TEXT_WEAK` | `#cccccc` | 弱化文本 |
| `@COLOR_BORDER` | `#e5e5e5` | 边框 |
| `@COLOR_BACKGROUND` | `#f5f5f5` | 背景 |
| `@COLOR_CARD` | `#ffffff` | 卡片 |
| `@COLOR_WHITE` | `#ffffff` | 白色 |
| `@COLOR_BLACK` | `#000000` | 黑色 |
| `@COLOR_LINK` | `#4b6b99` | 链接 |

### 字号（rpx）

| 变量 | 值 | 用途 |
|------|-----|------|
| `@font-size-weak` | `22rpx` | 弱化内容 |
| `@font-size-subcontent` | `24rpx` | 次常规内容 |
| `@font-size-content` | `26rpx` | 常规内容 |
| `@font-size-subtitle` | `30rpx` | 小标题 |
| `@font-size-list` | `34rpx` | 列表 |
| `@font-size-title` | `36rpx` | 大标题 |

### 间距（rpx）

| 变量 | 值 | 语义 |
|------|-----|------|
| `@h-spacing-mini` | `8rpx` | 最小间距 |
| `@h-spacing-small` | `12rpx` | 小间距 |
| `@h-spacing-standard` | `16rpx` | 标准间距 |
| `@h-spacing-large` | `24rpx` | 大间距 |

### 圆角（rpx）

| 变量 | 值 |
|------|-----|
| `@corner-radius-sm` | `4rpx` |
| `@corner-radius-md` | `8rpx` |
| `@corner-radius-md-plus` | `12rpx` |
| `@corner-radius-lg` | `16rpx` |
| `@corner-radius-xl` | `24rpx` |

### 新版圆角（rpx）

| 变量 | 值 |
|------|-----|
| `@SIZE_RADIUS_XS` | `8rpx` |
| `@SIZE_RADIUS_S` | `16rpx` |
| `@SIZE_RADIUS_M` | `24rpx` |
| `@SIZE_RADIUS_L` | `32rpx` |
| `@SIZE_RADIUS_XL` | `40rpx` |
| `@SIZE_RADIUS_DIALOG` | `48rpx` |

### 透明度

| 变量 | 值 | 用途 |
|------|-----|------|
| `@OPACITY_PRESS` | `0.08` | 按压态 |
| `@OPACITY_DISABLE` | `0.4` | 禁用态 |
| `@OPACITY_MASK` | `0.55` | 蒙层 |

---

## H5 与小程序 Token 对照

| 语义 | antd-mobile (CSS) | antd-mini (Less) |
|------|-------------------|-----------------|
| 品牌主色 | `--adm-color-primary` #1677ff | `@COLOR_BRAND1` #1677ff |
| 危险/红色 | `--adm-color-danger` #ff3141 | `@COLOR_RED` #ff3141 |
| 成功/绿色 | `--adm-color-success` #00b578 | `@COLOR_GREEN` #22b35e |
| 警告/黄色 | `--adm-color-warning` #ff8f1f | `@COLOR_YELLOW` #ff9f18 |
| 主文本 | `--adm-color-text` #333 | `@COLOR_TEXT_PRIMARY` #333 |
| 次文本 | `--adm-color-text-secondary` #666 | `@COLOR_TEXT_SECONDARY` #666 |
| 弱文本 | `--adm-color-weak` #999 | `@COLOR_TEXT_ASSIST` #999 |
| 边框 | `--adm-color-border` #eee | `@COLOR_BORDER` #e5e5e5 |
| 背景 | `--adm-color-box` #f5f5f5 | `@COLOR_BACKGROUND` #f5f5f5 |
