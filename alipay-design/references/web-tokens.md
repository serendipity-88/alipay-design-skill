# Web Design Tokens (antd v5)

antd v5 使用 CSS-in-JS 的 Design Token 体系，分三层：Seed → Map → Alias。
通过 `ConfigProvider` 的 `theme.token` 配置。

## Seed Tokens（种子变量）

最高层级，所有其他 token 由此派生。

### 颜色

| Token | 默认值 | 语义 |
|-------|--------|------|
| `colorPrimary` | `#1677ff` | 品牌主色 |
| `colorSuccess` | `#52c41a` | 成功色 |
| `colorWarning` | `#faad14` | 警告色 |
| `colorError` | `#ff4d4f` | 错误色 |
| `colorInfo` | `#1677ff` | 信息色 |

### 色板

| Token | 值 |
|-------|-----|
| `blue` | `#1677FF` |
| `purple` | `#722ED1` |
| `cyan` | `#13C2C2` |
| `green` | `#52C41A` |
| `red` | `#F5222D` |
| `orange` | `#FA8C16` |
| `yellow` | `#FADB14` |
| `gold` | `#FAAD14` |
| `volcano` | `#FA541C` |
| `geekblue` | `#2F54EB` |
| `magenta` | `#EB2F96` |
| `lime` | `#A0D911` |

### 尺寸与排版

| Token | 默认值 | 说明 |
|-------|--------|------|
| `fontSize` | `14` | 基础字号(px) |
| `borderRadius` | `6` | 基础圆角(px) |
| `controlHeight` | `32` | 控件高度(px) |
| `sizeUnit` | `4` | 尺寸基数(px) |
| `sizeStep` | `4` | 尺寸步长(px) |
| `lineWidth` | `1` | 边框宽度(px) |
| `lineType` | `solid` | 边框类型 |

### 字体

```
fontFamily: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
fontFamilyCode: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace
```

## Alias Tokens（常用别名）

从 Seed/Map 派生，直接用于组件样式。

### 文本颜色

| Token | 语义 |
|-------|------|
| `colorTextHeading` | 标题字体颜色 |
| `colorTextDescription` | 描述文本颜色 |
| `colorTextDisabled` | 禁用文本颜色 |
| `colorTextLabel` | 标签文本颜色 |
| `colorTextPlaceholder` | 占位符颜色 |
| `colorTextLightSolid` | 亮色背景上的文本（如 Primary Button 中的白字） |

### 背景/填充颜色

| Token | 语义 |
|-------|------|
| `colorFillAlter` | 替代背景色 |
| `colorFillContent` | 内容区域背景 |
| `colorFillContentHover` | 内容区域悬停背景 |
| `colorBgContainerDisabled` | 容器禁用背景 |
| `colorBgTextHover` | 文本悬停背景 |
| `colorBgTextActive` | 文本激活背景 |

### 其他

| Token | 语义 |
|-------|------|
| `colorSplit` | 分割线颜色 |
| `colorBorderBg` | 背景边框颜色 |
| `colorHighlight` | 高亮颜色 |
| `colorIcon` | 弱操作图标颜色 |
| `colorIconHover` | 图标悬停颜色 |
| `colorErrorOutline` | 错误状态外轮廓 |
| `colorWarningOutline` | 警告状态外轮廓 |

## 主题配置示例

```tsx
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1677ff',
      borderRadius: 6,
      fontSize: 14,
    },
  }}
>
  <App />
</ConfigProvider>
```

## 注意事项

- antd v5 **不使用** CSS Variables 文件，而是通过 JS 的 ConfigProvider 配置
- 所有颜色值会自动派生出 hover/active/disabled 等状态变体
- 每个组件还有独立的 Component Token，可在 `theme.components.Button.xxx` 中覆盖
