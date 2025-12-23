import { UserProfile } from './types'

const API_URL = import.meta.env.VITE_API_URL || 'https://n8niola.yakunin-ai.ru/webhook/onar-vk'

interface SendMessageParams {
  message: string
  userId: string
  userProfile: UserProfile
}

export async function sendMessage({ message, userId, userProfile }: SendMessageParams): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      userId,
      category: userProfile.category,
      subcategory: userProfile.subcategory,
      district: userProfile.district,
      source: 'vk_mini_app'
    })
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  const data = await response.json()
  return data.response || data.text || 'Не удалось получить ответ'
}