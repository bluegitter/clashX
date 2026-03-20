<script setup lang="ts">
import { computed, ref } from 'vue'
import AboutPanel from './components/AboutPanel.vue'
import ChatComposer from './components/ChatComposer.vue'
import ChatHeader from './components/ChatHeader.vue'
import ChatMessageList from './components/ChatMessageList.vue'
import ModelSettingsPanel from './components/ModelSettingsPanel.vue'
import RemoteChannelPanel from './components/RemoteChannelPanel.vue'
import SkillsSettingsPanel from './components/SkillsSettingsPanel.vue'
import { useChatPanelTabs } from './composables/useChatPanelTabs'
import type { ChatMessageItem, ModelOptionGroup, RemoteChannelCard, SkillItem } from './types'

const { activeSystemSettingsTab, activeTabMeta, systemTabOptions } = useChatPanelTabs()

const prompt = ref('')
const sending = ref(false)
const providerId = ref('openai')
const modelId = ref('gpt-4.1')
const baseUrl = ref('https://api.openai.com/v1')
const token = ref('')
const selectedSkillId = ref<string>()

const messages = ref<ChatMessageItem[]>([
  {
    id: 'assistant-welcome',
    role: 'assistant',
    content: '欢迎使用重构后的 ChatRebuildView。现在页面入口只负责组合业务模块。',
    createdAt: '刚刚',
    status: 'done',
  },
])

const providerOptions = ref<ModelOptionGroup[]>([
  { providerId: 'openai', providerLabel: 'OpenAI', modelOptions: ['gpt-4.1', 'gpt-4o-mini'] },
  { providerId: 'anthropic', providerLabel: 'Anthropic', modelOptions: ['claude-sonnet-4.5'] },
  { providerId: 'custom', providerLabel: '自定义', modelOptions: ['custom-model'] },
])

const skills = ref<SkillItem[]>([
  {
    id: 'skill-creator',
    name: 'skill-creator',
    description: '用于创建或改造技能模块。',
    fullDescription: '将技能创建流程从大页面中分离后，技能管理部分可以独立维护与测试。',
    version: '1.0.0',
    source: 'system',
    enabled: true,
    alwaysEnabled: true,
  },
  {
    id: 'wechat-access',
    name: 'wechat-access',
    description: '远控通道集成示例。',
    fullDescription: '该技能展示如何把复杂的设置卡片区域拆出去，避免主视图模板持续膨胀。',
    version: '0.1.1',
    source: 'workspace',
    path: '~/.qclaw/skills/wechat-access',
    enabled: true,
  },
])

const remoteChannels = ref<RemoteChannelCard[]>([
  { id: 'wechat', icon: '微', name: '微信', description: '接入微信远控通道', recommended: true, status: 'connected' },
  { id: 'telegram', icon: 'TG', name: 'Telegram', description: '接入 Telegram 远控通道', status: 'available' },
])

const statusText = computed(() => (sending.value ? '回复生成中…' : '已就绪'))

function submitPrompt() {
  if (!prompt.value.trim()) {
    return
  }

  const content = prompt.value.trim()
  messages.value.push({ id: `user-${Date.now()}`, role: 'user', content, createdAt: '刚刚', status: 'done' })
  prompt.value = ''
  sending.value = true

  setTimeout(() => {
    messages.value.push({
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: `已收到：${content}`,
      reasoning: '这里可以继续接入原始 ChatRebuildView 的流式响应逻辑。',
      createdAt: '刚刚',
      status: 'done',
    })
    sending.value = false
  }, 200)
}

function clearMessages() {
  messages.value = []
}

function refreshConversation() {
  messages.value = [...messages.value]
}

function saveModelSettings() {
  console.info('save model settings', {
    providerId: providerId.value,
    modelId: modelId.value,
    baseUrl: baseUrl.value,
  })
}

function toggleSkill(skillId: string) {
  skills.value = skills.value.map((skill) =>
    skill.id === skillId && !skill.alwaysEnabled ? { ...skill, enabled: !skill.enabled } : skill,
  )
}

function removeSkill(skillId: string) {
  skills.value = skills.value.filter((skill) => skill.id !== skillId)
  if (selectedSkillId.value === skillId) {
    selectedSkillId.value = undefined
  }
}
</script>

<template>
  <div class="chat-rebuild-page">
    <section class="chat-rebuild-page__conversation">
      <ChatHeader
        title="Chat Rebuild"
        subtitle="将超大视图拆成消息区、输入区、模型设置、技能管理、远控面板等多个模块"
        :status-text="statusText"
        :busy="sending"
        @clear="clearMessages"
        @refresh="refreshConversation"
      />
      <ChatMessageList :messages="messages" />
      <ChatComposer v-model="prompt" :sending="sending" @submit="submitPrompt" />
    </section>

    <aside class="chat-rebuild-page__settings">
      <header class="settings-sidebar__header">
        <div class="settings-sidebar__title">系统设置</div>
        <div class="settings-sidebar__desc">{{ activeTabMeta.description }}</div>
      </header>

      <nav class="settings-sidebar__tabs">
        <button
          v-for="tab in systemTabOptions"
          :key="tab.key"
          type="button"
          class="settings-sidebar__tab"
          :class="{ 'is-active': tab.key === activeSystemSettingsTab }"
          @click="activeSystemSettingsTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </nav>

      <ModelSettingsPanel
        v-if="activeSystemSettingsTab === 'model'"
        v-model:provider-id="providerId"
        v-model:model-id="modelId"
        v-model:base-url="baseUrl"
        v-model:token="token"
        :provider-options="providerOptions"
        @save="saveModelSettings"
      />

      <SkillsSettingsPanel
        v-else-if="activeSystemSettingsTab === 'skills'"
        :skills="skills"
        :selected-skill-id="selectedSkillId"
        @select="selectedSkillId = $event"
        @toggle="toggleSkill"
        @remove="removeSkill"
        @import-github="console.info('open github import modal')"
      />

      <RemoteChannelPanel
        v-else-if="activeSystemSettingsTab === 'remote'"
        :channels="remoteChannels"
        @open="console.info('open channel', $event)"
        @disconnect="console.info('disconnect channel', $event)"
      />

      <AboutPanel
        v-else
        version="v0.1.1"
        build-info="refactor-demo"
        summary="本示例用于展示如何把原本臃肿的 ChatRebuildView 拆成更聚焦的组件和组合式模块。"
      />
    </aside>
  </div>
</template>

<style scoped>
.chat-rebuild-page {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  gap: 24px;
  min-height: 100vh;
  padding: 24px;
  background: #0f1115;
  color: #edf2f7;
}

.chat-rebuild-page__conversation,
.chat-rebuild-page__settings,
.settings-panel,
.skill-detail,
.chat-message-card,
.remote-channel-card {
  background: #171923;
  border: 1px solid #2d3748;
  border-radius: 16px;
}

.chat-rebuild-page__conversation,
.chat-rebuild-page__settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.chat-header,
.chat-header__actions,
.chat-message-card__header,
.settings-sidebar__tabs,
.skill-card__top,
.skill-card__bottom,
.remote-channel-card__header,
.remote-channel-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.chat-message-list,
.skill-list,
.remote-channel-grid {
  display: grid;
  gap: 12px;
}

.chat-composer {
  display: grid;
  gap: 12px;
}

.chat-composer__input {
  min-height: 120px;
}

.settings-sidebar__tab.is-active,
.settings-panel__primary,
.chat-composer__submit,
.chat-header__button {
  background: #3182ce;
  color: white;
}

.settings-panel,
.settings-panel--split {
  display: grid;
  gap: 16px;
  padding: 16px;
}

.settings-panel--split {
  grid-template-columns: minmax(0, 1.5fr) minmax(240px, 1fr);
}

.settings-panel__field {
  display: grid;
  gap: 8px;
}

.settings-panel input,
.settings-panel select,
.chat-composer__input,
.chat-header__button,
.settings-panel__primary,
.chat-composer__submit,
.remote-channel-card__footer button,
.skill-card__bottom button,
.settings-sidebar__tab {
  border-radius: 10px;
  border: 1px solid #4a5568;
  padding: 10px 12px;
  background: #111827;
  color: inherit;
}

.chat-message-card,
.skill-card,
.remote-channel-card,
.skill-detail {
  padding: 14px;
}

.skill-card.is-selected {
  border: 1px solid #3182ce;
}

.skill-detail__empty,
.chat-message-list__empty {
  color: #a0aec0;
}
</style>
