import { computed, ref } from 'vue'
import type { SystemSettingsTab } from '../types'

const systemTabOptions: Array<{ key: SystemSettingsTab; label: string; description: string }> = [
  { key: 'model', label: '模型', description: '配置模型与鉴权信息' },
  { key: 'skills', label: '技能', description: '管理技能开关与安装来源' },
  { key: 'remote', label: '远控', description: '配置远控接入通道' },
  { key: 'about', label: '关于', description: '查看版本与辅助信息' },
]

export function useChatPanelTabs(defaultTab: SystemSettingsTab = 'model') {
  const activeSystemSettingsTab = ref<SystemSettingsTab>(defaultTab)

  const activeTabMeta = computed(() => {
    return systemTabOptions.find((option) => option.key === activeSystemSettingsTab.value) ?? systemTabOptions[0]
  })

  return {
    activeSystemSettingsTab,
    activeTabMeta,
    systemTabOptions,
  }
}
