/**
 * Web 分步表单模板
 * 设计模式：StepsForm 分步向导
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-分步表单页.md
 *
 * 插槽标记：
 * [A] 页面标题 + 描述
 * [B] 步骤名称
 * [C] 每步表单字段
 * [D] 最终提交按钮文案
 */

import {
  PageContainer,
  StepsForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormCheckbox,
} from '@ant-design/pro-components'
import { Card, message } from 'antd'

export default function StepFormPage() {
  return (
    <PageContainer
      /* [A] 页面标题 */
      title="分步表单"
      content="注释，描述绩效等"
      breadcrumb={{
        items: [
          { title: '一级页面' },
          { title: '二级页面' },
          { title: '当前页面' },
        ],
      }}
    >
      <Card bordered={false}>
        <StepsForm
          stepsProps={{
            style: { maxWidth: 600, margin: '0 auto 40px' },
          }}
          formProps={{
            style: { maxWidth: 520, margin: '0 auto' },
            layout: 'vertical',
          }}
          onFinish={async (values) => {
            console.log(values)
            message.success('发布成功')
          }}
        >
          {/* ── Step 1: [B] 步骤名称 ── */}
          <StepsForm.StepForm
            name="step1"
            title="步骤名称"
            /* [C] 表单字段 */
          >
            <ProFormSelect
              name="project"
              label="所属项目"
              rules={[{ required: true }]}
              options={[
                { label: 'Ant Design Pro', value: 'antd' },
                { label: '业务组件库', value: 'techui' },
              ]}
              placeholder="请选择"
            />
            <ProForm.Group>
              <ProFormSelect
                name="role"
                label="用户角色"
                rules={[{ required: true }]}
                options={[
                  { label: '开发者', value: 'dev' },
                  { label: '测试', value: 'qa' },
                  { label: '运维', value: 'ops' },
                ]}
                width="sm"
              />
              <ProFormText
                name="userName"
                label=" "
                placeholder="请输入用户名称"
                width="md"
              />
            </ProForm.Group>
            <ProFormText
              name="experimentName"
              label="实验名称"
              rules={[{ required: true }]}
              placeholder="请输入"
            />
            <ProFormTextArea
              name="experimentDesc"
              label="实验描述"
              placeholder="请输入"
              fieldProps={{ rows: 4 }}
            />
          </StepsForm.StepForm>

          {/* ── Step 2: 配置信息 ── */}
          <StepsForm.StepForm name="step2" title="步骤名称">
            <ProFormSelect
              name="config1"
              label="配置项一"
              placeholder="请选择"
              options={[
                { label: '配置A', value: 'a' },
                { label: '配置B', value: 'b' },
              ]}
            />
            <ProFormSelect
              name="config2"
              label="配置项二"
              placeholder="请选择"
              options={[
                { label: '选项A', value: 'a' },
                { label: '选项B', value: 'b' },
              ]}
            />
          </StepsForm.StepForm>

          {/* ── Step 3: 部署确认 ── */}
          <StepsForm.StepForm
            name="step3"
            title="步骤名称"
            stepProps={{
              /* [D] 最终提交按钮文案 */
              description: '确认并发布',
            }}
          >
            <ProFormCheckbox.Group
              name="deployUnits"
              label="部署单元"
              rules={[{ required: true }]}
              options={['部署单元1', '部署单元2', '部署单元3']}
            />
            <ProFormSelect
              name="deployStrategy"
              label="部署分组策略"
              rules={[{ required: true }]}
              placeholder="请选择"
              options={[
                { label: '策略一', value: '1' },
                { label: '策略二', value: '2' },
              ]}
            />
            <ProFormSelect
              name="podStrategy"
              label="Pod 调度策略"
              placeholder="请选择"
              options={[
                { label: '策略一', value: '1' },
                { label: '策略二', value: '2' },
              ]}
            />
          </StepsForm.StepForm>
        </StepsForm>
      </Card>
    </PageContainer>
  )
}
