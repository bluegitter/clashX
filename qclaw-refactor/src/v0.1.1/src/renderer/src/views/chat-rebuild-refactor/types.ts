export type SystemSettingsTab = 'model' | 'skills' | 'remote' | 'about'

export interface ChatMessageItem {
  id: string
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  reasoning?: string
  createdAt?: string
  status?: 'streaming' | 'done' | 'error'
}

export interface SkillItem {
  id: string
  name: string
  description?: string
  fullDescription?: string
  version?: string
  source: 'system' | 'workspace' | 'user' | 'github'
  path?: string
  alwaysEnabled?: boolean
  enabled?: boolean
}

export interface RemoteChannelCard {
  id: string
  icon: string
  name: string
  description: string
  recommended?: boolean
  status: 'connected' | 'available' | 'disabled'
}

export interface ModelOptionGroup {
  providerId: string
  providerLabel: string
  modelOptions: string[]
}
