/**
 * Shared formatting helpers for channel monitor views (admin + user).
 *
 * Centralises:
 *  - status / provider label + badge class lookups
 *  - latency / availability / percent number formatting
 *  - dashboard-style helpers (HSL for availability, provider gradient, relative time)
 *
 * i18n keys live under `monitorCommon.*` so admin and user views share the
 * same translation source.
 */

import { useI18n } from 'vue-i18n'
import type { MonitorStatus, Provider } from '@/api/admin/channelMonitor'
import {
  PROVIDER_OPENAI,
  PROVIDER_ANTHROPIC,
  PROVIDER_GEMINI,
  STATUS_OPERATIONAL,
  STATUS_DEGRADED,
  STATUS_FAILED,
  STATUS_ERROR,
} from '@/constants/channelMonitor'

const NEUTRAL_BADGE = 'bg-gray-100 text-gray-800 dark:bg-dark-700 dark:text-gray-300'

/** Availability HSL hue multiplier: 0%=red(0) / 50%=yellow(60) / 100%=green(120). */
const HSL_HUE_PER_PERCENT = 1.2
const HSL_SATURATION = 72
const HSL_LIGHTNESS = 42

export interface AvailabilityRow {
  primary_status: MonitorStatus | ''
  availability_7d: number | null | undefined
}

export function useChannelMonitorFormat() {
  const { t } = useI18n()

  function statusLabel(s: MonitorStatus | ''): string {
    if (!s) return t('monitorCommon.status.unknown')
    return t(`monitorCommon.status.${s}`)
  }

  function statusBadgeClass(s: MonitorStatus | ''): string {
    switch (s) {
      case STATUS_OPERATIONAL:
        return 'bg-[#88c0d0]/8 text-[#88c0d0]/80 dark:bg-[#88c0d0]/12 dark:text-[#88c0d0]'
      case STATUS_DEGRADED:
        return 'bg-[#d08770]/8 text-[#d08770]/80 dark:bg-[#d08770]/12 dark:text-[#d08770]'
      case STATUS_FAILED:
        return 'bg-[#bf616a]/8 text-[#bf616a]/80 dark:bg-[#bf616a]/12 dark:text-[#bf616a]'
      case STATUS_ERROR:
      default:
        return NEUTRAL_BADGE
    }
  }

  function providerLabel(p: Provider | string): string {
    if (p === PROVIDER_OPENAI || p === PROVIDER_ANTHROPIC || p === PROVIDER_GEMINI) {
      return t(`monitorCommon.providers.${p}`)
    }
    return p || '-'
  }

  function providerBadgeClass(p: Provider | string): string {
    switch (p) {
      case PROVIDER_OPENAI:
        return 'bg-[#88c0d0]/8 text-[#88c0d0]/80 dark:bg-[#88c0d0]/12 dark:text-[#88c0d0]'
      case PROVIDER_ANTHROPIC:
        return 'bg-[#d08770]/8 text-[#d08770]/80 dark:bg-[#d08770]/12 dark:text-[#d08770]'
      case PROVIDER_GEMINI:
        return 'bg-[#81a1c1]/8 text-[#81a1c1]/80 dark:bg-[#81a1c1]/12 dark:text-[#81a1c1]'
      default:
        return NEUTRAL_BADGE
    }
  }

  /**
   * Tailwind class for a provider radio-button-style picker (active/inactive state).
   * Reuses the same emerald/orange/sky palette as providerBadgeClass to keep
   * visual semantics consistent across badges and pickers.
   */
  function providerPickerClass(p: Provider | string, active: boolean): string {
    switch (p) {
      case PROVIDER_OPENAI:
        return active
          ? 'border-[#88c0d0]/20 bg-emerald-50 text-[#88c0d0]/80 dark:bg-[#88c0d0]/12 dark:text-[#88c0d0] dark:border-[#88c0d0]/25'
          : 'border-gray-200 bg-white text-gray-600 hover:border-[#88c0d0]/20 hover:text-emerald-700 dark:border-dark-700 dark:bg-dark-800 dark:text-gray-400 dark:hover:border-[#88c0d0]/20'
      case PROVIDER_ANTHROPIC:
        return active
          ? 'border-[#d08770]/20 bg-orange-50 text-[#d08770]/80 dark:bg-[#d08770]/12 dark:text-[#d08770] dark:border-[#d08770]/25'
          : 'border-gray-200 bg-white text-gray-600 hover:border-[#d08770]/20 hover:text-orange-700 dark:border-dark-700 dark:bg-dark-800 dark:text-gray-400 dark:hover:border-[#d08770]/20'
      case PROVIDER_GEMINI:
        return active
          ? 'border-[#81a1c1]/20 bg-sky-50 text-[#81a1c1]/80 dark:bg-[#81a1c1]/12 dark:text-[#81a1c1] dark:border-[#81a1c1]/25'
          : 'border-gray-200 bg-white text-gray-600 hover:border-[#81a1c1]/20 hover:text-sky-700 dark:border-dark-700 dark:bg-dark-800 dark:text-gray-400 dark:hover:border-[#81a1c1]/20'
      default:
        return active
          ? 'border-gray-400 bg-gray-50 text-gray-700 dark:border-dark-500 dark:bg-dark-700 dark:text-gray-200'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-dark-700 dark:bg-dark-800 dark:text-gray-400'
    }
  }

  function formatLatency(ms: number | null | undefined): string {
    if (ms == null) return t('monitorCommon.latencyEmpty')
    return String(Math.round(ms))
  }

  function formatPercent(v: number | null | undefined): string {
    if (v == null || Number.isNaN(v)) return '-'
    return `${v.toFixed(2)}%`
  }

  function formatAvailability(row: AvailabilityRow): string {
    if (!row.primary_status) return '-'
    return formatPercent(row.availability_7d)
  }

  function formatRelativeTime(iso: string | null | undefined): string {
    if (!iso) return t('monitorCommon.latencyEmpty')
    const ts = Date.parse(iso)
    if (Number.isNaN(ts)) return t('monitorCommon.latencyEmpty')
    const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000))
    if (diffSec < 60) return t('monitorCommon.relativeSecondsAgo', { n: diffSec })
    const diffMin = Math.floor(diffSec / 60)
    if (diffMin < 60) return t('monitorCommon.relativeMinutesAgo', { n: diffMin })
    const diffHour = Math.floor(diffMin / 60)
    if (diffHour < 24) return t('monitorCommon.relativeHoursAgo', { n: diffHour })
    const diffDay = Math.floor(diffHour / 24)
    return t('monitorCommon.relativeDaysAgo', { n: diffDay })
  }

  return {
    statusLabel,
    statusBadgeClass,
    providerLabel,
    providerBadgeClass,
    providerPickerClass,
    formatLatency,
    formatPercent,
    formatAvailability,
    formatRelativeTime,
  }
}

/**
 * Map availability percent to an HSL colour (red -> yellow -> green).
 * Returns undefined for null/NaN so callers can fall back to a neutral colour.
 */
export function hslForPct(pct: number | null | undefined): string | undefined {
  if (pct === null || pct === undefined || Number.isNaN(pct)) return undefined
  const clamped = Math.max(0, Math.min(100, pct))
  const hue = clamped * HSL_HUE_PER_PERCENT
  return `hsl(${hue} ${HSL_SATURATION}% ${HSL_LIGHTNESS}%)`
}

/**
 * Tailwind gradient class for the provider icon tile background.
 */
export function providerGradient(provider: string): string {
  switch (provider) {
    case PROVIDER_OPENAI:
      return 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-500/20'
    case PROVIDER_ANTHROPIC:
      return 'bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-500/10 dark:to-amber-500/20'
    case PROVIDER_GEMINI:
      return 'bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-sky-500/10 dark:to-indigo-500/20'
    default:
      return 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600'
  }
}
