<script setup lang="ts">
import type { ModelOptionGroup } from '../types'

const props = defineProps<{
  providerId: string
  providerOptions: ModelOptionGroup[]
  modelId: string
  token: string
  baseUrl: string
}>()

const emit = defineEmits<{
  'update:providerId': [value: string]
  'update:modelId': [value: string]
  'update:token': [value: string]
  'update:baseUrl': [value: string]
  save: []
}>()

function emitProviderId(event: Event) {
  emit('update:providerId', (event.target as HTMLSelectElement).value)
}

function emitModelId(event: Event) {
  emit('update:modelId', (event.target as HTMLSelectElement).value)
}

function emitBaseUrl(event: Event) {
  emit('update:baseUrl', (event.target as HTMLInputElement).value)
}

function emitToken(event: Event) {
  emit('update:token', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <section class="settings-panel">
    <div class="settings-panel__title">模型设置</div>

    <label class="settings-panel__field">
      <span>Provider</span>
      <select :value="providerId" @change="emitProviderId">
        <option v-for="option in providerOptions" :key="option.providerId" :value="option.providerId">
          {{ option.providerLabel }}
        </option>
      </select>
    </label>

    <label class="settings-panel__field">
      <span>Model ID</span>
      <select :value="modelId" @change="emitModelId">
        <option
          v-for="option in props.providerOptions.find((group) => group.providerId === providerId)?.modelOptions || []"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </label>

    <label class="settings-panel__field">
      <span>Base URL</span>
      <input :value="baseUrl" type="text" @input="emitBaseUrl" />
    </label>

    <label class="settings-panel__field">
      <span>Token</span>
      <input :value="token" type="password" @input="emitToken" />
    </label>

    <button type="button" class="settings-panel__primary" @click="$emit('save')">保存模型配置</button>
  </section>
</template>
