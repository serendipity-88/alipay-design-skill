/**
 * ============================================================
 * 集卡活动活动页 · 完整参考模板
 * ============================================================
 *
 * 直接复制此文件，替换 [A]-[F] 标记的内容区域。
 *
 * ── 模板说明 ──
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * 画布: 375×812 @1x (iPhone X)
 *
 * ── 页面叙事结构 ──
 * 第一幕 · 游戏沉浸（0-52%）：全屏紫蓝渐变 + 角色Tab + 3D卡片轮播
 * 第二幕 · 双路径参与（52-67%）：做任务 / 刮刮乐 双卡片
 * 第三幕 · 利益展示（67-93%）：红包奖品横滑
 * 第四幕 · 导航固定（93-100%）：底部Tab栏
 *
 * ── 设计模式 ──
 * 活动运营型 (Campaign / Gamification)
 *   渐变: #5B3FD9 → #7B5CE6 → #A78BF0 → #E8E0FF（紫蓝色调）
 *   卡片: 3D轮播，中心 220×260，两侧缩小 85%
 *   CTA: 金色渐变 #FFD700 → #FFA500
 *
 * ── 关键产品设计决策（必须保留） ──
 * 1. 紫蓝全屏渐变：高饱和制造节日感，区别于日常功能页
 * 2. 3D角色卡片：游戏化收集欲望
 * 3. 金色集卡按钮：紫色背景上强烈对比，暗示「奖品/价值」
 * 4. 双卡片并排：两种参与路径同时展示，降低选择成本
 * 5. 红包浅红卡片：红色=钱的心智，柔和不刺眼
 *
 * ── 替换指南 ──
 * [A] 活动标题 — 「轻触支付 集卡换好礼」可替换
 * [B] 角色Tab — 角色名称/数量可配置
 * [C] 3D卡片 — 角色插图可替换
 * [D] 集卡CTA — 按钮文案可替换
 * [E] 任务双卡片 — 任务类型/奖品可配置
 * [F] 红包列表 — 面额/状态/描述可替换
 */

import React, { useState } from 'react'
import { TabBar, Button } from 'antd-mobile'

/* ═══════════════════════════════════════════
 * Inline SVG 图标
 * ═══════════════════════════════════════════ */

const BackArrowWhite: React.FC = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
    <path d="M15 19l-7-7 7-7" />
  </svg>
)

const CarouselArrow: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
    <path d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
  </svg>
)

/* ═══════════════════════════════════════════
 * 类型定义
 * ═══════════════════════════════════════════ */

interface Character {
  id: string
  name: string
  count: number
  collected: boolean
}

interface TaskItem {
  type: 'task' | 'scratch'
  title: string
  subtitle: string
  reward?: string
  maxAmount?: string
  actionText: string
}

interface Prize {
  id: string
  amount: number
  unit: string
  status: 'available' | 'tomorrow' | 'soldOut'
  description: string
}

interface CardCollectionProps {
  title?: string                   // [A]
  characters?: Character[]         // [B]
  collectButtonText?: string       // [D]
  tasks?: TaskItem[]               // [E]
  prizes?: Prize[]                 // [F]
  onBack?: () => void
  onCollect?: () => void
  onTaskClick?: (type: string) => void
  onPrizeRedeem?: (id: string) => void
}

/* ═══════════════════════════════════════════
 * 主组件
 * ═══════════════════════════════════════════ */

const CardCollection: React.FC<CardCollectionProps> = ({
  title = '轻触支付 集卡换好礼',
  characters = [
    { id: 'tangseng', name: '唐僧', count: 0, collected: false },
    { id: 'bajie', name: '八戒', count: 4, collected: true },
    { id: 'shaseng', name: '沙僧', count: 1, collected: true },
    { id: 'wukong', name: '悟空', count: 0, collected: false },
    { id: 'bailong', name: '白龙', count: 0, collected: false },
  ],
  collectButtonText = '去集卡',
  tasks = [
    { type: 'task', title: '做任务', subtitle: '获得悟空卡', reward: '悟空卡', actionText: '去查看 >' },
    { type: 'scratch', title: '刮刮乐', subtitle: '做任务 刮好礼', maxAmount: '最高66元', actionText: '' },
  ],
  prizes = [
    { id: '1', amount: 0.2, unit: '元', status: 'available', description: '0.2元碰支付红包' },
    { id: '2', amount: 0.5, unit: '元', status: 'available', description: '0.5元碰支付红包' },
    { id: '3', amount: 1, unit: '元', status: 'tomorrow', description: '1元碰支付红包' },
    { id: '4', amount: 1.5, unit: '元', status: 'soldOut', description: '1.5元碰支付红包' },
  ],
  onBack,
  onCollect,
  onTaskClick,
  onPrizeRedeem,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[2]?.id || characters[0]?.id)
  const currentIndex = characters.findIndex((c) => c.id === selectedCharacter)

  const handlePrev = () => {
    const prev = (currentIndex - 1 + characters.length) % characters.length
    setSelectedCharacter(characters[prev].id)
  }
  const handleNext = () => {
    const next = (currentIndex + 1) % characters.length
    setSelectedCharacter(characters[next].id)
  }

  return (
    <div className="cc-page">

      {/* 导航栏 */}
      <nav className="cc-navbar">
        <span className="cc-back" onClick={onBack}><BackArrowWhite /></span>
        <div className="cc-nav-right">
          <span className="cc-nav-icon">☆</span>
          <span className="cc-nav-icon">···</span>
        </div>
      </nav>

      {/* ══════════════════════════════════════
       * [A] 标题区
       * ══════════════════════════════════════ */}
      <div className="cc-title-row">
        <div className="cc-title">{title}</div>
        <span className="cc-card-link">卡片→</span>
      </div>

      {/* ══════════════════════════════════════
       * [B] 角色Tab栏
       * 胶囊选中态，白底紫字
       * ══════════════════════════════════════ */}
      <div className="cc-character-tabs">
        {characters.map((char) => (
          <div
            key={char.id}
            className={`cc-char-tab ${selectedCharacter === char.id ? 'cc-char-active' : ''}`}
            onClick={() => setSelectedCharacter(char.id)}
          >
            {char.name}
            {char.count > 0 && (
              <span className="cc-char-badge">{char.count}</span>
            )}
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
       * [C] 3D卡片轮播区
       * 中心卡220×260，两侧缩小
       * ══════════════════════════════════════ */}
      <div className="cc-carousel">
        <span className="cc-arrow cc-arrow-left" onClick={handlePrev}>
          <CarouselArrow direction="left" />
        </span>

        <div className="cc-carousel-track">
          {characters.map((char, i) => {
            const offset = i - currentIndex
            const isCenter = offset === 0
            const isVisible = Math.abs(offset) <= 1
            if (!isVisible) return null
            return (
              <div
                key={char.id}
                className={`cc-card ${isCenter ? 'cc-card-center' : 'cc-card-side'}`}
                style={{
                  transform: isCenter
                    ? 'translateX(0) scale(1)'
                    : `translateX(${offset * 120}px) scale(0.85)`,
                  opacity: isCenter ? 1 : 0.6,
                  zIndex: isCenter ? 2 : 1,
                }}
              >
                <div className="cc-view-tag">◇ 查看</div>
                {/* 角色插图占位 */}
                <svg viewBox="0 0 180 200" width={180} height={200}>
                  <rect x="20" y="20" width="140" height="160" rx="16" fill="rgba(255,255,255,0.2)" />
                  <text x="90" y="110" textAnchor="middle" fontSize="24" fill="#fff" fontWeight="700">
                    {char.name}
                  </text>
                  {!char.collected && (
                    <text x="90" y="140" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.7)">
                      未收集
                    </text>
                  )}
                </svg>
              </div>
            )
          })}
        </div>

        <span className="cc-arrow cc-arrow-right" onClick={handleNext}>
          <CarouselArrow direction="right" />
        </span>
      </div>

      {/* [D] 集卡按钮 */}
      <div className="cc-collect-btn-wrap">
        <Button className="cc-collect-btn" shape="rounded" onClick={onCollect}>
          {collectButtonText}
        </Button>
      </div>

      {/* ══════════════════════════════════════
       * [E] 双任务卡片
       * 左：做任务  右：刮刮乐
       * ══════════════════════════════════════ */}
      <div className="cc-task-row">
        {tasks.map((task, i) => (
          <div
            key={i}
            className="cc-task-card"
            onClick={() => onTaskClick?.(task.type)}
          >
            <div className="cc-task-title">{task.title}</div>
            {task.maxAmount && (
              <span className="cc-task-amount-tag">{task.maxAmount}</span>
            )}
            <div className="cc-task-subtitle">{task.subtitle}</div>
            {task.actionText && (
              <span className="cc-task-link">{task.actionText}</span>
            )}
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
       * [F] 集卡兑好礼 — 红包横滑
       * ══════════════════════════════════════ */}
      <section className="cc-prize-section">
        <div className="cc-prize-header">
          <span className="cc-prize-title">集卡兑好礼</span>
          <span className="cc-prize-link">我的奖品 &gt;</span>
        </div>
        <div className="cc-prize-subtitle">兑红包 每日0点更新库存，先到先得</div>

        <div className="cc-prize-scroll">
          {prizes.map((prize) => (
            <div
              key={prize.id}
              className="cc-prize-card"
              onClick={() => onPrizeRedeem?.(prize.id)}
            >
              <div className="cc-prize-amount">
                <span className="cc-prize-number">{prize.amount}</span>
                <span className="cc-prize-unit">{prize.unit}</span>
              </div>
              <div className="cc-prize-status">
                {prize.status === 'available' ? '可兑换' : prize.status === 'tomorrow' ? '明日可用' : '已抢光'}
              </div>
              <div className="cc-prize-desc">{prize.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 底部Tab栏 */}
      <div className="cc-tab-bar">
        <TabBar activeKey="card">
          <TabBar.Item key="tap" title="轻触支付" />
          <TabBar.Item key="card" title="集卡换好礼" />
          <TabBar.Item key="nearby" title="附近优惠" />
        </TabBar>
      </div>

      <style>{`
        .cc-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #5B3FD9 0%, #7B5CE6 30%, #A78BF0 60%, #E8E0FF 100%);
          padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px));
        }

        /* 导航栏 */
        .cc-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 44px;
          padding: 0 16px;
        }
        .cc-back { cursor: pointer; }
        .cc-nav-right {
          display: flex;
          gap: 16px;
        }
        .cc-nav-icon {
          font-size: 20px;
          color: #FFFFFF;
          cursor: pointer;
        }

        /* [A] 标题 */
        .cc-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 16px 0;
        }
        .cc-title {
          font-size: 22px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .cc-card-link {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
        }

        /* [B] 角色Tab */
        .cc-character-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 16px 16px 0;
        }
        .cc-char-tab {
          position: relative;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          padding: 6px 16px;
          border-radius: 18px;
          cursor: pointer;
          transition: all 200ms;
        }
        .cc-char-active {
          background: #FFFFFF;
          color: #5B3FD9;
          font-weight: 600;
        }
        .cc-char-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          background: #FF3141;
          border-radius: 50%;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* [C] 轮播区 */
        .cc-carousel {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 280px;
          padding: 0 16px;
        }
        .cc-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 3;
          flex-shrink: 0;
        }
        .cc-carousel-track {
          position: relative;
          width: 220px;
          height: 260px;
          margin: 0 16px;
        }
        .cc-card {
          position: absolute;
          width: 220px;
          height: 260px;
          border-radius: 20px;
          background: linear-gradient(180deg, #C4A8FF 0%, #E8D8FF 100%);
          box-shadow: 0 8px 24px rgba(91, 63, 217, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 300ms ease;
        }
        .cc-view-tag {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 12px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          font-size: 12px;
          color: #FFFFFF;
        }

        /* [D] 集卡按钮 */
        .cc-collect-btn-wrap {
          display: flex;
          justify-content: center;
          padding: 16px 0;
        }
        .cc-collect-btn {
          width: 120px;
          height: 40px;
          background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
          border: none;
          border-radius: 20px;
          font-size: 15px;
          font-weight: 600;
          color: #8B4513;
          box-shadow: 0 4px 12px rgba(255, 165, 0, 0.4);
        }

        /* [E] 双任务卡片 */
        .cc-task-row {
          display: flex;
          gap: 12px;
          padding: 0 16px;
          margin-bottom: 24px;
        }
        .cc-task-card {
          flex: 1;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 16px;
          cursor: pointer;
        }
        .cc-task-title {
          font-size: 16px;
          font-weight: 600;
          color: #1A1A1A;
        }
        .cc-task-amount-tag {
          display: inline-block;
          font-size: 12px;
          color: #FF8C38;
          background: #FFF5EC;
          padding: 2px 6px;
          border-radius: 4px;
          margin-top: 4px;
        }
        .cc-task-subtitle {
          font-size: 13px;
          color: #666666;
          margin-top: 4px;
        }
        .cc-task-link {
          font-size: 13px;
          font-weight: 500;
          color: #5B3FD9;
          margin-top: 8px;
          display: inline-block;
        }

        /* [F] 奖品区 */
        .cc-prize-section {
          padding: 0 16px;
        }
        .cc-prize-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cc-prize-title {
          font-size: 18px;
          font-weight: 700;
          color: #1A1A1A;
        }
        .cc-prize-link {
          font-size: 14px;
          color: #666666;
          cursor: pointer;
        }
        .cc-prize-subtitle {
          font-size: 13px;
          color: #999999;
          margin-top: 8px;
          margin-bottom: 12px;
        }
        .cc-prize-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
        }
        .cc-prize-scroll::-webkit-scrollbar { display: none; }
        .cc-prize-card {
          min-width: 90px;
          height: 110px;
          background: linear-gradient(180deg, #FFE8E8 0%, #FFF0F0 100%);
          border-radius: 12px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .cc-prize-amount {
          display: flex;
          align-items: baseline;
        }
        .cc-prize-number {
          font-size: 24px;
          font-weight: 700;
          color: #FF3141;
          font-variant-numeric: tabular-nums;
          font-family: DINPro-Bold, DINAlternate, tabular-nums, sans-serif;
        }
        .cc-prize-unit {
          font-size: 14px;
          color: #FF3141;
        }
        .cc-prize-status {
          font-size: 12px;
          color: #999999;
          margin-top: 4px;
        }
        .cc-prize-desc {
          font-size: 11px;
          color: #666666;
          text-align: center;
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        /* 底部Tab */
        .cc-tab-bar {
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

export default CardCollection
