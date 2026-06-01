/**
 * Web 单据详情页模板
 * 设计模式：ProDescriptions + Timeline 审批详情
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-单据详情页.md
 *
 * 插槽标记：
 * [A] 页面标题
 * [B] 审批步骤
 * [C] 基本信息字段
 * [D] 费用明细列
 * [E] 审批流程记录
 * [F] 操作按钮
 */

import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components'
import type { ProColumns } from '@ant-design/pro-components'
import { Steps, Table, Timeline, Button, Space, Tag, Typography } from 'antd'

const { Text } = Typography

/* ── [D] 费用明细数据类型 ── */
interface ExpenseItem {
  id: string
  name: string
  quantity: number
  unit: string
  unitPrice: number
  amount: number
}

/* ── [D] 费用明细列 ── */
const expenseColumns = [
  { title: '费用明细-物品名称', dataIndex: 'name' },
  { title: '数量', dataIndex: 'quantity', align: 'right' as const },
  { title: '单位', dataIndex: 'unit' },
  {
    title: '单价',
    dataIndex: 'unitPrice',
    align: 'right' as const,
    render: (v: number) => `¥${v.toFixed(2)}`,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    align: 'right' as const,
    render: (v: number) => (
      <Text strong style={{ fontFamily: 'DINPro, tabular-nums' }}>
        ¥{v.toFixed(2)}
      </Text>
    ),
  },
  {
    title: '',
    dataIndex: 'currency',
    width: 60,
    render: () => <Text type="secondary">CNY</Text>,
  },
]

/* ── Mock 数据 ── */
const expenseData: ExpenseItem[] = [
  { id: '1', name: '这是数据信息的列表名称', quantity: 10, unit: '件', unitPrice: 32, amount: 454.98 },
  { id: '2', name: '这是数据信息的列表名称', quantity: 8, unit: '件', unitPrice: 45, amount: 454.98 },
  { id: '3', name: '这是数据信息的列表名称', quantity: 5, unit: '件', unitPrice: 80, amount: 454.98 },
]

export default function DetailPage() {
  const totalAmount = expenseData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <PageContainer
      /* [A] 页面标题 */
      title="分页浏览详情"
      breadcrumb={{
        items: [
          { title: '一级页面' },
          { title: '二级页面' },
          { title: '结果返回' },
        ],
      }}
      /* [F] 操作按钮 */
      extra={[
        <Button key="reject">驳回</Button>,
        <Button type="primary" key="approve">通过</Button>,
      ]}
      content={
        /* [B] 审批步骤 */
        <Steps
          size="small"
          current={1}
          items={[
            { title: '提交', description: '2019-07-05' },
            { title: '审批中', description: '处理中' },
            { title: '结果返回' },
          ]}
          style={{ maxWidth: 600, margin: '16px 0' }}
        />
      }
    >
      {/* ── [C] 基本信息 ── */}
      <ProCard title="基本信息" bordered={false} style={{ marginBottom: 24 }}>
        <ProDescriptions
          column={3}
          columns={[
            { title: '创建人', dataIndex: 'creator' },
            { title: '创建日期', dataIndex: 'createdAt', valueType: 'dateTime' },
            {
              title: '关联采购订单',
              dataIndex: 'orderLink',
              render: (_, r) => <a>{r.orderLink}</a>,
            },
            {
              title: '说明',
              dataIndex: 'remark',
              span: 3,
              valueType: 'text',
            },
          ]}
          dataSource={{
            creator: '这是备注用户的信息',
            createdAt: '2019-07-05 18:52:07',
            orderLink: '自定义链接自定义链接',
            remark: '这是备注用户写的信息，附件名称连接。其他备注信息其他备注信息其他备注信息',
          }}
        />
      </ProCard>

      {/* ── [D] 费用明细 ── */}
      <ProCard title="费用明细表" bordered={false} style={{ marginBottom: 24 }}>
        <Table
          columns={expenseColumns}
          dataSource={expenseData}
          rowKey="id"
          pagination={false}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4} align="right">
                <Text strong>费用合计:</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                <Text strong style={{ fontFamily: 'DINPro, tabular-nums', fontSize: 16 }}>
                  ¥{totalAmount.toFixed(2)}
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text type="secondary">CNY</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </ProCard>

      {/* ── [E] 审批流程 ── */}
      <ProCard title="审批流程" bordered={false}>
        <Timeline
          items={[
            {
              color: 'blue',
              children: (
                <>
                  <div><Text strong>创建</Text> <Text type="secondary">2019-06-15</Text></div>
                  <div><Text type="secondary">审批节点描述</Text></div>
                </>
              ),
            },
            {
              color: 'blue',
              children: (
                <>
                  <div><Text strong>审批</Text> <Text type="secondary">2019-06-15</Text></div>
                  <div><Text type="secondary">审批已通过，补充说明...</Text></div>
                </>
              ),
            },
            {
              color: 'gray',
              children: (
                <>
                  <div><Text strong>审批</Text></div>
                  <div><Text type="secondary">待审批</Text></div>
                </>
              ),
            },
          ]}
        />
      </ProCard>
    </PageContainer>
  )
}
