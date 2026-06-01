/**
 * Web 工作项列表页模板
 * 设计模式：统计卡片 + ProList 工作项列表
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-工作项列表页.md
 *
 * 插槽标记：
 * [A] 页面标题
 * [B] 统计卡片
 * [C] Tab 筛选
 * [D] 列表条目
 * [E] 行操作
 * [F] 新建按钮
 */

import { PageContainer, ProList, ProCard, StatisticCard } from '@ant-design/pro-components'
import { Badge, Button, Space, Tabs, Typography, Popconfirm } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Text } = Typography
const { Statistic } = StatisticCard

interface WorkItem {
  id: string
  title: string
  description: string
  modelCount: number
  metricCount: number
  status: 'success' | 'running' | 'creating' | 'failed'
}

/* ── Mock 数据 ── */
const mockItems: WorkItem[] = [
  { id: '1', title: '实验名称', description: '系统性地沉淀 B 端体验设计的知识体系，感觉有一些干货在。', modelCount: 3090, metricCount: 3490, status: 'success' },
  { id: '2', title: '实验名称', description: '系统性地沉淀 B 端体验设计的知识体系，感觉有一些干货在。', modelCount: 3090, metricCount: 3490, status: 'success' },
  { id: '3', title: '实验名称', description: '系统性地沉淀 B 端体验设计的知识体系，感觉有一些干货在。', modelCount: 3090, metricCount: 3490, status: 'success' },
]

const statusMap = {
  success: { color: '#52c41a', text: '实验成功' },
  running: { color: '#1677FF', text: '实验中' },
  creating: { color: '#faad14', text: '创建中' },
  failed: { color: '#ff4d4f', text: '实验失败' },
}

export default function WorkItemListPage() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <PageContainer
      /* [A] 页面标题 */
      title="分页浏览详情"
      content="注释，描述摘要等"
      breadcrumb={{
        items: [
          { title: '一级页面' },
          { title: '二级页面' },
          { title: '当前页面' },
        ],
      }}
    >
      {/* ── [B] 统计卡片 ── */}
      <StatisticCard.Group direction="row" style={{ marginBottom: 24 }}>
        <StatisticCard statistic={{ title: '全部实验', value: 57 }} />
        <StatisticCard.Divider />
        <StatisticCard statistic={{ title: '创建中', value: 0 }} />
        <StatisticCard.Divider />
        <StatisticCard statistic={{ title: '实验中', value: 6 }} />
        <StatisticCard.Divider />
        <StatisticCard statistic={{ title: '实验成功', value: 2 }} />
        <StatisticCard.Divider />
        <StatisticCard statistic={{ title: '实验失败', value: 1 }} />
      </StatisticCard.Group>

      {/* ── [C] Tab 筛选 + [F] 新建按钮 ── */}
      <ProCard bordered={false} bodyStyle={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'all', label: '全部实验 99' },
              { key: 'mine', label: '我创建的实验 99' },
            ]}
          />
          <Button type="primary">新建</Button>
        </div>
      </ProCard>

      {/* ── [D] 列表条目 ── */}
      <ProList<WorkItem>
        dataSource={mockItems}
        rowKey="id"
        split
        metas={{
          title: {
            dataIndex: 'title',
          },
          description: {
            dataIndex: 'description',
          },
          subTitle: {
            render: (_, record) => (
              <Badge
                color={statusMap[record.status].color}
                text={statusMap[record.status].text}
              />
            ),
          },
          content: {
            render: (_, record) => (
              <Space size={40}>
                <div>
                  <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                    模型数
                  </Text>
                  <Text strong>{record.modelCount.toLocaleString()}</Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                    指标数
                  </Text>
                  <Text strong>{record.metricCount.toLocaleString()}</Text>
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                    实验状态
                  </Text>
                  <Badge
                    color={statusMap[record.status].color}
                    text={statusMap[record.status].text}
                  />
                </div>
              </Space>
            ),
          },
          /* [E] 行操作 */
          actions: {
            render: (_, record) => [
              <a key="edit">编辑</a>,
              <a key="copy">复制</a>,
              <Popconfirm key="delete" title="确定删除？">
                <a style={{ color: '#ff4d4f' }}>删除</a>
              </Popconfirm>,
              <Button
                key="more"
                type="text"
                size="small"
                icon={<EllipsisOutlined />}
              />,
            ],
          },
        }}
      />
    </PageContainer>
  )
}
