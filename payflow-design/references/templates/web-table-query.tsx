/**
 * Web 表格查询页模板
 * 设计模式：ProTable 查询页（最常见 Web 后台模式）
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-表格查询页.md
 *
 * 插槽标记：
 * [A] 页面标题
 * [B] 搜索字段（columns 中 hideInTable 的）
 * [C] 表格列定义
 * [D] 工具栏按钮
 * [E] 行操作
 * [F] 左侧菜单项
 */

import { PageContainer, ProTable } from '@ant-design/pro-components'
import type { ProColumns } from '@ant-design/pro-components'
import { Button, Tag, Space, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

/* ── [C] 数据类型定义 ── */
interface Record {
  id: string
  title: string
  type: string
  creator: string
  createdAt: string
  status: 'draft' | 'published' | 'archived'
}

/* ── [C] 表格列 + [B] 搜索字段 ── */
const columns: ProColumns<Record>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 56,
  },
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
    width: 240,
    /* [B] 自动出现在搜索区 */
  },
  {
    title: '类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: {
      doc: { text: '文档' },
      sheet: { text: '表格' },
      slide: { text: '演示' },
    },
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      draft: { text: '草稿', status: 'Default' },
      published: { text: '已发布', status: 'Success' },
      archived: { text: '已归档', status: 'Processing' },
    },
    width: 100,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
    width: 180,
    sorter: true,
    hideInSearch: true,
  },
  {
    /* [E] 行操作 */
    title: '操作',
    valueType: 'option',
    width: 160,
    render: (_, record) => (
      <Space>
        <a key="edit">编辑</a>
        <a key="view">查看</a>
        <Popconfirm title="确认删除？" key="delete">
          <Button type="link" danger size="small">
            删除
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
]

export default function TableQueryPage() {
  return (
    <PageContainer
      /* [A] 页面标题 */
      title="分页浏览列表"
      breadcrumb={{
        items: [
          { title: '列表页' },
          { title: '查询表格' },
        ],
      }}
    >
      <ProTable<Record>
        columns={columns}
        rowKey="id"
        request={async (params, sort) => {
          try {
            /* 替换为真实 API */
            const res = await fetch('/api/list', {
              method: 'POST',
              body: JSON.stringify({ ...params, sort }),
            }).then(r => r.json())
            return {
              data: res.list,
              success: true,
              total: res.total,
            }
          } catch (error) {
            return {
              data: [],
              success: false,
              total: 0,
            }
          }
        }}
        locale={{ emptyText: '暂无数据' }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        rowSelection={{}}
        /* [D] 工具栏按钮 */
        toolBarRender={() => [
          <Button type="primary" key="new" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
        headerTitle="高级格式选项（指编版）"
        dateFormatter="string"
        options={{ density: true, fullScreen: true, setting: true }}
      />
    </PageContainer>
  )
}
