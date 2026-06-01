/**
 * Web 成员列表页模板
 * 设计模式：ProTable 成员管理列表
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-成员列表页.md
 *
 * 插槽标记：
 * [A] 页面标题
 * [B] 表格列定义
 * [C] 搜索配置（本例关闭）
 * [D] 工具栏
 * [E] 行操作
 * [F] PageContainer extra
 */

import { PageContainer, ProTable } from '@ant-design/pro-components'
import type { ProColumns } from '@ant-design/pro-components'
import { Avatar, Button, Space, Tag, Popconfirm, Typography } from 'antd'
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons'

const { Text } = Typography

interface MemberItem {
  id: string
  name: string
  avatar?: string
  email: string
  phone: string
  verified: boolean
  role: string
  joinedAt: string
}

/* ── [B] 表格列定义 ── */
const columns: ProColumns<MemberItem>[] = [
  {
    title: '成员名称',
    dataIndex: 'name',
    width: 200,
    render: (_, record) => (
      <Space>
        <Avatar size={32} src={record.avatar} icon={<UserOutlined />} />
        <Text strong>{record.name}</Text>
      </Space>
    ),
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 160,
  },
  {
    title: '验证状态',
    dataIndex: 'verified',
    width: 80,
    align: 'center',
    render: (verified: boolean) =>
      verified ? <CheckCircleFilled style={{ color: '#52c41a' }} /> : null,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 120,
    render: (role: string) => (
      <Tag color={role === '管理员' ? 'blue' : 'default'}>{role}</Tag>
    ),
  },
  {
    title: '加入时间',
    dataIndex: 'joinedAt',
    width: 180,
    valueType: 'dateTime',
  },
  {
    /* [E] 行操作 */
    title: '操作',
    valueType: 'option',
    width: 120,
    render: (_, record) => (
      <Space>
        <a>编辑</a>
        <Popconfirm title="确定移除该成员？">
          <a style={{ color: '#ff4d4f' }}>删除</a>
        </Popconfirm>
      </Space>
    ),
  },
]

/* ── Mock 数据 ── */
const mockData: MemberItem[] = [
  { id: '1', name: '张三', email: 'zhangsan@example.com', phone: '13800138001', verified: true, role: '管理员', joinedAt: '2024-01-15 10:30:00' },
  { id: '2', name: '李四', email: 'lisi@example.com', phone: '13800138002', verified: true, role: '成员', joinedAt: '2024-02-20 14:00:00' },
  { id: '3', name: '王五', email: 'wangwu@example.com', phone: '13800138003', verified: true, role: '管理员', joinedAt: '2024-03-10 09:15:00' },
  { id: '4', name: '赵六', email: 'zhaoliu@example.com', phone: '13800138004', verified: false, role: '成员', joinedAt: '2024-04-05 16:45:00' },
]

export default function MemberListPage() {
  return (
    <PageContainer
      /* [A] 页面标题 */
      title="组员列表"
      content="管理团队成员与权限"
      breadcrumb={{
        items: [
          { title: '一级页面' },
          { title: '二级页面' },
          { title: '组员列表' },
        ],
      }}
      /* [F] PageContainer extra */
      extra={[
        <Button key="refresh">更新数据</Button>,
        <Button key="share">分享数据</Button>,
        <Button type="primary" key="export">导出数据</Button>,
      ]}
    >
      <ProTable<MemberItem>
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        /* [C] 搜索关闭 */
        search={false}
        /* [D] 工具栏 */
        toolBarRender={() => [
          <Button type="primary" key="invite">
            邀请成员
          </Button>,
        ]}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />
    </PageContainer>
  )
}
