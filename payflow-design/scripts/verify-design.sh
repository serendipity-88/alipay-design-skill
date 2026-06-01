#!/bin/bash
# 设计质量验证脚本
# 用法: bash scripts/verify-design.sh <file.tsx|file.html>
#
# P0 = 阻塞交付，必须通过
# P1 = 质量检查，强烈建议修复
# P2 = 建议项，可选

set -euo pipefail

FILE="${1:?用法: verify-design.sh <文件路径>}"
ERRORS=0
WARNINGS=0

if [ ! -f "$FILE" ]; then
  printf "\033[31m✗ 文件不存在: %s\033[0m\n" "$FILE"
  exit 2
fi

red()    { printf "\033[31m✗ %s\033[0m\n" "$1"; }
yellow() { printf "\033[33m⚠ %s\033[0m\n" "$1"; }
green()  { printf "\033[32m✓ %s\033[0m\n" "$1"; }
header() { printf "\n\033[1m── %s ──\033[0m\n" "$1"; }
count_fixed() {
  local pattern="$1"
  local count
  count=$(grep -F -c "$pattern" "$FILE" 2>/dev/null || true)
  printf "%s" "${count:-0}" | tr -d '[:space:]'
}
count_regex() {
  local pattern="$1"
  local count
  count=$(grep -cE "$pattern" "$FILE" 2>/dev/null || true)
  printf "%s" "${count:-0}" | tr -d '[:space:]'
}

# ════════════════════════════════════════
header "P0 阻塞检查"
# ════════════════════════════════════════

# 1. 无硬编码 hex 色值（排除 CSS 变量定义行和注释行）
HARDCODED_HEX=$(grep -nE '#[0-9a-fA-F]{3,8}' "$FILE" \
  | grep -vE '(--|var\(|//|/\*|\*|comment|token|Brand|brand)' \
  | grep -vE '(:root|--color|--sp|--shadow|--radius)' \
  || true)
if [ -n "$HARDCODED_HEX" ]; then
  red "P0: 疑似硬编码色值（应使用 CSS 变量或 Token）"
  echo "$HARDCODED_HEX" | head -5
  ERRORS=$((ERRORS + 1))
else
  green "P0: 无硬编码色值"
fi

# 2. 无 emoji 字符
EMOJI=$(perl -CS -ne 'print "$.:$_" if /[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]/' "$FILE" 2>/dev/null || true)
if [ -n "$EMOJI" ]; then
  red "P0: 发现 emoji 字符（应使用图标组件或 inline SVG）"
  echo "$EMOJI" | head -3
  ERRORS=$((ERRORS + 1))
else
  green "P0: 零 emoji"
fi

# 3. 无 inline style 对象 (React)
INLINE_STYLE=$(perl -0ne '$c=()=/style\s*=\s*\{\s*\{/g; print $c' "$FILE" 2>/dev/null || printf "0")
INLINE_STYLE=$(printf "%s" "${INLINE_STYLE:-0}" | tr -d '[:space:]')
if [ "$INLINE_STYLE" -gt 0 ]; then
  red "P0: 发现 ${INLINE_STYLE} 处 inline style={{}}（应用 CSS Modules / className）"
  ERRORS=$((ERRORS + 1))
else
  green "P0: 零 inline style 对象"
fi

# 4. 平台单位检查
if echo "$FILE" | grep -qE '\.(axml|acss)$'; then
  PX_COUNT=$(count_regex '[0-9]+px')
  if [ "$PX_COUNT" -gt 0 ]; then
    red "P0: 小程序文件使用了 px 单位（应使用 rpx）"
    ERRORS=$((ERRORS + 1))
  else
    green "P0: 小程序单位正确 (rpx)"
  fi
fi

# 5. 品牌蓝色值正确（不是旧版 #1890ff）
OLD_BLUE=$(count_regex '1890ff|1890FF')
if [ "$OLD_BLUE" -gt 0 ]; then
  red "P0: 使用了旧版品牌蓝 #1890ff（应为 #1677FF）"
  ERRORS=$((ERRORS + 1))
else
  green "P0: 品牌蓝色值正确"
fi

# 6. Import 路径不混用平台
if grep -qE "from ['\"]antd-mobile['\"]" "$FILE" 2>/dev/null; then
  MIXED=$(grep -cE "from ['\"]antd['\"]" "$FILE" 2>/dev/null || true)
  MIXED=$(printf "%s" "${MIXED:-0}" | tr -d '[:space:]')
  if [ "$MIXED" -gt 0 ]; then
    red "P0: 混用 antd-mobile 和 antd（不同平台包不能混用）"
    ERRORS=$((ERRORS + 1))
  else
    green "P0: Import 路径无混用"
  fi
fi

# ════════════════════════════════════════
header "P1 质量检查"
# ════════════════════════════════════════

# 7. 非标间距值
NON_STANDARD=$(grep -oE '[0-9]+px' "$FILE" 2>/dev/null \
  | grep -vE '^(0|4|8|12|16|20|24|32|36|40|44|48|52|56|60|64|72|80|88|96|100|120|140|160|180|200|220|240|260|280|300|340|375|812)px$' \
  | sort -u || true)
if [ -n "$NON_STANDARD" ]; then
  yellow "P1: 疑似非 4px 系统间距值"
  echo "  $NON_STANDARD"
  WARNINGS=$((WARNINGS + 1))
else
  green "P1: 间距值符合 4px 系统"
fi

# 8. 纯黑阴影
BLACK_SHADOW=$(grep -nE 'rgba\(0,\s*0,\s*0' "$FILE" 2>/dev/null || true)
if [ -n "$BLACK_SHADOW" ]; then
  yellow "P1: 使用了纯黑阴影（应使用冷灰蓝 rgba(90,110,149,x)）"
  echo "$BLACK_SHADOW" | head -3
  WARNINGS=$((WARNINGS + 1))
else
  green "P1: 阴影色值正确"
fi

# 9. border 描边做卡片
CARD_BORDER=$(grep -nE 'border:\s*1px solid' "$FILE" 2>/dev/null | grep -v 'dashed' || true)
if [ -n "$CARD_BORDER" ]; then
  yellow "P1: 使用 border 描边（卡片应用 box-shadow 区分层级）"
  echo "$CARD_BORDER" | head -3
  WARNINGS=$((WARNINGS + 1))
else
  green "P1: 卡片用阴影而非描边"
fi

# 10. 三态检查（数据页面）
if grep -qE 'fetch|request|loadMore|useEffect' "$FILE" 2>/dev/null; then
  HAS_LOADING=$(count_regex 'loading|Loading|skeleton|Skeleton|DotLoading')
  HAS_EMPTY=$(count_regex 'empty|Empty|ErrorBlock|暂无')
  HAS_ERROR=$(count_regex 'error|Error|失败|重试')
  if grep -qE '<ProTable|ProTable<' "$FILE" 2>/dev/null; then
    # ProTable's request mode provides built-in loading and empty states.
    [ "$HAS_LOADING" -eq 0 ] && HAS_LOADING=1
    [ "$HAS_EMPTY" -eq 0 ] && HAS_EMPTY=1
  fi
  if [ "$HAS_LOADING" -eq 0 ] || [ "$HAS_EMPTY" -eq 0 ] || [ "$HAS_ERROR" -eq 0 ]; then
    yellow "P1: 数据页面缺少三态处理 (loading=$HAS_LOADING empty=$HAS_EMPTY error=$HAS_ERROR)"
    WARNINGS=$((WARNINGS + 1))
  else
    green "P1: 数据页面有三态处理"
  fi
fi

# ════════════════════════════════════════
header "P2 建议"
# ════════════════════════════════════════

# 11. 语义标签比例
TOTAL_TAGS=$(count_regex '<(div|span|section|header|main|nav|footer|article|aside)')
SEMANTIC_TAGS=$(count_regex '<(section|header|main|nav|footer|article|aside)')
if [ "$TOTAL_TAGS" -gt 0 ]; then
  RATIO=$((SEMANTIC_TAGS * 100 / TOTAL_TAGS))
  if [ "$RATIO" -lt 20 ]; then
    yellow "P2: 语义标签占比 ${RATIO}%（建议 > 30%）"
    WARNINGS=$((WARNINGS + 1))
  else
    green "P2: 语义标签占比 ${RATIO}%"
  fi
fi

# 12. 文件行数
LINE_COUNT=$(wc -l < "$FILE" | tr -d ' ')
if [ "$LINE_COUNT" -gt 300 ]; then
  yellow "P2: 文件 ${LINE_COUNT} 行（建议拆分子组件，单文件 ≤ 300 行）"
  WARNINGS=$((WARNINGS + 1))
else
  green "P2: 文件 ${LINE_COUNT} 行，大小合理"
fi

# ════════════════════════════════════════
header "结果"
# ════════════════════════════════════════

if [ "$ERRORS" -gt 0 ]; then
  red "❌ ${ERRORS} 个 P0 错误，${WARNINGS} 个警告 — 需修复后交付"
  exit 1
elif [ "$WARNINGS" -gt 0 ]; then
  yellow "⚠ ${WARNINGS} 个警告 — 建议修复"
  exit 0
else
  green "✅ 全部通过"
  exit 0
fi
