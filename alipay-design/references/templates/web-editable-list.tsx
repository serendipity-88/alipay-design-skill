/**
 * Web 可编辑列表页模板
 * 设计模式：ProForm + EditableProTable 可编辑表格
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-可编辑列表页.md
 *
 * 插槽标记：
 * [A] 页面标题
 * [B] 表单字段
 * [C] 可编辑表格列
 * [D] 新增行默认值
 * [E] 底部操作按钮
 */

import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormSelect,
  EditableProTable,
} from '@ant-design/pro-components'
import type { ProColumns } from '@ant-design/pro-components'
import { Button, Card, Space, message } from 'antd'
import { useState } from 'react'

interface ActivityItem {
  id: string
  name: string
  description: string
  quantity: number
}

export default function EditableListPage() {
  const [dataSource, setDataSource] = useState<ActivityItem[]>([
    { id: '1', name: '活动名称一', description: '这是一段文案，描述活动有多么多么好玩', quantity: 25 },
    { id: '2', name: '活动名称二', description: '这是一段文案，描述活动有多么多么好玩', quantity: 5 },
    { id: '3', name: '活动名称三', description: '这是一段文案，描述活动有多么多么好玩', quantity: 57 },
  ])
  const [editableKeys, setEditableKeys] = useState<string[]>([])

  /* ── [C] 可编辑表格列 ── */
  const columns: ProColumns<ActivityItem>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 60,
      editable: false,
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      width: 160,
      formItemProps: { rules: [{ required: true, message: '请输入活动名称' }] },
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '奖品数量(份)',
      dataIndex: 'quantity',
      valueType: 'digit',
      width: 120,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record, __, action) => (
        <Space>
          <a onClick={() => {
            /* 复制逻辑：添加一行相同数据 */
            const newRow = { ...record, id: Date.now().toString() }
            setDataSource((prev) => [...prev, newRow])
          }}>
            复制
          </a>
          <a onClick={() => {
            setDataSource((prev) => prev.filter((r) => r.id !== record.id))
          }}>
            删除
          </a>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      /* [A] 页面标题 */
      title="可编辑表格"
      content="注释，描述摘要等"
      breadcrumb={{
        items: [
          { title: '一级页面' },
          { title: '二级页面' },
          { title: '当前页面' },
        ],
      }}
    >
      <Card bordered={false}>
        <ProForm
          onFinish={async (values) => {
            console.log('表单值:', values, '表格数据:', dataSource)
            message.success('提交成功')
          }}
          submitter={{
            /* [E] 底部操作按钮 */
            render: (_, dom) => (
              <Space style={{ marginTop: 24 }}>
                {dom}
              </Space>
            ),
            searchConfig: {
              submitText: '提交',
              resetText: '取消',
            },
          }}
        >
          {/* ── [B] 表单字段 ── */}
          <ProFormText
            name="taskName"
            label="推广任务名称"
            placeholder="请输入"
            width="md"
            rules={[{ required: true }]}
          />
          <ProFormSelect
            name="tags"
            label="任务标签"
            mode="tags"
            width="md"
            placeholder="请输入标签"
            fieldProps={{
              defaultValue: ['蔡芳华', '诚企'],
            }}
          />
          <ProFormSelect
            name="plan"
            label="所属推广计划"
            placeholder="请选择"
            width="md"
            options={[
              { label: '推广计划一', value: '1' },
              { label: '推广计划二', value: '2' },
            ]}
          />

          {/* ── 活动方案 (可编辑表格) ── */}
          <ProForm.Item label="活动方案" trigger="onValuesChange">
            <EditableProTable<ActivityItem>
              columns={columns}
              value={dataSource}
              onChange={setDataSource}
              rowKey="id"
              recordCreatorProps={{
                /* [D] 新增行默认值 */
                newRecordType: 'dataSource',
                record: () => ({
                  id: Date.now().toString(),
                  name: '',
                  description: '',
                  quantity: 0,
                }),
                creatorButtonText: '添加 1 行数据',
              }}
              editable={{
                type: 'multiple',
                editableKeys,
                onChange: setEditableKeys,
                actionRender: (row, config, defaultDom) => [
                  defaultDom.save,
                  defaultDom.cancel,
                ],
              }}
            />
          </ProForm.Item>
        </ProForm>
      </Card>
    </PageContainer>
  )
}
