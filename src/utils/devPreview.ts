import type {
  ApiKey,
  BasePaginationResponse,
  CurrentUserResponse,
  PublicSettings,
  TrendDataPoint,
  ModelStat,
  UserAnnouncement,
  UserSubscription,
  UsageLog,
  UsageStatsResponse,
  User
} from '@/types'
import type { UserAvailableChannel } from '@/api/channels'

const previewUser: User = {
  id: 999001,
  username: 'operator',
  email: 'operator@preview.local',
  role: 'user',
  balance: 124.5,
  concurrency: 8,
  status: 'active',
  allowed_groups: null,
  balance_notify_enabled: true,
  balance_notify_threshold: 20,
  balance_notify_extra_emails: [],
  created_at: '2026-05-23T12:00:00Z',
  updated_at: '2026-05-23T12:00:00Z'
}

const previewTrend: TrendDataPoint[] = [
  { date: '2026-05-17', requests: 1780, input_tokens: 120000, output_tokens: 240000, cache_creation_tokens: 12000, cache_read_tokens: 68000, total_tokens: 440000, cost: 1.11, actual_cost: 0.83 },
  { date: '2026-05-18', requests: 1920, input_tokens: 180000, output_tokens: 320000, cache_creation_tokens: 9000, cache_read_tokens: 92000, total_tokens: 601000, cost: 1.42, actual_cost: 1.02 },
  { date: '2026-05-19', requests: 1860, input_tokens: 160000, output_tokens: 300000, cache_creation_tokens: 16000, cache_read_tokens: 88000, total_tokens: 564000, cost: 1.37, actual_cost: 0.98 },
  { date: '2026-05-20', requests: 2410, input_tokens: 260000, output_tokens: 540000, cache_creation_tokens: 12000, cache_read_tokens: 124000, total_tokens: 936000, cost: 2.01, actual_cost: 1.48 },
  { date: '2026-05-21', requests: 2140, input_tokens: 210000, output_tokens: 410000, cache_creation_tokens: 15000, cache_read_tokens: 112000, total_tokens: 747000, cost: 1.76, actual_cost: 1.24 },
  { date: '2026-05-22', requests: 2680, input_tokens: 280000, output_tokens: 620000, cache_creation_tokens: 18000, cache_read_tokens: 138000, total_tokens: 1056000, cost: 2.36, actual_cost: 1.68 },
  { date: '2026-05-23', requests: 2410, input_tokens: 230000, output_tokens: 480000, cache_creation_tokens: 14000, cache_read_tokens: 126000, total_tokens: 850000, cost: 1.94, actual_cost: 1.42 }
]

const previewModels: ModelStat[] = [
  { model: 'gpt-4o', requests: 8842, total_tokens: 720000, input_tokens: 248000, output_tokens: 472000, cache_creation_tokens: 12000, cache_read_tokens: 58000, cost: 2.1, actual_cost: 1.54, account_cost: 1.12 },
  { model: 'claude-3.5-sonnet', requests: 3160, total_tokens: 340000, input_tokens: 122000, output_tokens: 218000, cache_creation_tokens: 8000, cache_read_tokens: 42000, cost: 1.18, actual_cost: 0.86, account_cost: 0.64 },
  { model: 'gemini-1.5-pro', requests: 2210, total_tokens: 160000, input_tokens: 76000, output_tokens: 84000, cache_creation_tokens: 4000, cache_read_tokens: 22000, cost: 0.7, actual_cost: 0.51, account_cost: 0.38 }
]

const previewUsageLogs: UsageLog[] = [
  {
    id: 1,
    user_id: 999001,
    api_key_id: 11,
    account_id: null,
    request_id: 'req_preview_1',
    api_key: { id: 11, name: 'Prod-Main-App' } as any,
    model: 'gpt-4o-2024-08-06',
    inbound_endpoint: '/v1/chat/completions',
    upstream_endpoint: 'https://api.openai.com/v1/chat/completions',
    group_id: 101,
    subscription_id: null,
    input_tokens: 1240,
    output_tokens: 0,
    cache_creation_tokens: 0,
    cache_read_tokens: 0,
    cache_creation_5m_tokens: 0,
    cache_creation_1h_tokens: 0,
    input_cost: 0.0615,
    output_cost: 0,
    cache_creation_cost: 0,
    cache_read_cost: 0,
    total_cost: 0.0615,
    actual_cost: 0.045,
    rate_multiplier: 0.73,
    billing_type: 1,
    stream: true,
    duration_ms: 430,
    first_token_ms: 182,
    image_count: 0,
    image_size: null,
    image_input_size: null,
    image_output_size: null,
    image_size_source: null,
    image_size_breakdown: null,
    user_agent: 'Codex CLI Preview',
    cache_ttl_overridden: false,
    billing_mode: 'token',
    service_tier: 'default',
    created_at: '2026-05-23T14:21:48Z',
    reasoning_effort: 'low'
  },
  {
    id: 2,
    user_id: 999001,
    api_key_id: 12,
    account_id: null,
    request_id: 'req_preview_2',
    api_key: { id: 12, name: 'Plugin-Test-Env' } as any,
    model: 'claude-3-5-sonnet',
    inbound_endpoint: '/v1/messages',
    upstream_endpoint: 'https://api.anthropic.com/v1/messages',
    group_id: 102,
    subscription_id: null,
    input_tokens: 842,
    output_tokens: 0,
    cache_creation_tokens: 64,
    cache_read_tokens: 320,
    cache_creation_5m_tokens: 64,
    cache_creation_1h_tokens: 0,
    input_cost: 0.0096,
    output_cost: 0.0032,
    cache_creation_cost: 0.001,
    cache_read_cost: 0.0004,
    total_cost: 0.0128,
    actual_cost: 0.0093,
    rate_multiplier: 0.73,
    billing_type: 1,
    stream: false,
    duration_ms: 510,
    first_token_ms: 228,
    image_count: 0,
    image_size: null,
    image_input_size: null,
    image_output_size: null,
    image_size_source: null,
    image_size_breakdown: null,
    user_agent: 'Codex CLI Preview',
    cache_ttl_overridden: false,
    billing_mode: 'token',
    service_tier: 'default',
    created_at: '2026-05-23T14:19:31Z',
    reasoning_effort: 'medium'
  },
  {
    id: 3,
    user_id: 999001,
    api_key_id: 13,
    account_id: null,
    request_id: 'req_preview_3',
    api_key: { id: 13, name: 'Gateway-Edge' } as any,
    model: 'gemini-1.5-pro',
    inbound_endpoint: '/v1/chat/completions',
    upstream_endpoint: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    group_id: 103,
    subscription_id: null,
    input_tokens: 13190,
    output_tokens: 0,
    cache_creation_tokens: 0,
    cache_read_tokens: 410,
    cache_creation_5m_tokens: 0,
    cache_creation_1h_tokens: 0,
    input_cost: 0.01,
    output_cost: 0.0022,
    cache_creation_cost: 0,
    cache_read_cost: 0.0002,
    total_cost: 0.0122,
    actual_cost: 0.0088,
    rate_multiplier: 0.72,
    billing_type: 1,
    stream: true,
    duration_ms: 680,
    first_token_ms: 301,
    image_count: 0,
    image_size: null,
    image_input_size: null,
    image_output_size: null,
    image_size_source: null,
    image_size_breakdown: null,
    user_agent: 'Codex CLI Preview',
    cache_ttl_overridden: false,
    billing_mode: 'token',
    service_tier: 'default',
    created_at: '2026-05-23T14:12:45Z',
    reasoning_effort: 'low'
  }
]

const previewKeys: ApiKey[] = [
  {
    id: 11,
    user_id: 999001,
    name: 'Prod-Main-App',
    key: 'relay_preview_key_prod_main_7c',
    group_id: 101,
    group: { id: 101, name: 'Engineering', platform: 'openai', subscription_type: 'standard', rate_multiplier: 0.73 } as any,
    quota: 10,
    quota_used: 4.208,
    status: 'active',
    rate_limit_5h: 50,
    rate_limit_1d: 100,
    rate_limit_7d: 250,
    usage_5h: 18,
    usage_1d: 42,
    usage_7d: 120,
    last_used_at: '2026-05-23T14:21:48Z',
    created_at: '2026-05-20T09:00:00Z',
    expires_at: '2026-12-01T00:00:00Z',
    ip_whitelist: ['127.0.0.1'],
    ip_blacklist: [],
    reset_5h_at: '2026-05-23T17:00:00Z',
    reset_1d_at: '2026-05-24T00:00:00Z',
    reset_7d_at: '2026-05-30T00:00:00Z',
    updated_at: '2026-05-23T12:00:00Z',
    window_5h_start: '2026-05-23T12:00:00Z',
    window_1d_start: '2026-05-23T00:00:00Z',
    window_7d_start: '2026-05-17T00:00:00Z'
  },
  {
    id: 12,
    user_id: 999001,
    name: 'Plugin-Test-Env',
    key: 'relay_preview_key_plugin_test_8p',
    group_id: 102,
    group: { id: 102, name: 'On-TEAM', platform: 'anthropic', subscription_type: 'standard', rate_multiplier: 0.78 } as any,
    quota: 5,
    quota_used: 0.839,
    status: 'active',
    rate_limit_5h: 10,
    rate_limit_1d: 15,
    rate_limit_7d: 30,
    usage_5h: 2,
    usage_1d: 5,
    usage_7d: 9,
    last_used_at: '2026-05-23T13:20:00Z',
    created_at: '2026-05-18T09:00:00Z',
    expires_at: null,
    ip_whitelist: [],
    ip_blacklist: [],
    reset_5h_at: '2026-05-23T17:00:00Z',
    reset_1d_at: '2026-05-24T00:00:00Z',
    reset_7d_at: '2026-05-30T00:00:00Z',
    updated_at: '2026-05-23T12:00:00Z',
    window_5h_start: '2026-05-23T12:00:00Z',
    window_1d_start: '2026-05-23T00:00:00Z',
    window_7d_start: '2026-05-17T00:00:00Z'
  },
  {
    id: 13,
    user_id: 999001,
    name: 'Gateway-Edge',
    key: 'relay_preview_key_gateway_edge_1f',
    group_id: 103,
    group: { id: 103, name: 'Gemini', platform: 'gemini', subscription_type: 'standard', rate_multiplier: 0.81 } as any,
    quota: 0,
    quota_used: 0,
    status: 'quota_exhausted',
    rate_limit_5h: 0,
    rate_limit_1d: 0,
    rate_limit_7d: 0,
    usage_5h: 0,
    usage_1d: 0,
    usage_7d: 0,
    last_used_at: '2026-05-23T12:12:00Z',
    created_at: '2026-05-16T09:00:00Z',
    expires_at: '2026-07-01T00:00:00Z',
    ip_whitelist: [],
    ip_blacklist: [],
    reset_5h_at: null,
    reset_1d_at: null,
    reset_7d_at: null,
    updated_at: '2026-05-23T12:00:00Z',
    window_5h_start: null,
    window_1d_start: null,
    window_7d_start: null
  }
]

const previewChannels: UserAvailableChannel[] = [
  {
    name: 'OpenAI Relay',
    description: 'Primary low-latency route for chat and reasoning traffic.',
    platforms: [
      {
        platform: 'openai',
        groups: [
          { id: 101, name: 'Engineering', platform: 'openai', subscription_type: 'standard', rate_multiplier: 0.73, is_exclusive: true } as any,
          { id: 104, name: 'Public', platform: 'openai', subscription_type: 'standard', rate_multiplier: 1, is_exclusive: false } as any
        ],
        supported_models: [
          { name: 'gpt-4o', pricing: [], platform: 'openai' } as any,
          { name: 'gpt-4.1-mini', pricing: [], platform: 'openai' } as any
        ]
      }
    ]
  } as any,
  {
    name: 'Anthropic Relay',
    description: 'High-context lane tuned for coding and agentic usage.',
    platforms: [
      {
        platform: 'anthropic',
        groups: [
          { id: 102, name: 'On-TEAM', platform: 'anthropic', subscription_type: 'standard', rate_multiplier: 0.78, is_exclusive: true } as any
        ],
        supported_models: [
          { name: 'claude-3.5-sonnet', pricing: [], platform: 'anthropic' } as any,
          { name: 'claude-3-opus', pricing: [], platform: 'anthropic' } as any
        ]
      }
    ]
  } as any
]

const previewPublicSettings: PublicSettings = {
  registration_enabled: true,
  email_verify_enabled: false,
  force_email_on_third_party_signup: false,
  registration_email_suffix_whitelist: [],
  promo_code_enabled: true,
  password_reset_enabled: true,
  invitation_code_enabled: false,
  turnstile_enabled: false,
  turnstile_site_key: '',
  site_name: 'CCF',
  site_logo: '/logo.png',
  site_subtitle: 'Campus · Care · Future',
  api_base_url: 'https://api.relay-gateway.io/v1',
  contact_info: 'support@preview.local',
  doc_url: 'https://github.com/Wei-Shaw/sub2api',
  home_content: '',
  hide_ccs_import_button: false,
  payment_enabled: true,
  risk_control_enabled: false,
  table_default_page_size: 20,
  table_page_size_options: [10, 20, 50, 100],
  custom_menu_items: [],
  custom_endpoints: [
    { name: 'Primary', endpoint: 'https://api.relay-gateway.io/v1', description: 'Primary relay endpoint' }
  ],
  linuxdo_oauth_enabled: false,
  dingtalk_oauth_enabled: false,
  wechat_oauth_enabled: false,
  wechat_oauth_open_enabled: false,
  wechat_oauth_mp_enabled: false,
  wechat_oauth_mobile_enabled: false,
  oidc_oauth_enabled: false,
  oidc_oauth_provider_name: '',
  github_oauth_enabled: false,
  google_oauth_enabled: false,
  backend_mode_enabled: false,
  version: 'preview-wui',
  balance_low_notify_enabled: true,
  account_quota_notify_enabled: true,
  balance_low_notify_threshold: 20,
  channel_monitor_enabled: true,
  channel_monitor_default_interval_seconds: 60,
  available_channels_enabled: true,
  affiliate_enabled: false
}

const previewActiveSubscriptions: UserSubscription[] = []
const previewAnnouncements: UserAnnouncement[] = []

const previewUsageStats: UsageStatsResponse = {
  total_requests: 14200,
  total_tokens: 1220000,
  total_input_tokens: 418000,
  total_output_tokens: 802000,
  total_cost: 5.64,
  total_actual_cost: 4.12,
  average_duration_ms: 240
} as any

const previewDashboardStats = {
  total_api_keys: 8,
  active_api_keys: 8,
  today_requests: 14200,
  total_requests: 182304,
  today_actual_cost: 4.12,
  today_cost: 5.64,
  total_actual_cost: 124.5,
  total_cost: 162.3,
  today_tokens: 1220000,
  today_input_tokens: 418000,
  today_output_tokens: 802000,
  total_tokens: 32800000,
  total_input_tokens: 11800000,
  total_output_tokens: 21000000,
  rpm: 420,
  tpm: 1200000,
  average_duration_ms: 240,
  by_platform: [
    { platform: 'openai', total_actual_cost: 62.4, today_actual_cost: 1.92, total_requests: 99200, total_tokens: 18200000 },
    { platform: 'anthropic', total_actual_cost: 34.7, today_actual_cost: 1.14, total_requests: 53120, total_tokens: 9100000 },
    { platform: 'gemini', total_actual_cost: 17.4, today_actual_cost: 0.68, total_requests: 29984, total_tokens: 5500000 }
  ]
}

export function isDevWuiPreviewEnabled(): boolean {
  if (!import.meta.env.DEV) return false
  const params = new URLSearchParams(window.location.search)
  return params.get('wui_preview') === '1'
}

export function getDevPreviewRoute(path: string) {
  return isDevWuiPreviewEnabled() ? { path, query: { wui_preview: '1' } } : path
}

export function applyDevPreviewAuthState() {
  if (!isDevWuiPreviewEnabled()) return
  localStorage.setItem('auth_token', 'dev-wui-preview-token')
  localStorage.setItem('auth_user', JSON.stringify(previewUser))
}

export function getPreviewCurrentUserResponse(): CurrentUserResponse {
  return {
    ...previewUser,
    run_mode: 'standard'
  }
}

export function getPreviewPublicSettings(): PublicSettings {
  return previewPublicSettings
}

export function getPreviewSetupStatus() {
  return {
    needs_setup: false,
    step: 'complete'
  }
}

export function getPreviewActiveSubscriptions(): UserSubscription[] {
  return previewActiveSubscriptions
}

export function getPreviewAnnouncements(): UserAnnouncement[] {
  return previewAnnouncements
}

export function getPreviewDashboardStats() {
  return previewDashboardStats as any
}

export function getPreviewDashboardTrend() {
  return { trend: previewTrend }
}

export function getPreviewDashboardModels() {
  return { models: previewModels }
}

export function getPreviewUsageLogs(): BasePaginationResponse<UsageLog> {
  return {
    items: previewUsageLogs,
    total: previewUsageLogs.length,
    page: 1,
    page_size: 20,
    pages: 1
  }
}

export function getPreviewUsageStats(): UsageStatsResponse {
  return previewUsageStats
}

export function getPreviewKeys(): BasePaginationResponse<ApiKey> {
  return {
    items: previewKeys,
    total: previewKeys.length,
    page: 1,
    page_size: 20,
    pages: 1
  }
}

export function getPreviewKeyUsageMap() {
  return {
    11: { today_actual_cost: 1.82, total_actual_cost: 42.18 },
    12: { today_actual_cost: 0.33, total_actual_cost: 8.39 },
    13: { today_actual_cost: 0.0, total_actual_cost: 3.44 }
  } as Record<number, { today_actual_cost: number; total_actual_cost: number }>
}

export function getPreviewUserGroupRates() {
  return {
    101: 0.73,
    102: 0.78,
    103: 0.81,
    104: 1
  }
}

export function getPreviewChannels() {
  return previewChannels
}
