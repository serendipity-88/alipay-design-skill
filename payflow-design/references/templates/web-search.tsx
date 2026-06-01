/**
 * Web 搜索页模板
 * 设计模式：搜索结果列表
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-搜索页.md
 *
 * 插槽标记：
 * [A] 页面标题
 * [B] 搜索关键词
 * [C] Tab 分类
 * [D] 结果条目
 * [E] 分页配置
 */

import { PageContainer } from '@ant-design/pro-components'
import { Input, Tabs, List, Typography, Space, Pagination, Card } from 'antd'
import { useState } from 'react'

const { Text, Title, Paragraph, Link } = Typography
const { Search } = Input

interface SearchResultItem {
  id: string
  title: string
  description: string
  source: string
  date: string
  thumbnail?: string
  url: string
}

/* ── Mock 数据 ── */
const mockResults: SearchResultItem[] = [
  {
    id: '1',
    title: '业务平台资产',
    description: '平台的资源监控方案设计，具体使用以下方式 https://example.com，内容是关于如何优化资产管理...',
    source: 'https://example.com',
    date: '2017-11-16',
    thumbnail: '',
    url: '#',
  },
  {
    id: '2',
    title: '业务平台资产',
    description: '全站搜索通过对关键词的分析，可以帮用户快速查找到需要的内容，快来学习使用技巧...',
    source: 'https://example.com',
    date: '2017-11-16',
    thumbnail: '',
    url: '#',
  },
  {
    id: '3',
    title: '业务平台资产',
    description: '技术文档中包含了平台最新的使用手册和开发指南，详细介绍了各项功能模块...',
    source: 'https://example.com',
    date: '2017-11-16',
    thumbnail: '',
    url: '#',
  },
]

export default function SearchPage() {
  const [keyword, setKeyword] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  /* 高亮关键词 */
  const highlightText = (text: string, kw: string) => {
    if (!kw) return text
    const parts = text.split(new RegExp(`(${kw})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === kw.toLowerCase() ? (
        <Text key={i} style={{ color: '#1677FF', fontWeight: 600 }}>
          {part}
        </Text>
      ) : (
        part
      ),
    )
  }

  return (
    <PageContainer
      /* [A] 页面标题 */
      title="分页浏览详情"
      breadcrumb={{
        items: [
          { title: '一级页面' },
          { title: '二级页面' },
          { title: '当前页面' },
        ],
      }}
    >
      {/* ── [B] 搜索框 ── */}
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Search
          placeholder="请输入关键词"
          enterButton="搜索"
          size="large"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={(value) => console.log('搜索:', value)}
        />
      </Card>

      {/* ── [C] Tab 分类 ── */}
      <Card bordered={false}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { key: 'all', label: '全部' },
            { key: 'learn', label: '学习区' },
            { key: 'tech', label: '技术区' },
            { key: 'featured', label: '精选内容' },
            { key: 'discuss', label: '互动讨论' },
          ]}
        />

        {/* ── [D] 结果列表 ── */}
        <List
          itemLayout="vertical"
          dataSource={mockResults}
          renderItem={(item) => (
            <List.Item
              extra={
                item.thumbnail !== undefined && (
                  <div
                    style={{
                      width: 120,
                      height: 80,
                      borderRadius: 4,
                      background: 'linear-gradient(135deg, #1677FF 0%, #0050B3 100%)',
                    }}
                  />
                )
              }
            >
              <List.Item.Meta
                title={
                  <Link href={item.url} style={{ fontSize: 16 }}>
                    {highlightText(item.title, keyword)}
                  </Link>
                }
                description={
                  <Paragraph
                    type="secondary"
                    ellipsis={{ rows: 2 }}
                    style={{ marginBottom: 4 }}
                  >
                    {item.description}
                  </Paragraph>
                }
              />
              <Space>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {item.source}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {item.date}
                </Text>
              </Space>
            </List.Item>
          )}
        />

        {/* ── [E] 分页 ── */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination
            defaultCurrent={1}
            total={50}
            showSizeChanger={false}
          />
        </div>
      </Card>
    </PageContainer>
  )
}
