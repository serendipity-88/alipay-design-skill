/**
 * Web 左右布局页模板
 * 设计模式：左列表右详情（左右分栏）
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-左右布局页.md
 *
 * 插槽标记：
 * [A] 页面标题 + Tab 导航
 * [B] 左侧列表列
 * [C] 左侧选中项
 * [D] 右侧标题
 * [E] 右侧监控图表
 */

import { PageContainer, ProCard } from '@ant-design/pro-components'
import { Table, Typography, Row, Col } from 'antd'
import { useState } from 'react'

const { Text, Title } = Typography

interface ServerItem {
  ip: string
  cpu: string
  mem: string
}

/* ── Mock 数据 ── */
const serverList: ServerItem[] = [
  { ip: '106.14.98.124', cpu: '12%', mem: '45%' },
  { ip: '106.14.98.125', cpu: '8%', mem: '32%' },
  { ip: '106.14.98.126', cpu: '15%', mem: '67%' },
  { ip: '106.14.98.127', cpu: '22%', mem: '55%' },
  { ip: '106.14.98.128', cpu: '5%', mem: '28%' },
  { ip: '106.14.98.129', cpu: '18%', mem: '72%' },
  { ip: '106.14.98.130', cpu: '9%', mem: '41%' },
  { ip: '106.14.98.131', cpu: '31%', mem: '88%' },
]

/* ── [E] 图表占位组件 ── */
function ChartPlaceholder({ title }: { title: string }) {
  return (
    <ProCard title={title} bordered style={{ height: 240 }}>
      <div
        style={{
          height: 160,
          background:
            'linear-gradient(90deg, transparent 0%, transparent 49%, #f0f0f0 49%, #f0f0f0 51%, transparent 51%)',
          backgroundSize: '20px 100%',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 8px',
        }}
      >
        {/* 替换为实际图表组件：@ant-design/charts Line */}
        <Text type="secondary" style={{ fontSize: 12 }}>
          使用 @ant-design/charts Line 组件渲染
        </Text>
      </div>
    </ProCard>
  )
}

export default function SplitLayoutPage() {
  const [selectedIp, setSelectedIp] = useState(serverList[0].ip)

  /* ── [B] 左侧列表列 ── */
  const listColumns = [
    { title: 'IP', dataIndex: 'ip', width: 140 },
    { title: 'CPU', dataIndex: 'cpu', width: 60, align: 'right' as const },
    { title: 'Mem', dataIndex: 'mem', width: 60, align: 'right' as const },
  ]

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
      tabList={[
        { tab: '概览', key: 'overview' },
        { tab: '监控', key: 'monitor' },
        { tab: '日志', key: 'logs' },
      ]}
    >
      <ProCard split="vertical" bordered={false}>
        {/* ── 左侧列表 ── */}
        <ProCard colSpan="320px" bodyStyle={{ padding: 0 }}>
          <Table
            columns={listColumns}
            dataSource={serverList}
            rowKey="ip"
            size="small"
            pagination={false}
            onRow={(record) => ({
              onClick: () => setSelectedIp(record.ip),
              style: {
                cursor: 'pointer',
                background: record.ip === selectedIp ? '#e6f4ff' : undefined,
              },
            })}
          />
        </ProCard>

        {/* ── 右侧详情 ── */}
        <ProCard
          /* [D] 右侧标题 */
          title={`IP: ${selectedIp}`}
          headerBordered
        >
          {/* [E] 监控图表网格 */}
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <ChartPlaceholder title="Mem 使用率" />
            </Col>
            <Col span={12}>
              <ChartPlaceholder title="CPU 使用率" />
            </Col>
            <Col span={12}>
              <ChartPlaceholder title="Disk 使用率" />
            </Col>
            <Col span={12}>
              <ChartPlaceholder title="Load" />
            </Col>
          </Row>
        </ProCard>
      </ProCard>
    </PageContainer>
  )
}
