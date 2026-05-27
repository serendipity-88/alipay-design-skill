/**
 * Web 成功结果页模板
 * 设计模式：Result 结果页（带插画）
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-成功结果页.md
 *
 * 插槽标记：
 * [A] 页面标题
 * [B] 结果标题
 * [C] 副标题
 * [D] 描述文字
 * [E] 操作按钮
 * [F] PageContainer extra
 */

import { PageContainer } from '@ant-design/pro-components'
import { Result, Button, Space, Typography } from 'antd'

const { Text } = Typography

export default function SuccessResultPage() {
  return (
    <PageContainer
      /* [A] 页面标题 */
      title="分页浏览详情"
      content="注释，描述绩效等"
      breadcrumb={{
        items: [
          { title: '一级页面' },
          { title: '二级页面' },
          { title: '当前页面' },
        ],
      }}
      /* [F] PageContainer extra */
      extra={[
        <Button key="refresh">更新数据</Button>,
        <Button key="share">分享数据</Button>,
        <Button type="primary" key="export">导出数据</Button>,
      ]}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          padding: '80px 0',
          textAlign: 'center',
        }}
      >
        <Result
          status="success"
          /* [B] 结果标题 */
          title="应用创建成功"
          /* [C] 副标题 */
          subTitle="正在等待安全负责人审批，请耐心等待"
          /* [E] 操作按钮 */
          extra={[
            <Button type="primary" key="detail">
              查看详情
            </Button>,
            <Button key="back">返回列表</Button>,
          ]}
        >
          {/* [D] 描述文字 */}
          <Text type="secondary">
            这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述
          </Text>
        </Result>
      </div>
    </PageContainer>
  )
}
