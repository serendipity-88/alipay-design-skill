/**
 * Web 基础新建表单模板
 * 设计模式：ProForm 基础表单（居中单步表单）
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-基础表单页.md
 *
 * 插槽标记：
 * [A] 页面标题
 * [B] 页面描述
 * [C] 表单字段
 * [D] 技术栈选项
 * [E] 提交按钮文案
 */

import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormUploadButton,
} from '@ant-design/pro-components'
import { Card, message } from 'antd'

/* ── [D] 技术栈选项 ── */
const techOptions = [
  { label: 'Spring Boot', value: 'spring', description: '业界流行的技术栈' },
  { label: 'Spring Boot', value: 'spring2', description: '业界流行的技术栈' },
  { label: 'Node.js', value: 'node', description: '业界流行的技术栈' },
]

export default function BasicFormPage() {
  return (
    <PageContainer
      /* [A] 页面标题 */
      title="基础表单"
      /* [B] 页面描述 */
      content="注释，提交绩效等"
      breadcrumb={{
        items: [
          { title: '一级页面' },
          { title: '二级页面' },
          { title: '基础表单' },
        ],
      }}
    >
      <Card bordered={false}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <ProForm
            layout="vertical"
            onFinish={async (values) => {
              console.log(values)
              message.success('创建成功')
            }}
            submitter={{
              searchConfig: {
                /* [E] 提交按钮文案 */
                submitText: '创 建',
              },
              resetButtonProps: { style: { display: 'none' } },
              submitButtonProps: {
                size: 'large',
                style: { width: '100%' },
              },
            }}
          >
            {/* [C] 表单字段 */}

            {/* 技术栈选择（卡片样式） */}
            <ProForm.Item
              label="技术栈"
              name="techStack"
              rules={[{ required: true, message: '请选择技术栈' }]}
            >
              <div style={{ display: 'flex', gap: 16 }}>
                {techOptions.map((opt) => (
                  <Card
                    key={opt.value}
                    hoverable
                    style={{
                      width: 160,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    bodyStyle={{ padding: '16px 12px' }}
                  >
                    <div style={{ fontWeight: 500, fontSize: 14 }}>
                      {opt.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--ant-color-text-description)',
                        marginTop: 4,
                      }}
                    >
                      {opt.description}
                    </div>
                  </Card>
                ))}
              </div>
            </ProForm.Item>

            <ProFormText
              name="name"
              label="小程序名称"
              rules={[{ required: true, message: '请输入名称' }]}
              placeholder="请输入"
              extra="名称由中文、英文、下划线、-、- 组成。"
            />

            <ProFormTextArea
              name="description"
              label="小程序简介"
              rules={[{ required: true, message: '请输入简介' }]}
              placeholder="请输入"
              fieldProps={{ rows: 3 }}
            />

            <ProFormSelect
              name="admin"
              label="项目管理员"
              placeholder="请输入"
              extra="一个小程序项目最多可添加 5 个管理员。"
              fieldProps={{
                mode: 'multiple',
                maxCount: 5,
              }}
            />

            <ProFormUploadButton
              name="logo"
              label="小程序 logo"
              title="上传文件"
              extra="可拖拽图片到左侧区域上传"
              fieldProps={{
                listType: 'picture-card',
                maxCount: 1,
              }}
            />
          </ProForm>
        </div>
      </Card>
    </PageContainer>
  )
}
