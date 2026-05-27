/**
 * Web 设置页模板
 * 设计模式：Tabs + 表单设置
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * Style-extraction：web-设置页.md
 *
 * 插槽标记：
 * [A] 页面标题
 * [B] Tab 列表
 * [C] 设置项
 * [D] 辅助说明文字
 * [E] 分区操作按钮
 */

import { PageContainer } from '@ant-design/pro-components'
import { Radio, Checkbox, Switch, Divider, Button, Typography, Space } from 'antd'
import { useState } from 'react'

const { Text, Title } = Typography

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('notification')
  const [sortOrder, setSortOrder] = useState('time')
  const [desktopPush, setDesktopPush] = useState(true)

  return (
    <PageContainer
      /* [A] 页面标题 */
      title="全局设置"
      content="注释，描述摘要等"
      breadcrumb={{
        items: [
          { title: '一级页面' },
          { title: '二级页面' },
          { title: '当前页面' },
        ],
      }}
      /* [B] Tab 列表 */
      tabList={[
        { tab: '全局通知', key: 'notification' },
        { tab: '团队设置', key: 'team' },
        { tab: '高级设置', key: 'advanced' },
      ]}
      tabActiveKey={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'notification' && (
        <div style={{ maxWidth: 600, padding: '24px 0' }}>
          {/* ── [C] 设置项：通知排序 ── */}
          <div style={{ marginBottom: 24 }}>
            <Title level={5} style={{ marginBottom: 12 }}>
              通知默认排序
            </Title>
            <Radio.Group value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <Radio value="time">时间优先</Radio>
              <Radio value="unread">未读优先</Radio>
            </Radio.Group>
          </div>

          {/* ── [C] 设置项：通知内容 ── */}
          <div style={{ marginBottom: 24 }}>
            <Title level={5} style={{ marginBottom: 12 }}>
              通知内容
            </Title>
            <Checkbox.Group
              defaultValue={['basic', 'update', 'related']}
              options={[
                { label: '基本动态', value: 'basic' },
                { label: '更新动态', value: 'update' },
                { label: '关联内容动态', value: 'related' },
              ]}
            />
            {/* [D] 辅助说明文字 */}
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                未勾选的消息类型将停止推送，且在通知列表中不累计计数
              </Text>
            </div>
          </div>

          {/* ── [C] 设置项：桌面推送 ── */}
          <div style={{ marginBottom: 24 }}>
            <Title level={5} style={{ marginBottom: 12 }}>
              桌面推送
            </Title>
            <Switch checked={desktopPush} onChange={setDesktopPush} />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                开启后，有新消息时浏览器会向你推送动态通知
              </Text>
            </div>
          </div>

          <Divider />

          {/* ── [E] 分区操作：邮件设置 ── */}
          <div>
            <Title level={5} style={{ marginBottom: 8 }}>
              邮件设置
            </Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
              用邮件订阅不同类型的消息
            </Text>
            <Button>立即设置</Button>
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div style={{ padding: '24px 0' }}>
          <Text type="secondary">团队设置内容</Text>
        </div>
      )}

      {activeTab === 'advanced' && (
        <div style={{ padding: '24px 0' }}>
          <Text type="secondary">高级设置内容</Text>
        </div>
      )}
    </PageContainer>
  )
}
