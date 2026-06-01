/**
 * ============================================================
 * 轻触支付阵地页（Tab首页） · 完整参考模板
 * ============================================================
 *
 * 直接复制此文件，替换 [A]-[G] 标记的内容区域。
 *
 * ── 模板说明 ──
 * 服务频道首页模板说明
 * 画布: 375×812 @1x (iPhone X)
 *
 * ── 页面叙事结构 ──
 * 第一幕 · 品牌+情感（0-33%）：浅蓝渐变 + 标题 + 好碰友关系 + FAQ
 * 第二幕 · 利益激励（33-47%）：红包卡片
 * 第三幕 · 场景引导（47-82%）：附近门店地图 + 品牌Logo
 * 第四幕 · 活动推荐（82-93%）：活动卡片横滑
 * 第五幕 · 导航固定（93-100%）：底部Tab栏
 *
 * ── 设计模式 ──
 * 信息密集型 (Information Hub)
 *   渐变: #D6E8FF → #E8F2FF → #F5F5F5
 *   卡片: 圆角20px, 阴影 rgba(90,110,149,0.08)
 *   卡片流瀑布式：用户滑动浏览
 *   所有区域标题带蓝色星标 ✦
 *
 * ── 关键产品设计决策（必须保留） ──
 * 1. 浅蓝渐变统一轻触支付色调
 * 2. 「好碰友」关系拟人化+天数增长：建立粘性
 * 3. FAQ嵌入首屏：主动降低教育成本
 * 4. 红包用粉红CTA：暖色在蓝色基调中跳出
 * 5. 地图实景展示：具体化「附近优惠」
 * 6. 卡片流而非Tab切换：滑动浏览成本低
 *
 * ── 替换指南 ──
 * [A] 主标题 — 「轻触即付」可替换
 * [B] 设备副标题 — 动态识别用户设备型号
 * [C] 好碰友关系 — 天数动态，可替换为新用户欢迎
 * [D] FAQ问题 — 「猜你想问」内容可配置
 * [E] 红包区 — 金额/过期时间/CTA动态
 * [F] 附近门店 — 门店数/品牌Logo/地图动态
 * [G] 活动推荐 — 活动卡片内容可配置
 */

import React from 'react'
import { NavBar, TabBar, Button } from 'antd-mobile'

/* ═══════════════════════════════════════════
 * Inline SVG 图标
 * ═══════════════════════════════════════════ */

const BackArrow: React.FC = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
    <path d="M15 19l-7-7 7-7" />
  </svg>
)

const StarIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} fill="none">
    <path d="M8 2l1.5 3.5L13 6l-2.5 2.5L11 12l-3-1.5L5 12l.5-3.5L3 6l3.5-.5z" fill="#1677FF" />
  </svg>
)

const RedPacketIcon: React.FC = () => (
  <svg viewBox="0 0 44 44" width={44} height={44} fill="none">
    <rect x="6" y="4" width="32" height="36" rx="4" fill="#FF3141" />
    <rect x="6" y="4" width="32" height="18" rx="4" fill="#FF5A5F" />
    <circle cx="22" cy="22" r="6" fill="#FFD700" stroke="#FF3141" strokeWidth="1" />
    <rect x="20" y="16" width="4" height="4" rx="2" fill="#FFD700" />
  </svg>
)

const QuestionMark: React.FC = () => (
  <svg viewBox="0 0 44 44" width={44} height={44} fill="none">
    <rect width="44" height="44" rx="12" fill="#1677FF" />
    <text x="22" y="30" textAnchor="middle" fontSize="24" fill="#fff" fontWeight="700">?</text>
  </svg>
)

/* ═══════════════════════════════════════════
 * 类型定义
 * ═══════════════════════════════════════════ */

interface RedPacket {
  amount: number
  description: string
  expiryText: string
}

interface Activity {
  id: string
  title: string
  bgColor: string
}

interface TapToPayHubProps {
  title?: string                   // [A]
  deviceName?: string              // [B]
  relationDays?: number            // [C]
  isNewUser?: boolean
  faqQuestion?: string             // [D]
  redPacket?: RedPacket            // [E]
  nearbyCount?: number             // [F]
  activities?: Activity[]          // [G]
  onBack?: () => void
  onUseRedPacket?: () => void
  onViewStores?: () => void
  onFAQClick?: () => void
  onActivityClick?: (id: string) => void
  onRelationshipClick?: () => void
}

/* ═══════════════════════════════════════════
 * 主组件
 * ═══════════════════════════════════════════ */

const TapToPayHub: React.FC<TapToPayHubProps> = ({
  title = '轻触即付',
  deviceName = 'iPhone 14 Pro',
  relationDays = 561,
  isNewUser = false,
  faqQuestion = '不打开 App可以直接靠近设备？',
  redPacket = {
    amount: 2,
    description: '碰支付红包待使用',
    expiryText: '最早2天后过期',
  },
  nearbyCount = 21,
  activities = [
    { id: '1', title: '玩游戏赚好礼', bgColor: '#F0E8FF' },
    { id: '2', title: '喊好友领红包', bgColor: '#E8F2FF' },
  ],
  onBack,
  onUseRedPacket,
  onViewStores,
  onFAQClick,
  onActivityClick,
  onRelationshipClick,
}) => {
  return (
    <div className="hub-page">

      {/* 头部渐变 */}
      <div className="hub-gradient" />

      {/* 导航栏 */}
      <NavBar backIcon={<BackArrow />} onBack={onBack} className="hub-navbar">{''}</NavBar>

      {/* ══════════════════════════════════════
       * [A][B] 头部标题区
       * ══════════════════════════════════════ */}
      <div className="hub-hero">
        <div className="hub-hero-title">{title}</div>
        <div className="hub-hero-subtitle">你的{deviceName} 支持轻触支付</div>
      </div>

      {/* ══════════════════════════════════════
       * [C][D] 关系卡片 + FAQ
       * 白卡，圆角20px
       * ══════════════════════════════════════ */}
      <div className="hub-relation-card">
        <div className="hub-greeting" onClick={onRelationshipClick}>
          <span className="hub-hi">Hi</span>
          <span className="hub-friend"> 好碰友</span>
          <span className="hub-days-text">  我们已经相互陪伴了</span>
          <span className="hub-days-number">{relationDays}</span>
          <span className="hub-days-text">天 &gt;</span>
        </div>

        {/* FAQ 子区域 */}
        <div className="hub-faq" onClick={onFAQClick}>
          <QuestionMark />
          <div className="hub-faq-content">
            <div className="hub-faq-title">猜你想问</div>
            <div className="hub-faq-question">{faqQuestion}</div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
       * [E] 红包卡片
       * ══════════════════════════════════════ */}
      {redPacket && (
        <div className="hub-redpacket-card">
          <div className="hub-section-label">
            <StarIcon />
            <span>你有红包待使用</span>
          </div>
          <div className="hub-redpacket-body">
            <RedPacketIcon />
            <div className="hub-redpacket-info">
              <div className="hub-redpacket-amount">
                <span className="hub-rp-number">{redPacket.amount}元</span>
                <span className="hub-rp-desc">{redPacket.description}</span>
              </div>
              <div className="hub-redpacket-expiry">{redPacket.expiryText}</div>
            </div>
            <Button
              className="hub-use-btn"
              size="mini"
              shape="rounded"
              onClick={onUseRedPacket}
            >
              去使用
            </Button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
       * [F] 附近门店卡片
       * ══════════════════════════════════════ */}
      <div className="hub-store-card">
        <div className="hub-section-label">
          <StarIcon />
          <span>附近{nearbyCount}家门店有轻触支付享优惠</span>
        </div>

        {/* 地图区域占位 */}
        <div className="hub-map-area">
          <svg viewBox="0 0 311 180" width="100%" height={180}>
            <rect width="311" height="180" rx="16" fill="#F0F4F0" />
            <circle cx="155" cy="90" r="24" fill="#1677FF" opacity="0.15" />
            <circle cx="155" cy="90" r="8" fill="#1677FF" />
            <text x="155" y="130" textAnchor="middle" fontSize="12" fill="#999">地图区域</text>
          </svg>
          {/* 浮层卡片 */}
          <div className="hub-map-overlay">
            <span className="hub-map-overlay-text">轻触支付 新用户立减2元</span>
          </div>
        </div>

        <div className="hub-store-link" onClick={onViewStores}>
          查看门店优惠 &gt;
        </div>
      </div>

      {/* ══════════════════════════════════════
       * [G] 活动推荐区
       * ══════════════════════════════════════ */}
      <div className="hub-activity-card">
        <div className="hub-activity-header">
          <div className="hub-section-label">
            <StarIcon />
            <span>为你推荐最新优惠活动</span>
          </div>
          <span className="hub-coupon-link">优惠券 &gt;</span>
        </div>
        <div className="hub-activity-scroll">
          {activities.map((act) => (
            <div
              key={act.id}
              className="hub-activity-item"
              style={{ background: act.bgColor }}
              onClick={() => onActivityClick?.(act.id)}
            >
              {act.title}
            </div>
          ))}
        </div>
      </div>

      {/* 底部Tab栏 */}
      <div className="hub-tab-bar">
        <TabBar activeKey="tap">
          <TabBar.Item key="tap" title="轻触支付" />
          <TabBar.Item key="card" title="集卡换好礼" />
          <TabBar.Item key="nearby" title="附近优惠" />
        </TabBar>
      </div>

      <style>{`
        .hub-page {
          min-height: 100vh;
          position: relative;
          background: #F5F5F5;
          padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px));
        }
        .hub-gradient {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 280px;
          background: linear-gradient(180deg, #D6E8FF 0%, #E8F2FF 40%, #F5F5F5 100%);
          z-index: 0;
        }
        .hub-navbar {
          --height: 44px;
          --border-bottom: none;
          background: transparent;
          position: relative;
          z-index: 2;
        }

        /* [A][B] 头部 */
        .hub-hero {
          text-align: center;
          padding: 8px 16px 20px;
          position: relative;
          z-index: 1;
        }
        .hub-hero-title {
          font-size: 26px;
          font-weight: 700;
          color: #1A1A1A;
        }
        .hub-hero-subtitle {
          font-size: 14px;
          color: #999999;
          margin-top: 4px;
        }

        /* [C][D] 关系卡片 */
        .hub-relation-card {
          margin: 0 16px;
          background: #FFFFFF;
          border-radius: 20px;
          box-shadow: 0 2px 12px rgba(90, 110, 149, 0.08);
          padding: 16px 20px;
          position: relative;
          z-index: 1;
        }
        .hub-greeting {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          cursor: pointer;
        }
        .hub-hi {
          font-size: 20px;
          font-weight: 700;
          color: #1677FF;
          font-style: italic;
        }
        .hub-friend {
          font-size: 18px;
          font-weight: 600;
          color: #1677FF;
        }
        .hub-days-text {
          font-size: 13px;
          color: #666666;
        }
        .hub-days-number {
          font-size: 24px;
          font-weight: 700;
          color: #1A1A1A;
          font-variant-numeric: tabular-nums;
          font-family: DINPro-Bold, DINAlternate, tabular-nums, sans-serif;
        }

        /* FAQ 子区域 */
        .hub-faq {
          display: flex;
          gap: 12px;
          background: #F5F8FF;
          border-radius: 16px;
          padding: 16px;
          margin-top: 12px;
          cursor: pointer;
        }
        .hub-faq-content { flex: 1; }
        .hub-faq-title {
          font-size: 15px;
          font-weight: 600;
          color: #1A1A1A;
        }
        .hub-faq-question {
          font-size: 13px;
          color: #999999;
          margin-top: 4px;
        }

        /* 区域标题通用 */
        .hub-section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 16px;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 16px;
        }

        /* [E] 红包卡片 */
        .hub-redpacket-card {
          margin: 12px 16px 0;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 20px;
          position: relative;
          z-index: 1;
        }
        .hub-redpacket-body {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hub-redpacket-info { flex: 1; }
        .hub-redpacket-amount {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .hub-rp-number {
          font-size: 17px;
          font-weight: 700;
          color: #FF3141;
        }
        .hub-rp-desc {
          font-size: 15px;
          color: #333333;
        }
        .hub-redpacket-expiry {
          font-size: 12px;
          color: #999999;
          margin-top: 4px;
        }
        .hub-use-btn {
          background: linear-gradient(90deg, #FF6B8A 0%, #FF8FA0 100%);
          border: none;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          height: 36px;
          width: 80px;
          border-radius: 18px;
        }

        /* [F] 附近门店 */
        .hub-store-card {
          margin: 12px 16px 0;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 20px;
          position: relative;
          z-index: 1;
        }
        .hub-map-area {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .hub-map-overlay {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: #FFFFFF;
          border-radius: 12px;
          padding: 8px 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .hub-map-overlay-text {
          font-size: 13px;
          color: #333333;
          white-space: nowrap;
        }
        .hub-store-link {
          text-align: center;
          font-size: 14px;
          color: #666666;
          cursor: pointer;
        }

        /* [G] 活动推荐 */
        .hub-activity-card {
          margin: 12px 16px 0;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 20px;
          position: relative;
          z-index: 1;
        }
        .hub-activity-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hub-coupon-link {
          font-size: 14px;
          color: #999999;
          cursor: pointer;
        }
        .hub-activity-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .hub-activity-scroll::-webkit-scrollbar { display: none; }
        .hub-activity-item {
          min-width: 48%;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: #1A1A1A;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* 底部Tab */
        .hub-tab-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #FFFFFF;
          padding-bottom: env(safe-area-inset-bottom, 0px);
          z-index: 10;
        }
      `}</style>
    </div>
  )
}

export default TapToPayHub
