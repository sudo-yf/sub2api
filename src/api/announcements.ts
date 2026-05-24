/**
 * User Announcements API endpoints
 */

import { apiClient } from './client'
import type { UserAnnouncement } from '@/types'
import { getPreviewAnnouncements, isDevWuiPreviewEnabled } from '@/utils/devPreview'

export async function list(unreadOnly: boolean = false): Promise<UserAnnouncement[]> {
  if (isDevWuiPreviewEnabled()) {
    return Promise.resolve(getPreviewAnnouncements())
  }
  const { data } = await apiClient.get<UserAnnouncement[]>('/announcements', {
    params: unreadOnly ? { unread_only: 1 } : {}
  })
  return data
}

export async function markRead(id: number): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>(`/announcements/${id}/read`)
  return data
}

const announcementsAPI = {
  list,
  markRead
}

export default announcementsAPI
