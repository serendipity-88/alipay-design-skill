/**
 * ============================================================
 * 轻触支付页 / 确认付款页 · 完整参考模板
 * ============================================================
 *
 * 直接复制此文件，替换 [A]-[E] 标记的内容区域。
 *
 * ── 模板说明 ──
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * 画布: 375×812 @1x (iPhone X)
 *
 * ── 页面叙事结构 ──
 * 第一幕 · 教育建立（0-60%）：浅蓝渐变 + 大标题 + 手机NFC插图
 * 第二幕 · 信任收尾（60-100%）：白色圆弧区域 + Logo/CTA
 *
 * ── 设计模式 ──
 * 沉浸教育型 (Immersive Education)
 *   渐变: #E8F2FF → #D6E8FF → #EDF4FF，覆盖 ~65% 屏高
 *   白色底部圆弧: border-radius 24px 24px 0 0
 *   插图占 42% 屏高 — 视觉核心
 *   全页仅 1 个决策点（确认页）或 0 个（支付页等待态）
 *
 * ── 关键产品设计决策（必须保留） ──
 * 1. 极浅蓝渐变：安静氛围，不制造支付紧迫感
 * 2. 手机倾斜15度：打破静态构图，暗示「碰」的动作方向
 * 3. NFC波纹带微紫：增加科技感，纯蓝太单调
 * 4. 全页极简：教育型页面视觉传达优先于信息密度
 * 5. CTA按钮呼吸动效：轻微阴影脉动引导点击
 *
 * ── 替换指南 ──
 * [A] 主标题文案 — 默认「轻触即付」，可改为「转账就轻触支付」等
 * [B] 中心插图 — 默认手机+NFC波纹CSS绘制，可替换为图片/动画
 * [C] 底部信任区 — 支付页: Logo+安全文案 / 确认页: 副标题+积分+CTA
 * [D] CTA 按钮文案 — 默认「确认即付款」
 * [E] 导航右侧文案 — 默认「使用说明」
 */

import React from 'react'
import { NavBar, Button } from 'antd-mobile'

/* ═══════════════════════════════════════════
 * Inline SVG 图标
 * ═══════════════════════════════════════════ */

const BackArrow: React.FC = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
    <path d="M15 19l-7-7 7-7" />
  </svg>
)

const MedalIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none">
    <circle cx="12" cy="9" r="5" stroke="#FAAD14" strokeWidth="1.5" />
    <path d="M9 13l-2 8 5-3 5 3-2-8" stroke="#FAAD14" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="9" r="2" fill="#FAAD14" />
  </svg>
)

/* ═══════════════════════════════════════════
 * 类型定义
 * ═══════════════════════════════════════════ */

interface PaymentPageProps {
  mode: 'waiting' | 'confirm'
  title?: string                   // [A] 默认 "轻触即付"
  subtitle?: string                // 确认页: "轻触支付，支付更便捷"
  bonusText?: string               // "本笔支付得多倍积分"
  ctaText?: string                 // [D] "确认即付款"
  onConfirm?: () => void
  navRightText?: string            // [E] "使用说明"
  onNavRight?: () => void
  onBack?: () => void
}

/* ═══════════════════════════════════════════
 * 主组件
 * ═══════════════════════════════════════════ */

const TapToPayPayment: React.FC<PaymentPageProps> = ({
  mode = 'waiting',
  title = '轻触即付',
  subtitle = '轻触支付，支付更便捷',
  bonusText = '本笔支付得多倍积分',
  ctaText = '确认即付款',
  onConfirm,
  navRightText = '使用说明',
  onNavRight,
  onBack,
}) => {
  return (
    <div className="ttp-page">

      {/* ──────────────────────────────────────
       * 上部渐变背景 (~65% 屏高)
       * 渐变: #E8F2FF → #D6E8FF → #EDF4FF
       * ────────────────────────────────────── */}
      <div className="ttp-gradient" />

      {/* ──────────────────────────────────────
       * 导航栏
       * transparent，左侧返回 + 右侧文字链
       * [E] 右侧文案可替换
       * ────────────────────────────────────── */}
      <NavBar
        backIcon={<BackArrow />}
        onBack={onBack}
        right={
          <span className="ttp-nav-right" onClick={onNavRight}>
            {navRightText}
          </span>
        }
        className="ttp-navbar"
      >
        {''}
      </NavBar>

      {/* ══════════════════════════════════════
       * [A] 主标题
       * 28px Bold，居中，接近纯黑
       * 字间距 2px，中文标题适当加宽
       * ══════════════════════════════════════ */}
      <div className="ttp-hero-title">{title}</div>

      {/* ══════════════════════════════════════
       * [B] 中心插图区 — 手机 + NFC 波纹
       * 占屏高 ~42%，是整页视觉核心
       * 手机倾斜15度，NFC波纹从顶部扩散
       * 可替换为 <img> 或 GE 动画
       * ══════════════════════════════════════ */}
      <div className="ttp-illustration">
        {/* 手机设备 (CSS绘制) */}
        <div className="ttp-phone">
          <div className="ttp-phone-notch" />
          <div className="ttp-phone-screen" />

          {/* NFC 波纹 (3圈同心弧) */}
          <div className="ttp-ripple ttp-ripple-1" />
          <div className="ttp-ripple ttp-ripple-2" />
          <div className="ttp-ripple ttp-ripple-3" />
        </div>
      </div>

      {/* ══════════════════════════════════════
       * [C] 底部白色区域 — 圆弧过渡
       * 支付页：Logo + 「安全支付中」
       * 确认页：副标题 + 积分提示 + CTA 按钮
       * ══════════════════════════════════════ */}
      <div className="ttp-bottom-section">
        {mode === 'waiting' ? (
          /* ── 支付页：信任区 ── */
          <div className="ttp-trust-area">
            {/* 品牌标识 — 蓝色渐变「支」字 */}
            <div className="ttp-alipay-logo">支</div>
            <div className="ttp-security-text">安全支付中</div>
          </div>
        ) : (
          /* ── 确认页：CTA 区 ── */
          <div className="ttp-cta-area">
            <div className="ttp-subtitle">{subtitle}</div>

            {/* 积分提示行 */}
            <div className="ttp-bonus-row">
              <MedalIcon />
              <span className="ttp-bonus-text">{bonusText}</span>
            </div>

            {/* [D] CTA 按钮 — 蓝色渐变胶囊 */}
            <Button
              className="ttp-cta-button"
              block
              shape="rounded"
              onClick={onConfirm}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>

      <style>{`
        /* ═══ 页面容器 ═══ */
        .ttp-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: #fff;
        }

        /* ═══ 上部渐变 ═══ */
        .ttp-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 65vh;
          background: linear-gradient(180deg, #E8F2FF 0%, #D6E8FF 40%, #EDF4FF 100%);
          z-index: 0;
        }

        /* ═══ 导航栏 ═══ */
        .ttp-navbar {
          --height: 44px;
          --border-bottom: none;
          background: transparent;
          position: relative;
          z-index: 2;
        }
        .ttp-nav-right {
          font-size: 15px;
          color: #333;
          font-weight: 400;
        }

        /* ═══ [A] 主标题 ═══ */
        .ttp-hero-title {
          font-size: 28px;
          font-weight: 700;
          color: #1A1A1A;
          text-align: center;
          line-height: 1.3;
          letter-spacing: 2px;
          padding-top: 32px;
          position: relative;
          z-index: 1;
        }

        /* ═══ [B] 插图区 ═══ */
        .ttp-illustration {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 340px;
          position: relative;
          z-index: 1;
        }

        /* 手机 CSS 绘制 */
        .ttp-phone {
          width: 200px;
          height: 260px;
          background: #f8f8f8;
          border-radius: 32px;
          border: 2px solid #e8e8e8;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
          transform: rotate(15deg);
          position: relative;
        }
        .ttp-phone-notch {
          width: 60px;
          height: 6px;
          background: #ddd;
          border-radius: 3px;
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
        }
        .ttp-phone-screen {
          position: absolute;
          top: 24px;
          left: 8px;
          right: 8px;
          bottom: 16px;
          background: linear-gradient(180deg, #EBF5FF, #D6E8FF);
          border-radius: 24px;
        }

        /* NFC 波纹 — 同心弧 */
        .ttp-ripple {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid transparent;
          clip-path: polygon(50% 0, 100% 0, 100% 50%);
        }
        .ttp-ripple-1 {
          width: 120px;
          height: 120px;
          top: -30px;
          right: -30px;
          border-color: rgba(22, 119, 255, 0.15);
          animation: ripple-expand 1.5s ease-out infinite;
        }
        .ttp-ripple-2 {
          width: 160px;
          height: 160px;
          top: -50px;
          right: -50px;
          border-color: rgba(22, 119, 255, 0.08);
          animation: ripple-expand 1.5s ease-out 0.3s infinite;
        }
        .ttp-ripple-3 {
          width: 200px;
          height: 200px;
          top: -70px;
          right: -70px;
          border-color: rgba(120, 100, 200, 0.06);
          animation: ripple-expand 1.5s ease-out 0.6s infinite;
        }

        @keyframes ripple-expand {
          0% { transform: scale(0.8); opacity: 0.3; }
          100% { transform: scale(1.2); opacity: 0; }
        }

        /* ═══ [C] 底部白色区域 ═══ */
        .ttp-bottom-section {
          position: relative;
          z-index: 1;
          background: #fff;
          border-radius: 24px 24px 0 0;
          margin-top: -24px;
          padding: 48px 24px;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── 支付页信任区 ── */
        .ttp-trust-area {
          text-align: center;
        }
        .ttp-alipay-logo {
          width: 48px;
          height: 48px;
          margin: 0 auto 8px;
          background: linear-gradient(135deg, #1677FF, #4DA3FF);
          border-radius: 12px;
          color: #fff;
          font-size: 28px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'PingFang SC', sans-serif;
        }
        .ttp-security-text {
          font-size: 14px;
          color: #999;
          font-weight: 400;
        }

        /* ── 确认页CTA区 ── */
        .ttp-cta-area {
          width: 100%;
          text-align: center;
        }
        .ttp-subtitle {
          font-size: 20px;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 12px;
        }
        .ttp-bonus-row {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 32px;
        }
        .ttp-bonus-text {
          font-size: 14px;
          color: #666;
        }

        /* [D] CTA 按钮 — 蓝色渐变胶囊 */
        .ttp-cta-button {
          --background-color: linear-gradient(90deg, #1677FF 0%, #4DA3FF 100%) !important;
          background: linear-gradient(90deg, #1677FF 0%, #4DA3FF 100%);
          border: none;
          height: 48px;
          border-radius: 24px;
          font-size: 17px;
          font-weight: 600;
          color: #fff;
          box-shadow: 0 4px 16px rgba(22, 119, 255, 0.3);
          transition: opacity 150ms, transform 150ms;
        }
        .ttp-cta-button:active {
          opacity: 0.85;
          transform: scale(0.98);
        }
      `}</style>
    </div>
  )
}

export default TapToPayPayment
