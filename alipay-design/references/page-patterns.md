# Page Patterns — 组合配方

每个 pattern 提供**最小版**（核心结构）和**完整版**（+ 三态 + 安全区 + 下拉刷新）。
间距使用 CSS 变量，不硬编码。颜色走 Token。

---

## 移动端 (H5 / antd-mobile)

### 通用间距变量

```css
:root {
  --sp-xs: 4px;
  --sp-sm: 8px;
  --sp-md: 12px;
  --sp-lg: 16px;
  --sp-xl: 24px;
  --sp-xxl: 32px;
  --sp-page-h: 24px;        /* 页面水平边距 */
  --radius-card: 24px;
  --radius-btn: 24px;
  --shadow-card: 0 4px 12px rgba(90, 110, 149, 0.12);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}
```

---

### 列表页

**最小版**：NavBar + 搜索 + 列表 + 无限滚动

```tsx
import { NavBar, SearchBar, List, InfiniteScroll, Tag, ErrorBlock } from 'antd-mobile'
import { useState } from 'react'
import styles from './index.module.css'

interface Item { id: string; title: string; desc: string; status: string }

export default () => {
  const [items, setItems] = useState<Item[]>([])
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    const res = await fetchList(items.length)
    setItems(prev => [...prev, ...res.list])
    setHasMore(res.hasMore)
  }

  return (
    <main className={styles.page}>
      <NavBar back="返回">列表标题</NavBar>
      <SearchBar className={styles.search} placeholder="搜索" />
      <List className={styles.list}>
        {items.map(item => (
          <List.Item
            key={item.id}
            title={item.title}
            description={item.desc}
            extra={<Tag color="primary">{item.status}</Tag>}
            arrow
          />
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </main>
  )
}
```

```css
/* index.module.css */
.page {
  min-height: 100vh;
  background: var(--adm-color-background, #f5f5f5);
}
.search {
  padding: var(--sp-md) var(--sp-page-h);
}
.list {
  margin: var(--sp-md) var(--sp-page-h);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}
```

**完整版追加**：PullToRefresh + Empty + Error + loading skeleton

```tsx
import { PullToRefresh, DotLoading, ErrorBlock } from 'antd-mobile'

// 在 return 中包裹 PullToRefresh
<PullToRefresh onRefresh={handleRefresh}>
  {loading && items.length === 0 ? (
    <section className={styles.skeleton}>
      {[1,2,3].map(i => <div key={i} className={styles.skeletonItem} />)}
    </section>
  ) : error ? (
    <ErrorBlock
      status="disconnected"
      title="加载失败"
      description="请检查网络后重试"
    />
  ) : items.length === 0 ? (
    <ErrorBlock status="empty" title="暂无数据" description="去添加一些内容吧" />
  ) : (
    /* 列表内容同最小版 */
  )}
</PullToRefresh>
```

---

### 表单页

**最小版**：NavBar + Form + 提交按钮

```tsx
import { NavBar, Form, Input, TextArea, Button, Toast } from 'antd-mobile'
import styles from './index.module.css'

export default () => (
  <main className={styles.page}>
    <NavBar back="返回">填写信息</NavBar>
    <Form
      className={styles.form}
      onFinish={(values) => Toast.show({ content: '提交成功' })}
      footer={
        <footer className={styles.footer}>
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        </footer>
      }
    >
      <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <TextArea placeholder="请输入" rows={3} />
      </Form.Item>
    </Form>
  </main>
)
```

```css
.page { min-height: 100vh; background: var(--adm-color-background, #f5f5f5); }
.form { margin-top: var(--sp-md); }
.footer {
  padding: var(--sp-lg) var(--sp-page-h);
  padding-bottom: calc(var(--sp-lg) + var(--safe-bottom));
}
```

**完整版追加**：分步表单 + 按钮 loading 态

```tsx
import { Steps } from 'antd-mobile'

// 用 state 控制当前步骤
const [step, setStep] = useState(0)
const [submitting, setSubmitting] = useState(false)

// 底部按钮
<Button loading={submitting} block type="submit" color="primary" size="large">
  {step < totalSteps - 1 ? '下一步' : '提交'}
</Button>
```

---

### 结果页

**最小版**：渐变头部 + 成功图标 + 金额 + 完成按钮

```tsx
import { Button } from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'
import styles from './index.module.css'

interface ResultProps { amount: string; merchant: string; method: string }

export default ({ amount, merchant, method }: ResultProps) => (
  <main className={styles.page}>
    <header className={styles.header}>
      <div className={styles.iconWrap}>
        <CheckCircleFill className={styles.icon} />
      </div>
      <h1 className={styles.amount}>{amount}</h1>
      <p className={styles.merchant}>{merchant}</p>
      <p className={styles.method}>{method}</p>
    </header>
    <footer className={styles.footer}>
      <Button block color="primary" size="large">完成</Button>
      <Button block fill="none" className={styles.secondaryBtn}>查看账单</Button>
    </footer>
  </main>
)
```

```css
.page { min-height: 100vh; background: #f5f5f5; }
.header {
  background: linear-gradient(180deg, #D6E8FF 0%, #E8F2FF 60%, #F5F5F5 100%);
  padding: 60px var(--sp-page-h) var(--sp-xxl);
  text-align: center;
}
.iconWrap {
  width: 64px; height: 64px; margin: 0 auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #00B578 0%, #33CC99 100%);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 181, 120, 0.25);
}
.icon { font-size: 32px; color: #fff; }
.amount {
  font-size: 36px; font-weight: 600; color: #1A1A1A;
  margin-top: var(--sp-lg);
  font-family: DINPro-Bold, tabular-nums, sans-serif;
  font-variant-numeric: tabular-nums;
}
.merchant { font-size: 14px; color: #666; margin-top: var(--sp-sm); }
.method { font-size: 12px; color: #999; margin-top: var(--sp-xs); }
.footer {
  padding: var(--sp-xl) var(--sp-page-h);
  padding-bottom: calc(var(--sp-xl) + var(--safe-bottom));
}
.secondaryBtn { margin-top: var(--sp-sm); }
```

**完整版追加**：奖励横滑 + 教育卡片 + 优惠券（参见 `templates/payment-result.tsx`）

---

### 详情页

**最小版**：NavBar + 信息卡片 + 底部操作栏

```tsx
import { NavBar, Tag } from 'antd-mobile'
import styles from './index.module.css'

interface DetailProps {
  status: string; amount: string; time: string; items: { label: string; value: string }[]
}

export default ({ status, amount, time, items }: DetailProps) => (
  <main className={styles.page}>
    <NavBar back="返回">订单详情</NavBar>
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <Tag color="success">{status}</Tag>
        <span className={styles.amount}>{amount}</span>
      </div>
      <dl className={styles.infoList}>
        {items.map(item => (
          <div key={item.label} className={styles.infoRow}>
            <dt className={styles.infoLabel}>{item.label}</dt>
            <dd className={styles.infoValue}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
    <footer className={styles.stickyFooter}>
      <button className={styles.primaryBtn}>确认</button>
    </footer>
  </main>
)
```

```css
.page { min-height: 100vh; background: #f5f5f5; }
.card {
  margin: var(--sp-md) var(--sp-page-h);
  background: #fff;
  border-radius: var(--radius-card);
  padding: var(--sp-xl);
  box-shadow: var(--shadow-card);
}
.cardHeader { display: flex; align-items: center; justify-content: space-between; }
.amount { font-size: 24px; font-weight: 600; font-family: DINPro-Bold, tabular-nums, sans-serif; }
.infoList { margin-top: var(--sp-lg); }
.infoRow {
  display: flex; justify-content: space-between;
  padding: var(--sp-sm) 0;
}
.infoLabel { font-size: 14px; color: #666; }
.infoValue { font-size: 14px; color: #1A1A1A; }
.stickyFooter {
  position: fixed; bottom: 0; left: 0; right: 0;
  padding: var(--sp-md) var(--sp-page-h);
  padding-bottom: calc(var(--sp-md) + var(--safe-bottom));
  background: #fff;
  box-shadow: 0 -2px 8px rgba(90, 110, 149, 0.08);
}
.primaryBtn {
  width: 100%; height: 48px;
  border-radius: var(--radius-btn); border: none;
  background: linear-gradient(90deg, #1677FF 0%, #4DA3FF 100%);
  color: #fff; font-size: 17px; font-weight: 600;
  box-shadow: 0 4px 16px rgba(22, 119, 255, 0.3);
}
```

---

### Tab 导航页

**最小版**：TabBar + 内容切换

```tsx
import { TabBar } from 'antd-mobile'
import { useState } from 'react'
import styles from './index.module.css'

const tabs = [
  { key: 'home', title: '首页' },
  { key: 'message', title: '消息' },
  { key: 'me', title: '我的' },
]

export default () => {
  const [activeKey, setActiveKey] = useState('home')
  return (
    <div className={styles.layout}>
      <main className={styles.content}>
        {/* 按 activeKey 渲染对应内容 */}
      </main>
      <nav className={styles.tabBar}>
        <TabBar activeKey={activeKey} onChange={setActiveKey}>
          {tabs.map(tab => (
            <TabBar.Item key={tab.key} title={tab.title} icon={<span />} />
          ))}
        </TabBar>
      </nav>
    </div>
  )
}
```

```css
.layout { display: flex; flex-direction: column; height: 100vh; }
.content { flex: 1; overflow: auto; background: #f5f5f5; }
.tabBar {
  flex-shrink: 0;
  padding-bottom: var(--safe-bottom);
  background: #fff;
  box-shadow: 0 -2px 8px rgba(90, 110, 149, 0.06);
}
```

---

### 教育/引导页（轻触支付实战新增）

**最小版**：渐变背景 + 标题 + 中心插图 + 底部白色区 + CTA

```tsx
import { Button } from 'antd-mobile'
import styles from './index.module.css'

interface EducationProps { title: string; subtitle: string; ctaText: string; onCta: () => void }

export default ({ title, subtitle, ctaText, onCta }: EducationProps) => (
  <main className={styles.page}>
    <header className={styles.gradientHead}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
    <section className={styles.illustration}>
      {/* 中心插图区 (40%+ 屏高) */}
    </section>
    <footer className={styles.bottomSection}>
      <Button block color="primary" size="large" onClick={onCta}>
        {ctaText}
      </Button>
      <div className={styles.safetyLine}>
        {/* 安全/信任文案 */}
      </div>
    </footer>
  </main>
)
```

```css
.page { min-height: 100vh; position: relative; }
.gradientHead {
  background: linear-gradient(180deg, #E8F2FF 0%, #D6E8FF 40%, #EDF4FF 100%);
  padding: 88px var(--sp-page-h) var(--sp-xl);
  text-align: center;
}
.title {
  font-size: 28px; font-weight: 600; color: #1A1A1A;
  letter-spacing: 2px;
}
.subtitle { font-size: 14px; color: #666; margin-top: var(--sp-sm); }
.illustration {
  height: 42vh;
  display: flex; align-items: center; justify-content: center;
}
.bottomSection {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff;
  border-radius: var(--radius-card) var(--radius-card) 0 0;
  box-shadow: 0 -4px 24px rgba(90, 110, 149, 0.08);
  padding: var(--sp-xl) var(--sp-page-h);
  padding-bottom: calc(var(--sp-xl) + var(--safe-bottom));
}
.safetyLine {
  display: flex; align-items: center; justify-content: center;
  gap: var(--sp-xs); margin-top: var(--sp-md);
  font-size: 12px; color: #999;
}
```

**完整版追加**：Phase 进度指示器 + 多步动画 + 成功浮层 + 激励红包条（参见 `templates/tap-to-pay-payment.tsx`）

---

## 小程序 (antd-mini)

### 列表页

```json
{
  "usingComponents": {
    "ant-list": "antd-mini/es/List/index",
    "ant-list-item": "antd-mini/es/List/ListItem/index",
    "ant-tag": "antd-mini/es/Tag/index",
    "ant-result": "antd-mini/es/Result/index"
  }
}
```

```xml
<!-- page.axml -->
<view class="page">
  <ant-list a:if="{{list.length > 0}}">
    <ant-list-item
      a:for="{{list}}"
      a:key="{{item.id}}"
      title="{{item.title}}"
      brief="{{item.desc}}"
      arrow="horizontal"
    >
      <ant-tag slot="extra" color="primary">{{item.status}}</ant-tag>
    </ant-list-item>
  </ant-list>

  <!-- 空状态 -->
  <ant-result
    a:elif="{{!loading}}"
    type="empty"
    title="暂无数据"
    subtitle="去添加一些内容吧"
  />

  <!-- 加载态 -->
  <view a:if="{{loading}}" class="loading-skeleton">
    <view a:for="{{[1,2,3]}}" a:key="*this" class="skeleton-item" />
  </view>
</view>
```

```css
/* page.acss */
.page { min-height: 100vh; background: #f5f5f5; }
.loading-skeleton { padding: 24rpx; }
.skeleton-item {
  height: 120rpx; margin-bottom: 16rpx;
  background: #e8e8e8; border-radius: 16rpx;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
```

### 表单页

```json
{
  "usingComponents": {
    "ant-form": "antd-mini/es/Form/index",
    "ant-form-item": "antd-mini/es/Form/FormItem/index",
    "ant-input": "antd-mini/es/Input/index",
    "ant-button": "antd-mini/es/Button/index"
  }
}
```

```xml
<view class="page">
  <ant-form onFinish="onSubmit">
    <ant-form-item label="姓名" name="name" required="{{true}}">
      <ant-input placeholder="请输入" />
    </ant-form-item>
    <view class="footer">
      <ant-button type="primary" formType="submit" loading="{{submitting}}">
        提交
      </ant-button>
    </view>
  </ant-form>
</view>
```

```css
.page { min-height: 100vh; background: #f5f5f5; }
.footer {
  padding: 32rpx 48rpx;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
}
```

---

## Web 后台 (antd + @ant-design/pro-components)

> **完整代码模板已提取** — 以下为快速索引，详细实现参见 `references/templates/web-*.tsx`
>
> | 场景 | 模板文件 | Style-extraction |
> |------|---------|-----------------|
> | 表格查询 | `web-table-query.tsx` | `web-表格查询页.md` |
> | 基础表单 | `web-basic-form.tsx` | `web-基础表单页.md` |
> | 分步表单 | `web-step-form.tsx` | `web-分步表单页.md` |
> | 单据详情 | `web-detail-page.tsx` | `web-单据详情页.md` |
> | 成功结果 | `web-success-result.tsx` | `web-成功结果页.md` |
> | 成员列表 | `web-member-list.tsx` | `web-成员列表页.md` |
> | 可编辑列表 | `web-editable-list.tsx` | `web-可编辑列表页.md` |
> | 设置 | `web-settings.tsx` | `web-设置页.md` |
> | 搜索 | `web-search.tsx` | `web-搜索页.md` |
> | 左右布局 | `web-split-layout.tsx` | `web-左右布局页.md` |
> | 工作项列表 | `web-work-item-list.tsx` | `web-工作项列表页.md` |

### 列表页（ProTable）

**最小版**：ProTable + 搜索 + CRUD

```tsx
import { ProTable } from '@ant-design/pro-components'
import type { ProColumns } from '@ant-design/pro-components'
import { Button, Tag } from 'antd'

interface Record { id: string; name: string; status: string; createdAt: string }

const columns: ProColumns<Record>[] = [
  { title: '名称', dataIndex: 'name' },
  {
    title: '状态', dataIndex: 'status',
    valueEnum: {
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
    },
  },
  { title: '创建时间', dataIndex: 'createdAt', valueType: 'dateTime' },
  {
    title: '操作', valueType: 'option',
    render: (_, record) => [
      <a key="edit">编辑</a>,
      <a key="delete">删除</a>,
    ],
  },
]

export default () => (
  <ProTable<Record>
    columns={columns}
    request={async (params) => {
      const res = await fetchList(params)
      return { data: res.list, success: true, total: res.total }
    }}
    headerTitle="查询表格"
    toolBarRender={() => [
      <Button type="primary" key="new">新建</Button>,
    ]}
    search={{ labelWidth: 'auto' }}
    rowKey="id"
  />
)
```

**完整版追加**：批量操作 + 导出 + 自定义筛选

```tsx
// 追加 rowSelection + 批量操作栏
<ProTable
  rowSelection={{ onChange: setSelectedKeys }}
  tableAlertRender={({ selectedRowKeys }) => (
    <span>已选 {selectedRowKeys.length} 项</span>
  )}
  tableAlertOptionRender={() => (
    <a onClick={handleBatchDelete}>批量删除</a>
  )}
  toolBarRender={() => [
    <Button key="export" onClick={handleExport}>导出</Button>,
    <Button type="primary" key="new">新建</Button>,
  ]}
/>
```

---

### 详情页（ProDescriptions + ProCard）

```tsx
import { ProCard, ProDescriptions } from '@ant-design/pro-components'
import { Button, Space, Tag } from 'antd'

interface DetailData { name: string; status: string; createdAt: string; [key: string]: string }

export default ({ data }: { data: DetailData }) => (
  <ProCard
    title="基础详情"
    headerBordered
    extra={
      <Space>
        <Button>编辑</Button>
        <Button type="primary">操作</Button>
      </Space>
    }
  >
    <ProDescriptions
      columns={[
        { title: '名称', dataIndex: 'name' },
        { title: '状态', dataIndex: 'status', render: (_, r) => <Tag color="success">{r.status}</Tag> },
        { title: '创建时间', dataIndex: 'createdAt', valueType: 'dateTime' },
      ]}
      dataSource={data}
      column={2}
    />
  </ProCard>
)
```

---

### 仪表盘（StatisticCard + ProCard）

```tsx
import { ProCard, StatisticCard } from '@ant-design/pro-components'

interface Stats { title: string; value: number; prefix?: string; suffix?: string; precision?: number }

export default ({ stats }: { stats: Stats[] }) => (
  <div className="dashboardPage">
    <ProCard gutter={[16, 16]} wrap>
      {stats.map((s, i) => (
        <ProCard key={i} colSpan={{ xs: 24, sm: 12, lg: 6 }}>
          <StatisticCard
            statistic={{
              title: s.title,
              value: s.value,
              prefix: s.prefix,
              suffix: s.suffix,
              precision: s.precision,
            }}
          />
        </ProCard>
      ))}
    </ProCard>
    <ProCard title="数据趋势" className="trendCard">
      {/* 图表区域 — 接入 @ant-design/charts */}
    </ProCard>
  </div>
)
```

```css
.dashboardPage { display: flex; flex-direction: column; gap: 16px; }
.trendCard { margin-top: 16px; }
```

---

### 表单页（ProForm）

```tsx
import { ProCard, ProForm, ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-components'
import { message } from 'antd'

export default () => (
  <ProCard title="新建">
    <ProForm
      onFinish={async (values) => {
        await createRecord(values)
        message.success('提交成功')
      }}
      submitter={{ searchConfig: { submitText: '提交', resetText: '重置' } }}
    >
      <ProFormText name="name" label="名称" rules={[{ required: true }]} placeholder="请输入" />
      <ProFormSelect
        name="type" label="类型"
        options={[{ label: '类型A', value: 'a' }, { label: '类型B', value: 'b' }]}
      />
      <ProFormDatePicker name="date" label="日期" />
    </ProForm>
  </ProCard>
)
```

---

## 布局决策参考

| 场景 | 方案 | 原因 |
|------|------|------|
| 单维排列（列表、表单、步骤条） | `flex` | 一维方向，flex 更简洁 |
| 二维网格（仪表盘统计卡、宫格入口） | `grid` 或 ProCard `gutter` | 需要行列对齐 |
| 固定底部操作栏 | `position: fixed` + `safe-area-inset-bottom` | 兼容全面屏 |
| 粘性头部 | `position: sticky; top: 0` | 不脱离文档流，滚动时保留 |
| 页面级滚动 | 外层 `overflow: auto`，内容自然撑高 | 避免嵌套滚动 |
