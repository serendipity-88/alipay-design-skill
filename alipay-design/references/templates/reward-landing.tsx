/**
 * ============================================================
 * 红包承接页 · 完整参考模板
 * ============================================================
 *
 * 直接复制此文件，替换 [A]-[E] 标记的内容区域。
 *
 * ── 模板说明 ──
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * 画布: 375×812 @1x (iPhone X)
 *
 * ── 页面叙事结构 ──
 * 第一幕 · 信任建立（0-25%）：「多人已在使用」数据背书 + 安全卖点
 * 第二幕 · 利益呈现（25-55%）：优惠券卡片轮播，金额超大数字
 * 第三幕 · 教育引导（55-90%）：左图右文教学 + CTA
 * 第四幕 · 信任收尾（90-100%）：保障品牌背书
 *
 * ── 设计模式 ──
 * 营销承接型 (Marketing Landing)
 *   渐变: #E0EDFF → #EEF4FF → #F5F5F5
 *   卡片: 圆角24px, 阴影 rgba(90,110,149,0.08)
 *   文案三层递进: 数据 → 安全 → 便捷
 *
 * ── 替换指南 ──
 * [A] 数据背书 — 数字和单位可替换
 * [B] 安全卖点文案 — 两行，关键词蓝色高亮
 * [C] 优惠券卡片 — 券数量 + 金额 + 过期提示
 * [D] 教学区 — 左图右文 + CTA，图片/文案/按钮均可替换
 * [E] 底部信任条 — 保障品牌 + 安全文案
 */

import React, { useState } from 'react'
import { NavBar, Swiper, Button } from 'antd-mobile'

/* ═══════════════════════════════════════════
 * Inline SVG 图标
 * ═══════════════════════════════════════════ */

const BackArrow: React.FC = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
    <path d="M15 19l-7-7 7-7" />
  </svg>
)

const ShieldIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none">
    <path d="M12 3l7 4v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V7l7-4z" fill="#1677FF" />
    <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ═══════════════════════════════════════════
 * 类型定义
 * ═══════════════════════════════════════════ */

interface Coupon {
  id: string
  count: number
  amount: number
  unit: string
  expiryText: string
}

interface RewardLandingProps {
  endorsementNumber?: string       // [A] "3亿"
  safetyPoints?: string[]          // [B]
  coupons?: Coupon[]               // [C]
  teaching?: {
    image?: string
    steps?: string[]
    ctaText?: string               // [D]
  }
  trustBrand?: string              // [E] "保障服务"
  trustText?: string               // [E]
  onCTAClick?: () => void
  onBack?: () => void
}

/* ═══════════════════════════════════════════
 * 主组件
 * ═══════════════════════════════════════════ */

const RewardLanding: React.FC<RewardLandingProps> = ({
  endorsementNumber = '3亿',
  safetyPoints = [
    '解锁手机才能用 安全有保障',
    '无需打开 App 轻触支付就支付',
  ],
  coupons = [
    { id: '1', count: 2, amount: 1.5, unit: '元', expiryText: '最早7天后过期' },
    { id: '2', count: 1, amount: 3, unit: '元', expiryText: '最早3天后过期' },
  ],
  teaching = {
    steps: ['解锁手机', '靠近设备', '使用该优惠'],
    ctaText: '去看看怎么用',
  },
  trustBrand = '保障服务',
  trustText = '轻触支付已加入账户安全保障',
  onCTAClick,
  onBack,
}) => {
  const [swiperIndex, setSwiperIndex] = useState(0)

  return (
    <div className="rl-page">

      {/* 头部渐变 */}
      <div className="rl-gradient" />

      {/* 导航栏 — 极简，仅返回按钮 */}
      <NavBar
        backIcon={<BackArrow />}
        onBack={onBack}
        className="rl-navbar"
      >
        {''}
      </NavBar>

      {/* ══════════════════════════════════════
       * [A] 数据背书区
       * 「轻触支付 多人已在使用」
       * 核心数据用 36px 品牌蓝，周围文字 16px
       * ══════════════════════════════════════ */}
      <section className="rl-endorsement">
        <div className="rl-endorsement-line">
          <span className="rl-endorsement-text">轻触支付 超 </span>
          <span className="rl-endorsement-number">{endorsementNumber}</span>
          <span className="rl-endorsement-text"> 人都在用</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
       * [B] 安全卖点文案
       * 第一行：关键词蓝色高亮
       * 第二行：常规深灰
       * ══════════════════════════════════════ */}
      <section className="rl-safety">
        <div className="rl-safety-line1">
          <span className="rl-safety-dark">解锁手机才能用 </span>
          <span className="rl-safety-highlight">安全有保障</span>
        </div>
        <div className="rl-safety-line2">{safetyPoints[1]}</div>
      </section>

      {/* ══════════════════════════════════════
       * [C] 优惠券卡片轮播
       * 白卡，圆角24px，金额48px超大
       * ══════════════════════════════════════ */}
      <section className="rl-coupon-section">
        <Swiper
          onIndexChange={setSwiperIndex}
          indicator={() => null}
          style={{ '--border-radius': '24px' } as React.CSSProperties}
        >
          {coupons.map((coupon) => (
            <Swiper.Item key={coupon.id}>
              <div className="rl-coupon-card">
                <div className="rl-coupon-title">
                  {coupon.count}张轻触支付券
                </div>
                <div className="rl-coupon-amount">
                  <span className="rl-coupon-prefix">共 </span>
                  <span className="rl-coupon-number">{coupon.amount}</span>
                  <span className="rl-coupon-prefix"> {coupon.unit}</span>
                </div>
                <div className="rl-coupon-expiry">{coupon.expiryText}</div>
              </div>
            </Swiper.Item>
          ))}
        </Swiper>

        {/* 分页指示器 */}
        <div className="rl-indicator">
          {coupons.map((_, i) => (
            <div
              key={i}
              className={`rl-dot ${i === swiperIndex ? 'rl-dot-active' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
       * [D] 教学卡片 — 左图右文 + CTA
       * 白卡，圆角24px
       * ══════════════════════════════════════ */}
      <section className="rl-teaching-card">
        <div className="rl-teaching-content">
          {/* 左侧插图占位 */}
          <div className="rl-teaching-illustration">
            <svg viewBox="0 0 80 100" width={80} height={100} fill="none">
              <rect x="10" y="5" width="60" height="90" rx="12" stroke="#1677FF" strokeWidth="1.5" />
              <rect x="16" y="12" width="48" height="70" rx="8" fill="#EBF5FF" />
              <circle cx="40" cy="90" r="3" fill="#1677FF" />
              <path d="M25 40l10 10 20-20" stroke="#1677FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* 右侧文案 */}
          <div className="rl-teaching-text">
            {teaching.steps?.map((step, i) => (
              <div key={i} className="rl-teaching-step">{step}</div>
            ))}
          </div>
        </div>

        {/* CTA 按钮 */}
        <Button
          className="rl-cta-button"
          block
          shape="rounded"
          onClick={onCTAClick}
        >
          {teaching.ctaText}
        </Button>
      </section>

      {/* ══════════════════════════════════════
       * [E] 底部信任条
       * 保障品牌 + 安全文案
       * ══════════════════════════════════════ */}
      <footer className="rl-trust-bar">
        <ShieldIcon />
        <span className="rl-trust-brand">{trustBrand}</span>
        <span className="rl-trust-divider">|</span>
        <span className="rl-trust-text">{trustText}</span>
      </footer>

      <style>{`
        .rl-page {
          min-height: 100vh;
          position: relative;
          background: #F5F5F5;
        }
        .rl-gradient {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 40vh;
          background: linear-gradient(180deg, #E0EDFF 0%, #EEF4FF 60%, #F5F5F5 100%);
          z-index: 0;
        }
        .rl-navbar {
          --height: 44px;
          --border-bottom: none;
          background: transparent;
          position: relative;
          z-index: 2;
        }

        /* [A] 数据背书 */
        .rl-endorsement {
          text-align: center;
          padding: 24px 16px 0;
          position: relative;
          z-index: 1;
        }
        .rl-endorsement-line {
          display: inline-flex;
          align-items: baseline;
        }
        .rl-endorsement-text {
          font-size: 16px;
          color: #333;
          font-weight: 400;
        }
        .rl-endorsement-number {
          font-size: 36px;
          font-weight: 700;
          color: #1677FF;
          font-variant-numeric: tabular-nums;
          font-family: DINPro-Bold, DINAlternate, tabular-nums, sans-serif;
        }

        /* [B] 安全卖点 */
        .rl-safety {
          text-align: center;
          padding: 12px 16px 24px;
          position: relative;
          z-index: 1;
        }
        .rl-safety-line1 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .rl-safety-dark { color: #1A1A1A; }
        .rl-safety-highlight { color: #1677FF; }
        .rl-safety-line2 {
          font-size: 18px;
          font-weight: 500;
          color: #333;
          line-height: 1.5;
        }

        /* [C] 券卡片 */
        .rl-coupon-section {
          padding: 0 16px;
          position: relative;
          z-index: 1;
        }
        .rl-coupon-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(90, 110, 149, 0.08);
          padding: 24px 32px;
          text-align: center;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .rl-coupon-title {
          font-size: 15px;
          color: #333;
          font-weight: 400;
        }
        .rl-coupon-amount {
          margin: 8px 0;
          display: inline-flex;
          align-items: baseline;
        }
        .rl-coupon-prefix {
          font-size: 16px;
          color: #333;
          font-weight: 400;
        }
        .rl-coupon-number {
          font-size: 48px;
          font-weight: 700;
          color: #333;
          font-variant-numeric: tabular-nums;
          font-family: DINPro-Bold, DINAlternate, tabular-nums, sans-serif;
        }
        .rl-coupon-expiry {
          font-size: 13px;
          color: #999;
        }
        .rl-indicator {
          display: flex;
          justify-content: center;
          gap: 6px;
          padding: 12px 0;
        }
        .rl-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #D9D9D9;
        }
        .rl-dot-active {
          width: 6px;
          height: 6px;
          background: #1677FF;
        }

        /* [D] 教学卡片 */
        .rl-teaching-card {
          margin: 4px 16px 0;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(90, 110, 149, 0.08);
          padding: 24px;
          position: relative;
          z-index: 1;
        }
        .rl-teaching-content {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .rl-teaching-illustration {
          width: 140px;
          height: 180px;
          background: linear-gradient(135deg, #E8F2FF 0%, #F0F5FF 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .rl-teaching-text {
          flex: 1;
        }
        .rl-teaching-step {
          font-size: 17px;
          font-weight: 600;
          color: #1A1A1A;
          line-height: 1.5;
        }
        .rl-cta-button {
          background: linear-gradient(90deg, #1677FF 0%, #4DA3FF 100%);
          border: none;
          height: 44px;
          border-radius: 22px;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          box-shadow: 0 4px 12px rgba(22, 119, 255, 0.25);
        }

        /* [E] 信任条 */
        .rl-trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 24px 16px;
          padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
          position: relative;
          z-index: 1;
        }
        .rl-trust-brand {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
        .rl-trust-divider {
          font-size: 14px;
          color: #D9D9D9;
        }
        .rl-trust-text {
          font-size: 13px;
          color: #999;
        }
      `}</style>
    </div>
  )
}

export default RewardLanding
