/**
 * ============================================================
 * 支付结果页 · 完整参考模板
 * ============================================================
 *
 * 这不是一个骨架，是一个完整的、经过验证的成品页面。
 * 使用方式：直接复制此文件，在此基础上替换具体业务内容。
 *
 * ── 模板说明 ──
 * 页面模板 > 支付结果页:10/默认 + 优惠高亮变体
 * 画布: 750×1624 @2x → 375×812 @1x (iPhone X)
 *
 * ── 页面叙事结构 ──
 * 第一幕 · 情绪建立（0-35%）：品牌蓝渐变 + 成功图标 + 金额 + 商户
 * 第二幕 · 运营转化（35-80%）：支付有礼券 + 挂牌连接器 + 教育/推广卡片
 * 第三幕 · 行动收尾（80-100%）：完成按钮
 *
 * ── 设计模式 ──
 * 情绪头部型 (Emotion Header)
 *   渐变: #429fff → #1677ff@74% → #f5f5f5，覆盖 49.4% 屏高
 *   阴影: rgba(88,123,140,0.08) y=20 blur=40
 *   卡片圆角: 12px（紧凑卡片）/ 22px（按钮）
 *
 * ── 关键产品设计决策（必须保留） ──
 * 1. 头部紧凑：成功图标+金额+商户在一个区块内，不拆开
 * 2. 支付有礼券：结果页是运营黄金位，必须有激励（红包/券）
 * 3. 挂牌连接器：券和教育卡之间用连接器暗示关联
 * 4. Badge + 高亮标题：「轻触支付」蓝色 badge + 关键词品牌蓝高亮
 * 5. 插图区：用 CSS 绘制手机→箭头→蓝环，可替换为 GE 动画或视频
 * 6. 水平步骤流：1→2→3 一行展示，比垂直列表更易扫读
 * 7. 强 CTA：「查看方法」口语化、低门槛
 *
 * ── 替换指南 ──
 * [A] 修改支付信息：搜索「66.00」「示例商户」替换金额和商户
 * [B] 替换优惠券：修改「支付有礼」区域的文案和金额
 * [C] 替换教育卡：修改 Badge 文案、标题、插图、步骤、CTA
 * [D] 换插图为视频：取消 isPlaying 条件，直接展示 video 元素
 * [E] 换插图为 GE 动画：用 canvas + @galacean/effects 替换插图 div
 * [F] 添加变体策略：用 state + 配置对象控制不同人群展示不同标题/步骤/CTA
 */

import React, { useRef, useState } from 'react'
import { Button, NavBar } from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'

/* ═══════════════════════════════════════════
 * Inline SVG 图标
 * 图标库没有的图标用 inline SVG，线性风格、1.5px 描边
 * ═══════════════════════════════════════════ */

const NfcIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = '#fff',
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="5" width="12" height="14" rx="2" />
    <path d="M10 9v6M14 9l-4 6M14 9v6" />
    <path d="M3 8a5 5 0 0 0 0 8" />
    <path d="M1 6a8 8 0 0 0 0 12" />
  </svg>
)

const PhoneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#1677ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <path d="M12 18h.01" />
  </svg>
)

/* ═══════════════════════════════════════════
 * 主组件
 * ═══════════════════════════════════════════ */

const PaymentResult: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', position: 'relative' }}>

      {/* ──────────────────────────────────────
       * 品牌渐变蒙版
       * 参考: 750×802 = 49.4% 屏高
       * 渐变: #429fff(0%) → #1677ff(74%) → #f5f5f5(100%)
       * ────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '49.4vh',
          background: 'linear-gradient(to bottom, #429fff 0%, #1677ff 74%, #f5f5f5 100%)',
          zIndex: 0,
        }}
      />

      {/* ──────────────────────────────────────
       * 导航栏
       * 参考: 蓝头加高 176px @2x = 88px @1x
       * 左：返回箭头    右：「完成」文字按钮
       * ────────────────────────────────────── */}
      <NavBar
        backIcon={
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        }
        right={<span style={{ color: '#fff', fontSize: 16 }}>完成</span>}
        back={null}
        style={{
          '--height': '44px',
          '--border-bottom': 'none',
          color: '#fff',
          background: 'transparent',
          position: 'relative',
          zIndex: 1,
        } as React.CSSProperties}
      />

      {/* ══════════════════════════════════════
       * 第一幕 · 成功头部
       *
       * 紧凑布局：图标+文字同行 → 金额 → 商户+交易方式
       * 参考: Group 7 (y=179, 302×123) + 编组 14 (y=334, 662×92)
       *
       * [A] 替换支付信息：修改金额、商户名、交易方式
       * ══════════════════════════════════════ */}
      <div style={{ textAlign: 'center', padding: '8px 24px 24px', position: 'relative', zIndex: 1 }}>
        {/* 成功图标 + 文字（参考: 一行排列，圆圈描边+对勾） */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: '2px solid #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleFill style={{ fontSize: 14, color: '#fff' }} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>支付成功</span>
        </div>

        {/* 金额（参考: 品牌数字字体Ver2-Medium 96px @2x = 48pt, ¥ 符号 24pt） */}
        <div style={{ marginTop: 8 }}>
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: '#fff',
              fontFamily: 'DINAlternate, DINPro-Medium, tabular-nums, sans-serif',
              marginRight: 2,
            }}
          >
            ¥
          </span>
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'DINAlternate, DINPro-Medium, tabular-nums, sans-serif',
              letterSpacing: -1,
            }}
          >
            66.00
          </span>
        </div>
      </div>

      {/* 商户 + 交易方式（参考: rgba(255,255,255,0.85) 半透明白字） */}
      <div style={{ padding: '0 24px 16px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>示例商户</span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>¥ 66.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>交易方式</span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>余额宝</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
       * 第二幕 · 运营转化区
       *
       * 结果页是运营黄金位。标准组合：
       *   优惠券/红包 + 连接器 + 教育/推广卡片
       *
       * 参考: 编组 13 (y=458, 702×250, shadow rgba(88,123,140,0.08))
       * ══════════════════════════════════════ */}
      <div style={{ padding: '0 12px', position: 'relative', zIndex: 1 }}>

        {/* ─── [B] 支付有礼 · 优惠券卡片 ───
         * 暖色渐变背景 + 红色金额高亮 + 红色 CTA
         * 替换：修改券面金额、文案、CTA 行为
         */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fff 40%, #FFF5ED 70%, #FFE8D6 100%)',
            borderRadius: 12,
            padding: '12px 16px 10px',
            marginBottom: 0,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, color: '#333', marginBottom: 4 }}>
            支付有礼
          </div>
          <div style={{ textAlign: 'center', padding: '2px 16px 10px' }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#333' }}>
              送你 <span style={{ fontSize: 20, fontWeight: 800, color: '#FF4D4F' }}>3元</span> 轻触支付券
            </div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>下次试试轻触支付</div>
            <button
              style={{
                marginTop: 8,
                background: '#FF4D4F',
                color: '#fff',
                border: 'none',
                borderRadius: 18,
                padding: '5px 26px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              去领取
            </button>
          </div>
        </div>

        {/* ─── 挂牌连接器 ───
         * 两张卡之间的灰色竖条，暗示内容关联
         * 如果不需要关联，删除此区域并给上方卡片加 marginBottom: 12
         */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px', height: 16 }}>
          <div style={{ width: 8, height: 16, background: '#E8E8E8', borderRadius: '0 0 4px 4px' }} />
          <div style={{ width: 8, height: 16, background: '#E8E8E8', borderRadius: '0 0 4px 4px' }} />
        </div>

        {/* ─── [C] 教育/推广卡片 ───
         * 结构：Badge + 高亮标题 → 插图区 → 步骤流 → CTA
         *
         * Badge: 品牌蓝底白字胶囊，11px，标识卡片类型
         * 标题: 17px 加粗，关键词用 #1677ff 高亮
         * 插图: CSS 绘制的手机→箭头→蓝环（可替换为 GE 动画或视频）
         * 步骤: 水平 1→2→3，一行展示更易扫读
         * CTA: 全宽渐变按钮，口语化文案
         *
         * [D] 替换为视频：去掉插图 div，直接放 <video>
         * [E] 替换为 GE 动画：用 <canvas> + @galacean/effects
         * [F] 添加变体：用 variants 对象 + currentVariant state 控制
         */}
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          {/* Badge + 高亮标题 */}
          <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                background: '#1677ff',
                color: '#fff',
                fontSize: 11,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 10,
              }}
            >
              轻触支付
            </span>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>
              下次试试轻触支付，<span style={{ color: '#1677ff' }}>快人一步</span>
            </span>
          </div>

          {/* 插图区 — CSS 绘制（手机 → 箭头 → NFC 蓝环） */}
          <div style={{ padding: 16 }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #EBF5FF 0%, #D6E8FF 100%)',
                borderRadius: 12,
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '630/240',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {/* 手机设备（CSS 绘制） */}
                <div
                  style={{
                    width: 56,
                    height: 100,
                    background: '#1a1a1a',
                    borderRadius: 12,
                    position: 'relative',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 20,
                      height: 4,
                      background: '#333',
                      borderRadius: 2,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 4,
                      right: 4,
                      bottom: 8,
                      background: 'linear-gradient(180deg, #4A9FFF, #1677FF)',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PhoneIcon />
                  </div>
                </div>

                {/* 箭头流 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#1677ff' }}>
                  <span style={{ fontSize: 24 }}>→</span>
                  <span style={{ fontSize: 11, color: '#666', whiteSpace: 'nowrap' }}>靠近</span>
                </div>

                {/* NFC 蓝环（带光晕） */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1677FF, #4A9FFF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 8px rgba(22,119,255,0.15), 0 0 0 16px rgba(22,119,255,0.08)',
                  }}
                >
                  <NfcIcon size={32} color="#fff" />
                </div>
              </div>
            </div>
          </div>

          {/* 视频区域（默认隐藏，点击 CTA 后展开） */}
          <div style={{ padding: '0 16px', display: isPlaying ? 'block' : 'none' }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', background: '#000', marginBottom: 12 }}>
              <video
                ref={videoRef}
                src="/nfc-guide.mp4"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                playsInline
                controls
                onPlay={() => setIsPlaying(true)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </div>

          {/* 水平步骤流（1→2→3 一行展示） */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 16px 4px',
              gap: 0,
            }}
          >
            {[
              { num: 1, text: '解锁手机' },
              { num: 2, text: '靠近蓝环' },
              { num: 3, text: '支付完成' },
            ].map((step, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      background: '#1677ff',
                      color: '#fff',
                      borderRadius: '50%',
                      fontSize: 11,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </span>
                  <span style={{ fontSize: 13, color: '#333', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {step.text}
                  </span>
                </div>
                {i < 2 && (
                  <span style={{ color: '#ccc', margin: '0 8px', fontSize: 14 }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA — 全宽渐变按钮，口语化文案 */}
          <div style={{ padding: '12px 16px 16px' }}>
            <button
              onClick={handlePlayVideo}
              style={{
                width: '100%',
                height: 44,
                background: 'linear-gradient(135deg, #1677FF, #4A9FFF)',
                color: '#fff',
                border: 'none',
                borderRadius: 22,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: 0.5,
              }}
            >
              查看方法
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
       * 第三幕 · 行动收尾
       * 参考: 底部操作按钮-吸底 (y=1420, 750×204)
       * ══════════════════════════════════════ */}
      <div style={{ padding: '8px 12px 32px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            size="large"
            style={{
              width: 200,
              borderRadius: 22,
              height: 44,
              fontSize: 15,
              fontWeight: 500,
              color: '#1677ff',
              border: '1px solid #1677ff',
              background: '#fff',
            }}
          >
            完成
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentResult
