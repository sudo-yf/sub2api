/**
 * Centralized platform color definitions.
 *
 * All components that need platform-specific styling should import from here
 * instead of defining their own color mappings.
 */

export type Platform = 'anthropic' | 'openai' | 'antigravity' | 'gemini'

// ── Badge (bg + text + border, for inline badges with border) ───────
const BADGE: Record<Platform, string> = {
  anthropic: 'bg-[#d08770]/10 text-[#d08770]/80 border-[#d08770]/20 dark:text-[#d08770]',
  openai: 'bg-[#a3be8c]/10 text-[#a3be8c]/80 border-[#a3be8c]/20 dark:text-[#a3be8c]',
  antigravity: 'bg-[#b48ead]/10 text-[#b48ead]/80 border-[#b48ead]/20 dark:text-[#b48ead]',
  gemini: 'bg-[#81a1c1]/10 text-[#81a1c1]/80 border-[#81a1c1]/20 dark:text-[#81a1c1]',
}
const BADGE_DEFAULT = 'bg-slate-500/10 text-slate-600 border-slate-500/30 dark:text-slate-400'

// ── Light badge (softer bg, no border) ──────────────────────────────
const BADGE_LIGHT: Record<Platform, string> = {
  anthropic: 'bg-[#d08770]/10 text-[#d08770]/80 dark:bg-[#d08770]/12 dark:text-[#d08770]',
  openai: 'bg-[#a3be8c]/10 text-[#a3be8c]/80 dark:bg-[#a3be8c]/12 dark:text-[#a3be8c]',
  antigravity: 'bg-[#b48ead]/10 text-[#b48ead]/80 dark:bg-[#b48ead]/12 dark:text-[#b48ead]',
  gemini: 'bg-[#81a1c1]/10 text-[#81a1c1]/80 dark:bg-[#81a1c1]/12 dark:text-[#81a1c1]',
}

// ── Border ──────────────────────────────────────────────────────────
const BORDER: Record<Platform, string> = {
  anthropic: 'border-[#d08770]/20 dark:border-[#d08770]/25',
  openai: 'border-[#a3be8c]/20 dark:border-[#a3be8c]/25',
  antigravity: 'border-[#b48ead]/20 dark:border-[#b48ead]/25',
  gemini: 'border-[#81a1c1]/20 dark:border-[#81a1c1]/25',
}
const BORDER_DEFAULT = 'border-gray-200 dark:border-dark-700'

// ── Accent bar (gradient) ───────────────────────────────────────────
const ACCENT_BAR: Record<Platform, string> = {
  anthropic: 'bg-gradient-to-r from-orange-400 to-orange-500',
  openai: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
  antigravity: 'bg-gradient-to-r from-purple-400 to-purple-500',
  gemini: 'bg-gradient-to-r from-blue-400 to-blue-500',
}
const ACCENT_BAR_DEFAULT = 'bg-gradient-to-r from-primary-400 to-primary-500'

// ── Text (price, icon) ─────────────────────────────────────────────
const TEXT: Record<Platform, string> = {
  anthropic: 'text-[#d08770]/80 dark:text-[#d08770]',
  openai: 'text-[#88c0d0]/80 dark:text-[#88c0d0]',
  antigravity: 'text-[#b48ead]/80 dark:text-[#b48ead]',
  gemini: 'text-[#81a1c1]/80 dark:text-[#81a1c1]',
}
const TEXT_DEFAULT = 'text-primary-600 dark:text-primary-400'

// ── Icon (check mark etc.) ──────────────────────────────────────────
const ICON: Record<Platform, string> = {
  anthropic: 'text-[#d08770]/80 dark:text-[#d08770]',
  openai: 'text-[#88c0d0]/80 dark:text-[#88c0d0]',
  antigravity: 'text-[#b48ead]/80 dark:text-[#b48ead]',
  gemini: 'text-[#81a1c1]/80 dark:text-[#81a1c1]',
}
const ICON_DEFAULT = 'text-primary-500 dark:text-primary-400'

// ── Button (solid bg) ───────────────────────────────────────────────
const BUTTON: Record<Platform, string> = {
  anthropic: 'bg-orange-500 text-white hover:bg-[#d08770]/15 active:bg-orange-700 dark:bg-[#d08770]/12 dark:hover:bg-[#d08770]/15',
  openai: 'bg-green-600 text-white hover:bg-[#a3be8c]/15 active:bg-green-800 dark:bg-[#a3be8c]/12 dark:hover:bg-[#a3be8c]/15',
  antigravity: 'bg-purple-500 text-white hover:bg-[#b48ead]/15 active:bg-purple-700 dark:bg-[#b48ead]/12 dark:hover:bg-[#b48ead]/15',
  gemini: 'bg-blue-500 text-white hover:bg-[#81a1c1]/15 active:bg-blue-700 dark:bg-[#81a1c1]/12 dark:hover:bg-[#81a1c1]/15',
}
const BUTTON_DEFAULT = 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500'

// ── Discount badge ──────────────────────────────────────────────────
const DISCOUNT: Record<Platform, string> = {
  anthropic: 'bg-[#d08770]/8 text-[#d08770]/80 dark:bg-[#d08770]/12 dark:text-[#d08770]',
  openai: 'bg-[#88c0d0]/8 text-[#88c0d0]/80 dark:bg-[#88c0d0]/12 dark:text-[#88c0d0]',
  antigravity: 'bg-[#b48ead]/8 text-[#b48ead]/80 dark:bg-[#b48ead]/12 dark:text-[#b48ead]',
  gemini: 'bg-[#81a1c1]/8 text-[#81a1c1]/80 dark:bg-[#81a1c1]/12 dark:text-[#81a1c1]',
}
const DISCOUNT_DEFAULT = 'bg-[#bf616a]/8 text-[#bf616a]/80 dark:bg-[#bf616a]/12 dark:text-[#bf616a]'

// ── Header gradient (subscription confirm) ─────────────────────────
const GRADIENT: Record<Platform, string> = {
  anthropic: 'from-orange-500 to-orange-600',
  openai: 'from-emerald-500 to-emerald-600',
  antigravity: 'from-purple-500 to-purple-600',
  gemini: 'from-blue-500 to-blue-600',
}
const GRADIENT_DEFAULT = 'from-primary-500 to-primary-600'

// ── Header text (light text on gradient bg) ────────────────────────
const GRADIENT_TEXT: Record<Platform, string> = {
  anthropic: 'text-[#d08770]/80',
  openai: 'text-[#88c0d0]/80',
  antigravity: 'text-[#b48ead]/80',
  gemini: 'text-[#81a1c1]/80',
}
const GRADIENT_TEXT_DEFAULT = 'text-primary-100'

const GRADIENT_SUBTEXT: Record<Platform, string> = {
  anthropic: 'text-[#d08770]/80',
  openai: 'text-[#88c0d0]/80',
  antigravity: 'text-[#b48ead]/80',
  gemini: 'text-[#81a1c1]/80',
}
const GRADIENT_SUBTEXT_DEFAULT = 'text-primary-200'

// ── Public API ──────────────────────────────────────────────────────

function isPlatform(p: string): p is Platform {
  return p === 'anthropic' || p === 'openai' || p === 'antigravity' || p === 'gemini'
}

export function platformBadgeClass(p: string): string {
  return isPlatform(p) ? BADGE[p] : BADGE_DEFAULT
}

export function platformBadgeLightClass(p: string): string {
  return isPlatform(p) ? BADGE_LIGHT[p] : BADGE_DEFAULT
}

export function platformBorderClass(p: string): string {
  return isPlatform(p) ? BORDER[p] : BORDER_DEFAULT
}

export function platformAccentBarClass(p: string): string {
  return isPlatform(p) ? ACCENT_BAR[p] : ACCENT_BAR_DEFAULT
}

export function platformTextClass(p: string): string {
  return isPlatform(p) ? TEXT[p] : TEXT_DEFAULT
}

export function platformIconClass(p: string): string {
  return isPlatform(p) ? ICON[p] : ICON_DEFAULT
}

export function platformButtonClass(p: string): string {
  return isPlatform(p) ? BUTTON[p] : BUTTON_DEFAULT
}

export function platformDiscountClass(p: string): string {
  return isPlatform(p) ? DISCOUNT[p] : DISCOUNT_DEFAULT
}

export function platformGradientClass(p: string): string {
  return isPlatform(p) ? GRADIENT[p] : GRADIENT_DEFAULT
}

export function platformGradientTextClass(p: string): string {
  return isPlatform(p) ? GRADIENT_TEXT[p] : GRADIENT_TEXT_DEFAULT
}

export function platformGradientSubtextClass(p: string): string {
  return isPlatform(p) ? GRADIENT_SUBTEXT[p] : GRADIENT_SUBTEXT_DEFAULT
}

export function platformLabel(p: string): string {
  switch (p) {
    case 'anthropic': return 'Anthropic'
    case 'openai': return 'OpenAI'
    case 'antigravity': return 'Antigravity'
    case 'gemini': return 'Gemini'
    default: return p || 'API'
  }
}
