export const BILLING_MODE_TOKEN = 'token'
export const BILLING_MODE_PER_REQUEST = 'per_request'
export const BILLING_MODE_IMAGE = 'image'

export function getBillingModeLabel(mode: string | null | undefined, t: (key: string) => string): string {
  switch (mode) {
    case BILLING_MODE_PER_REQUEST: return t('admin.usage.billingModePerRequest')
    case BILLING_MODE_IMAGE: return t('admin.usage.billingModeImage')
    default: return t('admin.usage.billingModeToken')
  }
}

export function getBillingModeBadgeClass(mode: string | null | undefined): string {
  switch (mode) {
    case BILLING_MODE_PER_REQUEST: return 'bg-[#b48ead]/8 text-[#b48ead]/80 dark:bg-[#b48ead]/12 dark:text-[#b48ead]'
    case BILLING_MODE_IMAGE: return 'bg-[#b48ead]/8 text-[#b48ead]/80 dark:bg-[#b48ead]/12 dark:text-[#b48ead]'
    default: return 'bg-[#81a1c1]/8 text-[#81a1c1]/80 dark:bg-[#81a1c1]/12 dark:text-[#81a1c1]'
  }
}
