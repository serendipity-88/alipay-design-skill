/**
 * ============================================================
 * 安全感教育页 · 完整参考模板
 * ============================================================
 *
 * 直接复制此文件，替换 [A]-[G] 标记的内容区域。
 *
 * ── 模板说明 ──
 * 基于页面模式与组件策略整理，可按业务替换内容。
 * 画布: 375×812 @1x (iPhone X)
 *
 * ── 页面叙事结构 ──
 * 第一幕 · 数据背书（0-10%）：「多人已在使用」+ 主标题
 * 第二幕 · 分段FAQ（10-55%）：4个Tab + 问答卡片 + 场景插图
 * 第三幕 · 安全特性（55-70%）：金融级安全防控 3列卡片
 * 第四幕 · 保障承诺（70-85%）：保障承诺 + 保障服务
 * 第五幕 · 媒体背书（85-100%）：权威媒体报道横滑
 *
 * ── 设计模式 ──
 * 长页面教育型 (Long-form Education)
 *   渐变: #E0EDFF → #D6E8FF → #F5F5F5
 *   卡片: 圆角16px, 阴影 rgba(90,110,149,0.08)
 *   总高度: ~2400px, 约3屏滚动
 *   叙事: 数据→FAQ→特性→保障→媒体，逐层深化信任
 *
 * ── 关键产品设计决策（必须保留） ──
 * 1. 长页面而非弹窗：安全教育需充分展开
 * 2. 数据背书开头：社会认同建立基线
 * 3. FAQ问答形式：用户真实疑问驱动，比陈述更有说服力
 * 4. 分段Tab锚点：长页面导航
 * 5. 保障承诺用品牌背书：保障服务=保险品牌
 * 6. 媒体报道收尾：第三方权威背书是信任链最后一环
 *
 * ── 替换指南 ──
 * [A] 数据背书 — 「多人已在使用」数字可替换
 * [B] 主标题 — 「多重安全保障 保障承诺」可替换
 * [C] 分段Tab — 4个安全主题可配置
 * [D] FAQ卡片 — 问答内容/插图可替换
 * [E] 安全特性 — 3项特性可替换
 * [F] 保障承诺 — 保险产品/赔付说明可替换
 * [G] 媒体报道 — 媒体材料/来源/名称可替换
 */

import React, { useState, useRef } from 'react'
import { NavBar } from 'antd-mobile'

/* ═══════════════════════════════════════════
 * Inline SVG 图标
 * ═══════════════════════════════════════════ */

const BackArrow: React.FC = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
    <path d="M15 19l-7-7 7-7" />
  </svg>
)

const QuestionIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" width={20} height={20} fill="none">
    <circle cx="10" cy="10" r="9" fill="#1677FF" />
    <text x="10" y="14" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="600">?</text>
  </svg>
)

const ShieldIcon: React.FC = () => (
  <svg viewBox="0 0 32 32" width={32} height={32} fill="none">
    <path d="M16 4l9 5v6c0 5.5-3.8 10.5-9 12.5-5.2-2-9-7-9-12.5V9l9-5z" fill="#1677FF" opacity="0.15" />
    <path d="M16 4l9 5v6c0 5.5-3.8 10.5-9 12.5-5.2-2-9-7-9-12.5V9l9-5z" stroke="#1677FF" strokeWidth="1.5" />
    <path d="M12 16l3 3 5-5" stroke="#1677FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LockIcon: React.FC = () => (
  <svg viewBox="0 0 32 32" width={32} height={32} fill="none">
    <rect x="8" y="14" width="16" height="12" rx="2" stroke="#1677FF" strokeWidth="1.5" />
    <path d="M12 14v-3a4 4 0 018 0v3" stroke="#1677FF" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="20" r="2" fill="#1677FF" />
  </svg>
)

const ChartIcon: React.FC = () => (
  <svg viewBox="0 0 32 32" width={32} height={32} fill="none">
    <rect x="6" y="18" width="5" height="8" rx="1" fill="#1677FF" opacity="0.3" />
    <rect x="13.5" y="12" width="5" height="14" rx="1" fill="#1677FF" opacity="0.5" />
    <rect x="21" y="8" width="5" height="18" rx="1" fill="#1677FF" />
  </svg>
)

/* ═══════════════════════════════════════════
 * 类型定义
 * ═══════════════════════════════════════════ */

interface Segment {
  key: string
  label: string
}

interface FAQCardData {
  id: string
  segmentKey: string
  title: string
  question: string
  answer: string
  detailLink?: string
}

interface SecurityFeature {
  title: string
  description: string
}

interface GuaranteeInfo {
  brandName: string
  description: string
  coverageText: string
}

interface MediaReport {
  id: string
  mediaName: string
  sourceText: string
}

interface SecurityEducationProps {
  endorsementNumber?: string       // [A] "3亿"
  mainTitle?: string               // [B]
  segments?: Segment[]             // [C]
  faqCards?: FAQCardData[]         // [D]
  securityFeatures?: SecurityFeature[]  // [E]
  guarantee?: GuaranteeInfo        // [F]
  mediaReports?: MediaReport[]     // [G]
  onBack?: () => void
  onDetailClick?: (faqId: string) => void
  onMediaClick?: (reportId: string) => void
}

/* ═══════════════════════════════════════════
 * 主组件
 * ═══════════════════════════════════════════ */

const SecurityEducation: React.FC<SecurityEducationProps> = ({
  endorsementNumber = '3亿',
  mainTitle = '多重安全保障 保障承诺',
  segments = [
    { key: 'unlock', label: '解锁手机才能付' },
    { key: 'lost', label: '手机丢失保障' },
    { key: 'touch', label: '手机要去碰设备' },
    { key: 'finance', label: '金融级安防控' },
  ],
  faqCards = [
    {
      id: '1', segmentKey: 'unlock',
      title: '解锁手机才能轻触支付',
      question: '手机丢了会被盗刷吗？',
      answer: '不会。轻触支付必须在手机解锁状态下才能使用，别人捡到你的手机无法直接轻触支付。',
      detailLink: '不信？请查阅详情 >',
    },
    {
      id: '2', segmentKey: 'touch',
      title: '手机要去碰设备',
      question: '别人拿设备蹭我手机能扣钱吗？',
      answer: '不会。轻触支付需要你主动将解锁的手机靠近设备，直接按面容/指纹确认才能完成支付。',
      detailLink: '不信？请查阅详情 >',
    },
  ],
  securityFeatures = [
    { title: '安全认证', description: 'NFC安全认证技术' },
    { title: '手机加密', description: '轻触支付在国内所有...' },
    { title: '金融防控', description: '万分之一"碰"的实时风控' },
  ],
  guarantee = {
    brandName: '保障服务账户安全险',
    description: '轻触支付已加入账户安全保障，如遇盗刷可申请赔付',
    coverageText: '赔付保障覆盖轻触支付全场景',
  },
  mediaReports = [
    { id: '1', mediaName: '媒体报道轻触支付', sourceText: '媒体' },
    { id: '2', mediaName: '中国警察网权威解读', sourceText: '中国警察网' },
  ],
  onBack,
  onDetailClick,
  onMediaClick,
}) => {
  const [activeSegment, setActiveSegment] = useState(segments[0]?.key)
  const contentRef = useRef<HTMLDivElement>(null)

  const featureIcons = [<ShieldIcon key="s" />, <LockIcon key="l" />, <ChartIcon key="c" />]

  return (
    <div className="se-page" ref={contentRef}>

      {/* 头部渐变 */}
      <div className="se-gradient" />

      {/* 导航栏 */}
      <NavBar backIcon={<BackArrow />} onBack={onBack} className="se-navbar">{''}</NavBar>

      {/* ══════════════════════════════════════
       * [A] 数据背书区
       * ══════════════════════════════════════ */}
      <section className="se-endorsement">
        <span className="se-endorsement-text">轻触支付 超 </span>
        <span className="se-endorsement-number">{endorsementNumber}</span>
        <span className="se-endorsement-text"> 人都在用</span>
      </section>

      {/* [B] 主标题 */}
      <div className="se-main-title">{mainTitle}</div>

      {/* ══════════════════════════════════════
       * [C] 分段Tab
       * 2×2 网格，选中白卡蓝字
       * ══════════════════════════════════════ */}
      <div className="se-segment-grid">
        {segments.map((seg) => (
          <div
            key={seg.key}
            className={`se-segment-item ${activeSegment === seg.key ? 'se-segment-active' : ''}`}
            onClick={() => setActiveSegment(seg.key)}
          >
            {seg.label}
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
       * [D] FAQ问答卡片
       * ══════════════════════════════════════ */}
      <div className="se-faq-section">
        {faqCards.map((faq) => (
          <div key={faq.id} className="se-faq-card">
            {/* 卡片标题 */}
            <div className="se-faq-title-row">
              <QuestionIcon />
              <span className="se-faq-title">{faq.title}</span>
            </div>

            {/* 插图区占位 */}
            <div className="se-faq-illustration">
              <svg viewBox="0 0 280 120" width="100%" height={120}>
                <rect width="280" height="120" rx="12" fill="#F0F5FF" />
                <text x="140" y="65" textAnchor="middle" fontSize="14" fill="#1677FF">场景示意图</text>
              </svg>
            </div>

            {/* 问答 */}
            <div className="se-qa-row">
              <span className="se-q-tag">Q</span>
              <span className="se-q-text">{faq.question}</span>
            </div>
            <div className="se-qa-row">
              <span className="se-a-tag">A</span>
              <span className="se-a-text">{faq.answer}</span>
            </div>

            {/* 详情链接 */}
            {faq.detailLink && (
              <span
                className="se-detail-link"
                onClick={() => onDetailClick?.(faq.id)}
              >
                {faq.detailLink}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
       * [E] 金融级安全防控
       * 3列等分特性卡片
       * ══════════════════════════════════════ */}
      <section className="se-features-section">
        <div className="se-section-title">金融级安全防控</div>
        <div className="se-features-grid">
          {securityFeatures.map((feat, i) => (
            <div key={i} className="se-feature-card">
              {featureIcons[i] || featureIcons[0]}
              <div className="se-feature-title">{feat.title}</div>
              <div className="se-feature-desc">{feat.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
       * [F] 你敢碰 我敢赔
       * ══════════════════════════════════════ */}
      <section className="se-guarantee-section">
        <div className="se-section-title">你敢碰 我敢赔</div>
        <div className="se-guarantee-card">
          <div className="se-guarantee-header">
            <ShieldIcon />
            <span className="se-guarantee-brand">{guarantee.brandName}</span>
          </div>
          <div className="se-guarantee-desc">{guarantee.description}</div>
          <span className="se-guarantee-tag">{guarantee.coverageText}</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
       * [G] 权威媒体报道
       * 横滑卡片
       * ══════════════════════════════════════ */}
      <section className="se-media-section">
        <div className="se-section-title">权威媒体报道</div>
        <div className="se-media-scroll">
          {mediaReports.map((report) => (
            <div
              key={report.id}
              className="se-media-card"
              onClick={() => onMediaClick?.(report.id)}
            >
              {/* 媒体缩略图占位 */}
              <div className="se-media-thumb">
                <svg viewBox="0 0 160 70" width="100%" height={70}>
                  <rect width="160" height="70" rx="8" fill="#F0F5FF" />
                  <text x="80" y="40" textAnchor="middle" fontSize="11" fill="#999">{report.sourceText}</text>
                </svg>
              </div>
              <div className="se-media-name">{report.mediaName}</div>
              <div className="se-media-source">{report.sourceText}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 底部安全区 */}
      <div className="se-safe-bottom" />

      <style>{`
        .se-page {
          min-height: 100vh;
          position: relative;
          background: #F5F5F5;
        }
        .se-gradient {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 300px;
          background: linear-gradient(180deg, #E0EDFF 0%, #D6E8FF 40%, #F5F5F5 100%);
          z-index: 0;
        }
        .se-navbar {
          --height: 44px;
          --border-bottom: none;
          background: transparent;
          position: relative;
          z-index: 2;
        }

        /* [A] 数据背书 */
        .se-endorsement {
          text-align: center;
          padding: 16px 16px 0;
          position: relative;
          z-index: 1;
        }
        .se-endorsement-text {
          font-size: 14px;
          color: #333333;
        }
        .se-endorsement-number {
          font-size: 32px;
          font-weight: 700;
          color: #1677FF;
          font-variant-numeric: tabular-nums;
          font-family: DINPro-Bold, DINAlternate, tabular-nums, sans-serif;
        }

        /* [B] 主标题 */
        .se-main-title {
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          color: #1A1A1A;
          margin-top: 8px;
          position: relative;
          z-index: 1;
        }

        /* [C] 分段Tab */
        .se-segment-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          padding: 20px 16px;
          position: relative;
          z-index: 1;
        }
        .se-segment-item {
          text-align: center;
          font-size: 14px;
          color: #666666;
          padding: 10px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 200ms;
        }
        .se-segment-active {
          background: #FFFFFF;
          color: #1677FF;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(22, 119, 255, 0.1);
        }

        /* [D] FAQ卡片 */
        .se-faq-section {
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        .se-faq-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(90, 110, 149, 0.08);
        }
        .se-faq-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .se-faq-title {
          font-size: 16px;
          font-weight: 600;
          color: #1A1A1A;
        }
        .se-faq-illustration {
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
        }

        /* 问答 */
        .se-qa-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .se-q-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          background: #1677FF;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 600;
          border-radius: 4px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .se-a-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          background: #00B578;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 600;
          border-radius: 4px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .se-q-text {
          font-size: 15px;
          font-weight: 600;
          color: #1A1A1A;
          line-height: 1.6;
        }
        .se-a-text {
          font-size: 14px;
          color: #666666;
          line-height: 1.6;
        }
        .se-detail-link {
          font-size: 13px;
          color: #1677FF;
          cursor: pointer;
          display: inline-block;
          margin-top: 4px;
        }

        /* [E] 安全特性 */
        .se-features-section {
          padding: 32px 16px 0;
          position: relative;
          z-index: 1;
        }
        .se-section-title {
          font-size: 18px;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 16px;
        }
        .se-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .se-feature-card {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }
        .se-feature-title {
          font-size: 14px;
          font-weight: 600;
          color: #1A1A1A;
          margin-top: 8px;
        }
        .se-feature-desc {
          font-size: 12px;
          color: #999999;
          margin-top: 4px;
          line-height: 1.4;
        }

        /* [F] 保障承诺 */
        .se-guarantee-section {
          padding: 32px 16px 0;
          position: relative;
          z-index: 1;
        }
        .se-guarantee-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(90, 110, 149, 0.08);
        }
        .se-guarantee-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .se-guarantee-brand {
          font-size: 15px;
          font-weight: 600;
          color: #1A1A1A;
        }
        .se-guarantee-desc {
          font-size: 13px;
          color: #666666;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .se-guarantee-tag {
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          color: #1677FF;
          background: #EDF4FF;
          padding: 4px 8px;
          border-radius: 4px;
        }

        /* [G] 媒体报道 */
        .se-media-section {
          padding: 32px 16px 0;
          position: relative;
          z-index: 1;
        }
        .se-media-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .se-media-scroll::-webkit-scrollbar { display: none; }
        .se-media-card {
          min-width: 160px;
          background: #FFFFFF;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
        }
        .se-media-thumb {
          height: 70px;
        }
        .se-media-name {
          font-size: 13px;
          color: #333333;
          padding: 8px 12px 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .se-media-source {
          font-size: 12px;
          color: #999999;
          padding: 0 12px 8px;
        }

        /* 底部安全区 */
        .se-safe-bottom {
          height: calc(24px + env(safe-area-inset-bottom, 0px));
        }
      `}</style>
    </div>
  )
}

export default SecurityEducation
