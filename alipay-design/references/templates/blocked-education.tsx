/**
 * ============================================================
 * 轻触支付阵地页 · 受阻教育板块 · 完整参考模板
 * ============================================================
 *
 * 直接复制此文件，替换 [A]-[G] 标记的内容区域。
 *
 * ── 模板说明 ──
 * 受阻教育页
 * 画布: 375×812 @1x (iPhone X)
 *
 * ── 页面叙事结构 ──
 * 第一幕 · 情绪安抚（0-5%）：受阻提示条，温和告知
 * 第二幕 · 原因+方案（5-30%）：失败原因卡片 + 步骤流 + 双CTA
 * 第三幕 · 正向激励（30-35%）：红包激励条，暖色跳出
 * 第四幕 · 日常内容（35-100%）：保持原阵地页内容不变
 *
 * ── 设计模式 ──
 * 情绪安抚型 (Emotional Comfort)
 *   渐变: #E8F2FF → #D6E8FF → #F5F5F5（蓝色=冷静/信任）
 *   白卡: 圆角20px, 阴影 rgba(90,110,149,0.08)
 *   双CTA: 主蓝色渐变 + 次浅蓝底
 *   激励条: 暖色渐变 #FFF5ED → #FFE8D6
 *
 * ── 关键产品设计决策（必须保留） ──
 * 1. 蓝色渐变替换橙色：受阻场景需冷静/信任感
 * 2. 提示条用轻量蓝底：不制造焦虑，温和告知
 * 3. 安抚文案用数据：「90%用户开启后就能顺利碰」社会认同
 * 4. 步骤流限3步：hero区空间有限，一行放下
 * 5. 双CTA（主+次）：主路径解决问题 + 备选降低挫败感
 * 6. 激励条暖色：蓝色冷静基调中一抹暖色吸引注意
 *
 * ── 替换指南 ──
 * [A] 受阻提示条 — 文案可替换，支持关闭
 * [B] 失败类型标签 — 由后端失败原因映射，5种预设
 * [C] 主标题 + 安抚文案 — 随失败类型变化
 * [D] 步骤流 — 2~3步，随失败类型变化
 * [E] 主CTA — 文案和跳转随场景变化
 * [F] 次CTA — 固定「换个方式试试」→跳转收银台
 * [G] 激励条 — 红包金额、描述、跳转可配置
 */

import React from 'react'
import { Button } from 'antd-mobile'

/* ═══════════════════════════════════════════
 * Inline SVG 图标
 * ═══════════════════════════════════════════ */

const InfoIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} fill="none">
    <circle cx="8" cy="8" r="7" stroke="#1677FF" strokeWidth="1.2" />
    <path d="M8 7v4" stroke="#1677FF" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="8" cy="5" r="0.8" fill="#1677FF" />
  </svg>
)

const ArrowIcon: React.FC = () => (
  <svg viewBox="0 0 12 12" width={12} height={12} fill="none">
    <path d="M2 6h8M7 3l3 3-3 3" stroke="#CCCCCC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const RedPacketIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" width={20} height={20} fill="none">
    <rect x="3" y="2" width="14" height="16" rx="2" fill="#FF3141" />
    <rect x="3" y="2" width="14" height="8" rx="2" fill="#FF5A5F" />
    <circle cx="10" cy="10" r="3" fill="#FFD700" stroke="#FF3141" strokeWidth="0.5" />
    <rect x="9" y="7" width="2" height="2" rx="1" fill="#FFD700" />
  </svg>
)

const ChevronRight: React.FC = () => (
  <svg viewBox="0 0 12 12" width={12} height={12} fill="none">
    <path d="M4 2l4 4-4 4" stroke="#CCCCCC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ═══════════════════════════════════════════
 * 类型定义
 * ═══════════════════════════════════════════ */

interface StepItem {
  label: string
  completed?: boolean
}

/** 5 种受阻类型的预设配置 */
const FAILURE_PRESETS: Record<string, {
  tag: string
  tagColor: string
  title: string
  comfort: string
  steps: StepItem[]
  primaryText: string
}> = {
  nfc_off: {
    tag: 'NFC未开启',
    tagColor: '#FF8F1F',
    title: '打开NFC，轻触支付就成功',
    comfort: '90%的用户开启后就能顺利碰',
    steps: [{ label: '设置NFC' }, { label: '解锁手机' }, { label: '轻触支付成功' }],
    primaryText: '去设置',
  },
  locked: {
    tag: '需要解锁',
    tagColor: '#FF8F1F',
    title: '解锁手机再碰，更安全更快',
    comfort: '解锁是为了保护你的资金安全',
    steps: [{ label: '解锁手机' }, { label: '靠近蓝环' }, { label: '支付完成' }],
    primaryText: '查看方法',
  },
  distance: {
    tag: '碰的位置不对',
    tagColor: '#FF8F1F',
    title: '靠近一点，轻触支付就成功',
    comfort: '手机顶部NFC区域贴近蓝环即可',
    steps: [{ label: '找到NFC区域' }, { label: '贴近蓝环' }, { label: '支付完成' }],
    primaryText: '查看示意图',
  },
  unsupported: {
    tag: '商户暂不支持',
    tagColor: '#999999',
    title: '换个商户试试轻触支付',
    comfort: '附近有多家支持轻触支付的商户',
    steps: [],
    primaryText: '查看附近商户',
  },
  network: {
    tag: '网络波动',
    tagColor: '#FF8F1F',
    title: '信号恢复后再轻触支付',
    comfort: '已帮你保存支付信息',
    steps: [{ label: '检查网络' }, { label: '重新轻触支付' }, { label: '支付完成' }],
    primaryText: '重试',
  },
}

interface BlockedEducationProps {
  failureType?: keyof typeof FAILURE_PRESETS  // [B] 默认 'nfc_off'
  alertText?: string                          // [A] 提示条文案
  onDismissAlert?: () => void                 // [A] 关闭提示条
  onPrimaryCTA?: () => void                   // [E]
  secondaryText?: string                      // [F] 默认「换个方式试试」
  onSecondaryCTA?: () => void                 // [F]
  incentive?: {                               // [G]
    amount: number
    description: string
    onPress?: () => void
  }
}

/* ═══════════════════════════════════════════
 * 主组件
 * ═══════════════════════════════════════════ */

const BlockedEducation: React.FC<BlockedEducationProps> = ({
  failureType = 'nfc_off',
  alertText = '上次轻触支付没成功？别担心，帮你解决',
  onDismissAlert,
  onPrimaryCTA,
  secondaryText = '换个方式试试',
  onSecondaryCTA,
  incentive = {
    amount: 2,
    description: '轻触支付专属红包 · 成功轻触支付自动抵扣',
  },
}) => {
  const preset = FAILURE_PRESETS[failureType] || FAILURE_PRESETS.nfc_off

  return (
    <div className="be-module">

      {/* 头部渐变背景 */}
      <div className="be-gradient" />

      {/* ══════════════════════════════════════
       * [A] 受阻提示条
       * 蓝色浅底圆角条，温和告知
       * ══════════════════════════════════════ */}
      <div className="be-alert">
        <InfoIcon />
        <span className="be-alert-text">{alertText}</span>
        {onDismissAlert && (
          <span className="be-alert-close" onClick={onDismissAlert}>×</span>
        )}
      </div>

      {/* ══════════════════════════════════════
       * [B][C][D][E][F] 失败原因卡片
       * 白卡，圆角20px，包含标签+标题+安抚+步骤+双CTA
       * ══════════════════════════════════════ */}
      <div className="be-reason-card">

        {/* [B] 失败类型标签 */}
        <span
          className="be-failure-tag"
          style={{ backgroundColor: preset.tagColor }}
        >
          {preset.tag}
        </span>

        {/* [C] 主标题 */}
        <div className="be-main-title">{preset.title}</div>

        {/* [C] 安抚文案 */}
        <div className="be-comfort-text">{preset.comfort}</div>

        {/* [D] 水平步骤流（商户不支持时无步骤） */}
        {preset.steps.length > 0 && (
          <div className="be-step-flow">
            {preset.steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="be-step">
                  <div className="be-step-circle">{i + 1}</div>
                  <div className="be-step-label">{step.label}</div>
                </div>
                {i < preset.steps.length - 1 && (
                  <div className="be-step-arrow">
                    <ArrowIcon />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* [E][F] 双CTA按钮 */}
        <div className="be-cta-row">
          <Button
            className="be-primary-btn"
            shape="rounded"
            onClick={onPrimaryCTA}
          >
            {preset.primaryText}
          </Button>
          <Button
            className="be-secondary-btn"
            shape="rounded"
            fill="none"
            onClick={onSecondaryCTA}
          >
            {secondaryText}
          </Button>
        </div>
      </div>

      {/* ══════════════════════════════════════
       * [G] 激励条
       * 暖色渐变，红包金额+描述
       * ══════════════════════════════════════ */}
      {incentive && (
        <div className="be-incentive" onClick={incentive.onPress}>
          <RedPacketIcon />
          <span className="be-incentive-amount">¥{incentive.amount}</span>
          <span className="be-incentive-desc">{incentive.description}</span>
          <ChevronRight />
        </div>
      )}

      <style>{`
        .be-module {
          position: relative;
          padding: 0 16px;
        }

        /* 头部渐变 */
        .be-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 280px;
          background: linear-gradient(180deg, #E8F2FF 0%, #D6E8FF 50%, #F5F5F5 100%);
          z-index: 0;
        }

        /* [A] 受阻提示条 */
        .be-alert {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          padding: 0 12px;
          background: rgba(22, 119, 255, 0.08);
          border-radius: 16px;
          margin-bottom: 12px;
        }
        .be-alert-text {
          flex: 1;
          font-size: 13px;
          color: #1677FF;
          font-weight: 400;
        }
        .be-alert-close {
          font-size: 16px;
          color: #1677FF;
          cursor: pointer;
          padding: 0 4px;
        }

        /* 失败原因卡片 */
        .be-reason-card {
          position: relative;
          z-index: 1;
          background: #FFFFFF;
          border-radius: 20px;
          box-shadow: 0 4px 16px rgba(90, 110, 149, 0.08);
          padding: 20px;
          margin-bottom: 12px;
        }

        /* [B] 失败类型标签 */
        .be-failure-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          color: #FFFFFF;
          padding: 2px 8px;
          border-radius: 4px;
        }

        /* [C] 主标题 */
        .be-main-title {
          font-size: 18px;
          font-weight: 600;
          color: #1A1A1A;
          margin-top: 8px;
        }

        /* [C] 安抚文案 */
        .be-comfort-text {
          font-size: 13px;
          font-weight: 400;
          color: #666666;
          margin-top: 4px;
        }

        /* [D] 步骤流 */
        .be-step-flow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
        }
        .be-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
        }
        .be-step-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1677FF;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .be-step-label {
          font-size: 12px;
          font-weight: 400;
          color: #333333;
          text-align: center;
        }
        .be-step-arrow {
          display: flex;
          align-items: center;
          margin-top: -16px;
          padding: 0 4px;
        }

        /* [E][F] 双CTA */
        .be-cta-row {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .be-primary-btn {
          flex: 1;
          height: 40px;
          background: linear-gradient(90deg, #1677FF 0%, #4DA3FF 100%);
          border: none;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(22, 119, 255, 0.2);
        }
        .be-secondary-btn {
          flex: 1;
          height: 40px;
          background: #F0F5FF;
          border: none;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #1677FF;
        }

        /* [G] 激励条 */
        .be-incentive {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          height: 44px;
          padding: 0 16px;
          background: linear-gradient(90deg, #FFF5ED 0%, #FFE8D6 100%);
          border-radius: 12px;
          gap: 6px;
          cursor: pointer;
        }
        .be-incentive-amount {
          font-size: 18px;
          font-weight: 700;
          color: #FF3141;
          font-variant-numeric: tabular-nums;
          font-family: DINPro-Bold, DINAlternate, tabular-nums, sans-serif;
        }
        .be-incentive-desc {
          flex: 1;
          font-size: 13px;
          font-weight: 400;
          color: #333333;
          margin-left: 4px;
        }
      `}</style>
    </div>
  )
}

export default BlockedEducation
