/**
 * ============================================================
 * 附近优惠商家页 · 完整参考模板
 * ============================================================
 *
 * 直接复制此文件，替换 [A]-[G] 标记的内容区域。
 *
 * ── 模板说明 ──
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * 画布: 375×812 @1x (iPhone X)
 *
 * ── 页面叙事结构 ──
 * 第一幕 · 氛围建立（0-25%）：橙色暖色渐变 + 主标题
 * 第二幕 · 利益前置（25-47%）：大牌好券横滑
 * 第三幕 · 分类筛选（47-57%）：分类Tab + 快捷入口
 * 第四幕 · 决策列表（57-93%）：商家卡片列表（核心）
 * 第五幕 · 导航固定（93-100%）：底部Tab栏
 *
 * ── 设计模式 ──
 * 活动运营型 (Campaign Operation)
 *   渐变: #FF8C38 → #FFA755 → #FFF5EC（暖色=优惠/到店）
 *   卡片: 圆角16px
 *   价格色: #FF4D00 橙红统一
 *
 * ── 关键产品设计决策（必须保留） ──
 * 1. 橙色渐变而非蓝色：区别于支付场景，突出「优惠/温暖」
 * 2. 券区置顶：「大牌好券」免费券先吸引注意
 * 3. 商家卡片信息密度高：距离+价格+优惠一次看全
 * 4. 导航按钮蓝色圆形：在橙色页面中形成对比焦点
 * 5. 3Tab底栏：轻触支付子频道独立导航
 *
 * ── 替换指南 ──
 * [A] 头部标题 — 「身边优惠 轻触支付 就有」可替换
 * [B] 城市选择 — LBS 动态
 * [C] 大牌好券 — 券列表数量/品牌/价格可替换
 * [D] 分类Tab — 类目名称可替换
 * [E] 快捷入口 — 标签内容可配置
 * [F] 商家列表 — 商家信息/优惠/商品图可替换
 * [G] 底部Tab — 3个固定入口
 */

import React, { useState } from 'react'
import { NavBar, Tabs, TabBar, Button } from 'antd-mobile'

/* ═══════════════════════════════════════════
 * Inline SVG 图标
 * ═══════════════════════════════════════════ */

const BackArrowWhite: React.FC = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
    <path d="M15 19l-7-7 7-7" />
  </svg>
)

const NavIcon: React.FC = () => (
  <svg viewBox="0 0 32 32" width={32} height={32} fill="none">
    <circle cx="16" cy="16" r="16" fill="#1677FF" />
    <path d="M16 10v8M16 18l-3-3M16 18l3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="22" r="1" fill="#fff" />
  </svg>
)

const MapPinIcon: React.FC = () => (
  <svg viewBox="0 0 14 14" width={14} height={14} fill="none">
    <circle cx="7" cy="6" r="4" stroke="#999" strokeWidth="1" />
    <circle cx="7" cy="6" r="1.5" fill="#999" />
    <path d="M7 10v2" stroke="#999" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

const SearchIcon: React.FC = () => (
  <svg viewBox="0 0 14 14" width={14} height={14} fill="none">
    <circle cx="6" cy="6" r="4" stroke="#999" strokeWidth="1" />
    <path d="M9 9l3 3" stroke="#999" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

/* ═══════════════════════════════════════════
 * 类型定义
 * ═══════════════════════════════════════════ */

interface BrandCoupon {
  id: string
  image?: string
  price: number
  condition: string
  brand: string
  description: string
}

interface Category {
  key: string
  label: string
}

interface QuickEntry {
  icon?: 'map' | 'search'
  label: string
  highlight?: boolean
}

interface Promotion {
  type: 'coupon' | 'flash'
  currentPrice: number
  originalPrice: number
  discount: string
  description?: string
}

interface Product {
  image?: string
  price: number
}

interface Merchant {
  id: string
  logo?: string
  name: string
  distance: number
  address: string
  badge?: string
  promotions: Promotion[]
  products: Product[]
}

interface NearbyMerchantPageProps {
  city?: string                   // [B] "杭州"
  heroTitle?: string              // [A]
  coupons?: BrandCoupon[]         // [C]
  categories?: Category[]         // [D]
  quickEntries?: QuickEntry[]     // [E]
  merchants?: Merchant[]          // [F]
  onBack?: () => void
  onCityChange?: () => void
  onClaimCoupon?: (id: string) => void
  onNavigate?: (merchantId: string) => void
  onCategoryChange?: (key: string) => void
}

/* ═══════════════════════════════════════════
 * 主组件
 * ═══════════════════════════════════════════ */

const NearbyMerchant: React.FC<NearbyMerchantPageProps> = ({
  city = '杭州',
  heroTitle = '身边优惠 轻触支付 就有',
  coupons = [
    { id: '1', price: 0, condition: '满100可用', brand: '蜜雪冰城', description: '鲜果茶兑换券' },
    { id: '2', price: 0, condition: '满60可用', brand: '麦当劳', description: '随心配套餐券' },
    { id: '3', price: 0, condition: '满30可用', brand: '瑞幸咖啡', description: '9.9优惠券' },
  ],
  categories = [
    { key: 'all', label: '全部' },
    { key: 'food', label: '美食饮品' },
    { key: 'market', label: '超市便利' },
    { key: 'mall', label: '商场购物' },
  ],
  quickEntries = [
    { icon: 'map', label: '地图' },
    { icon: 'search', label: '搜索' },
    { label: '新人红包', highlight: true },
    { label: '咖啡自由' },
    { label: '会员免单' },
  ],
  merchants = [
    {
      id: '1',
      name: '全家便利店（天目山路四店）',
      distance: 200,
      address: '天目山路398号',
      badge: '入选2025西湖消费节优质商家',
      promotions: [
        { type: 'coupon', currentPrice: 52, originalPrice: 60, discount: '满60减8' },
        { type: 'flash', currentPrice: 49, originalPrice: 94, discount: '5.8折', description: '13件超值全家桶' },
      ],
      products: [
        { price: 9.9 },
        { price: 12.9 },
        { price: 6.9 },
      ],
    },
  ],
  onBack,
  onCityChange,
  onClaimCoupon,
  onNavigate,
  onCategoryChange,
}) => {
  const [activeCategory, setActiveCategory] = useState('all')

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key)
    onCategoryChange?.(key)
  }

  return (
    <div className="nm-page">

      {/* ══════════════════════════════════════
       * 橙色渐变头部
       * #FF8C38 → #FFA755 → #FFF5EC
       * ══════════════════════════════════════ */}
      <div className="nm-header">
        {/* 导航栏 */}
        <NavBar
          backIcon={<BackArrowWhite />}
          onBack={onBack}
          left={
            <span className="nm-city" onClick={onCityChange}>{city}∨</span>
          }
          className="nm-navbar"
        >
          {''}
        </NavBar>

        {/* [A] 主标题 */}
        <div className="nm-hero-title">{heroTitle}</div>
      </div>

      {/* ══════════════════════════════════════
       * [C] 大牌好券横滑区
       * 白卡，圆角16px
       * ══════════════════════════════════════ */}
      <section className="nm-coupon-section">
        <div className="nm-section-title">大牌好券</div>
        <div className="nm-coupon-scroll">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="nm-coupon-item">
              {/* 商品图占位 */}
              <div className="nm-coupon-image">
                <svg viewBox="0 0 60 60" width={60} height={60}>
                  <rect width="60" height="60" rx="8" fill="#FFF5EC" />
                  <text x="30" y="35" textAnchor="middle" fontSize="10" fill="#FF4D00">{coupon.brand.slice(0, 2)}</text>
                </svg>
              </div>
              <div className="nm-coupon-price">¥{coupon.price}</div>
              <div className="nm-coupon-condition">{coupon.condition}</div>
              <div className="nm-coupon-desc">{coupon.description}</div>
              <span
                className="nm-coupon-claim"
                onClick={() => onClaimCoupon?.(coupon.id)}
              >
                立即领
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
       * [D] 分类Tab栏
       * ══════════════════════════════════════ */}
      <div className="nm-category-bar">
        <Tabs
          activeKey={activeCategory}
          onChange={handleCategoryChange}
          className="nm-tabs"
        >
          {categories.map((cat) => (
            <Tabs.Tab key={cat.key} title={cat.label} />
          ))}
        </Tabs>

        {/* [E] 快捷入口行 */}
        <div className="nm-quick-entries">
          {quickEntries.map((entry, i) => (
            <span
              key={i}
              className={`nm-entry-tag ${entry.highlight ? 'nm-entry-highlight' : ''}`}
            >
              {entry.icon === 'map' && <MapPinIcon />}
              {entry.icon === 'search' && <SearchIcon />}
              {entry.label}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
       * [F] 商家列表
       * 白卡，圆角16px
       * ══════════════════════════════════════ */}
      <div className="nm-merchant-list">
        {merchants.map((merchant) => (
          <div key={merchant.id} className="nm-merchant-card">

            {/* 商家信息头部 */}
            <div className="nm-merchant-header">
              <div className="nm-merchant-logo">
                <svg viewBox="0 0 44 44" width={44} height={44}>
                  <rect width="44" height="44" rx="8" fill="#F5F5F5" />
                  <text x="22" y="26" textAnchor="middle" fontSize="11" fill="#333">{merchant.name.slice(0, 2)}</text>
                </svg>
              </div>
              <div className="nm-merchant-info">
                <div className="nm-merchant-name">{merchant.name}</div>
                <div className="nm-merchant-meta">
                  ⊙ {merchant.distance >= 1000
                    ? `${(merchant.distance / 1000).toFixed(1)}km`
                    : `${merchant.distance}m`
                  } | {merchant.address}
                </div>
                {merchant.badge && (
                  <div className="nm-merchant-badge">🏅 {merchant.badge}</div>
                )}
              </div>
              <div className="nm-nav-btn" onClick={() => onNavigate?.(merchant.id)}>
                <NavIcon />
                <span className="nm-nav-text">马上去</span>
              </div>
            </div>

            {/* 优惠信息行 */}
            {merchant.promotions.map((promo, i) => (
              <div key={i} className="nm-promo-row">
                <span className="nm-promo-tag">
                  {promo.type === 'coupon' ? '券' : '闪'}
                </span>
                <span className="nm-promo-current">¥{promo.currentPrice}</span>
                <span className="nm-promo-original">¥{promo.originalPrice}</span>
                <span className="nm-promo-discount">{promo.discount}</span>
                {promo.description && (
                  <span className="nm-promo-desc">{promo.description}</span>
                )}
              </div>
            ))}

            {/* 商品图横滑 */}
            {merchant.products.length > 0 && (
              <div className="nm-product-scroll">
                {merchant.products.map((product, i) => (
                  <div key={i} className="nm-product-item">
                    <div className="nm-product-image">
                      <svg viewBox="0 0 64 64" width={64} height={64}>
                        <rect width="64" height="64" rx="8" fill="#F5F5F5" />
                        <text x="32" y="36" textAnchor="middle" fontSize="11" fill="#999">商品</text>
                      </svg>
                    </div>
                    <div className="nm-product-price">¥{product.price}</div>
                  </div>
                ))}
              </div>
            )}

            {/* 操作按钮行 */}
            <div className="nm-action-row">
              <Button className="nm-action-primary" size="mini" shape="rounded">
                立即领
              </Button>
              <Button className="nm-action-secondary" size="mini" shape="rounded" fill="none">
                去参与
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
       * [G] 底部Tab栏
       * ══════════════════════════════════════ */}
      <div className="nm-tab-bar">
        <TabBar activeKey="nearby">
          <TabBar.Item key="tap" title="轻触支付" />
          <TabBar.Item key="card" title="集卡换好礼" />
          <TabBar.Item key="nearby" title="附近优惠" />
        </TabBar>
      </div>

      <style>{`
        .nm-page {
          min-height: 100vh;
          background: #F5F5F5;
          padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px));
        }

        /* 橙色渐变头部 */
        .nm-header {
          background: linear-gradient(180deg, #FF8C38 0%, #FFA755 50%, #FFF5EC 100%);
          padding-bottom: 24px;
        }
        .nm-navbar {
          --height: 44px;
          --border-bottom: none;
          background: transparent;
        }
        .nm-city {
          font-size: 15px;
          color: #FFFFFF;
          font-weight: 400;
          margin-left: 8px;
        }
        .nm-hero-title {
          font-size: 24px;
          font-weight: 700;
          color: #FFFFFF;
          padding: 16px 16px 0;
        }

        /* [C] 券区 */
        .nm-coupon-section {
          margin: -12px 16px 0;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          position: relative;
          z-index: 1;
        }
        .nm-section-title {
          font-size: 16px;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 12px;
        }
        .nm-coupon-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .nm-coupon-scroll::-webkit-scrollbar { display: none; }
        .nm-coupon-item {
          min-width: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .nm-coupon-image {
          width: 60px;
          height: 60px;
        }
        .nm-coupon-price {
          font-size: 20px;
          font-weight: 700;
          color: #FF4D00;
          font-variant-numeric: tabular-nums;
          font-family: DINPro-Bold, DINAlternate, tabular-nums, sans-serif;
        }
        .nm-coupon-condition {
          font-size: 11px;
          color: #999999;
        }
        .nm-coupon-desc {
          font-size: 12px;
          color: #333333;
          text-align: center;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .nm-coupon-claim {
          font-size: 13px;
          font-weight: 500;
          color: #FF4D00;
          cursor: pointer;
        }

        /* [D] 分类Tab */
        .nm-category-bar {
          background: #FFFFFF;
          margin-top: 12px;
        }
        .nm-tabs {
          --active-line-color: #1A1A1A;
          --active-title-color: #1A1A1A;
          --title-font-size: 15px;
        }

        /* [E] 快捷入口 */
        .nm-quick-entries {
          display: flex;
          gap: 8px;
          padding: 8px 16px 12px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .nm-quick-entries::-webkit-scrollbar { display: none; }
        .nm-entry-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          height: 28px;
          padding: 0 12px;
          background: #F5F5F5;
          border-radius: 14px;
          font-size: 12px;
          color: #333333;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nm-entry-highlight {
          background: #FFF5EC;
          color: #FF4D00;
        }

        /* [F] 商家列表 */
        .nm-merchant-list {
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .nm-merchant-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 16px;
        }

        /* 商家头部 */
        .nm-merchant-header {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }
        .nm-merchant-logo {
          flex-shrink: 0;
        }
        .nm-merchant-info {
          flex: 1;
          min-width: 0;
        }
        .nm-merchant-name {
          font-size: 16px;
          font-weight: 600;
          color: #1A1A1A;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .nm-merchant-meta {
          font-size: 13px;
          color: #999999;
          margin-top: 4px;
        }
        .nm-merchant-badge {
          font-size: 12px;
          color: #666666;
          margin-top: 4px;
        }
        .nm-nav-btn {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          cursor: pointer;
        }
        .nm-nav-text {
          font-size: 12px;
          color: #1677FF;
        }

        /* 优惠行 */
        .nm-promo-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 8px;
        }
        .nm-promo-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          color: #FFFFFF;
          background: #FF4D00;
          padding: 1px 4px;
          border-radius: 2px;
        }
        .nm-promo-current {
          font-size: 15px;
          font-weight: 700;
          color: #FF4D00;
          font-variant-numeric: tabular-nums;
          font-family: DINPro-Bold, DINAlternate, tabular-nums, sans-serif;
        }
        .nm-promo-original {
          font-size: 12px;
          color: #CCCCCC;
          text-decoration: line-through;
        }
        .nm-promo-discount {
          font-size: 12px;
          color: #FF4D00;
        }
        .nm-promo-desc {
          font-size: 12px;
          color: #333333;
        }

        /* 商品图横滑 */
        .nm-product-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          margin-bottom: 12px;
        }
        .nm-product-scroll::-webkit-scrollbar { display: none; }
        .nm-product-item {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .nm-product-image {
          width: 64px;
          height: 64px;
        }
        .nm-product-price {
          font-size: 11px;
          color: #FF4D00;
        }

        /* 操作按钮 */
        .nm-action-row {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        .nm-action-primary {
          background: #FF4D00;
          border: none;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 500;
          height: 32px;
          border-radius: 16px;
          padding: 0 16px;
        }
        .nm-action-secondary {
          background: #FFF5EC;
          border: none;
          color: #FF4D00;
          font-size: 13px;
          font-weight: 500;
          height: 32px;
          border-radius: 16px;
          padding: 0 16px;
        }

        /* [G] 底部Tab栏 */
        .nm-tab-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border-top: 1px solid #F0F0F0;
          padding-bottom: env(safe-area-inset-bottom, 0px);
          z-index: 10;
        }
      `}</style>
    </div>
  )
}

export default NearbyMerchant
