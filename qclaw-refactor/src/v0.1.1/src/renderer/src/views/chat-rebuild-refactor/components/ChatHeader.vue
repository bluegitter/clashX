<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  statusText: string
  busy?: boolean
}>()

defineEmits<{
  refresh: []
  clear: []
}>()
</script>

<template>
  <header class="chat-header">
    <div>
      <div class="chat-header__title">{{ title }}</div>
      <div class="chat-header__subtitle">{{ subtitle }}</div>
    </div>
    <div class="chat-header__actions">
      <span class="chat-header__status" :class="{ 'is-busy': busy }">{{ statusText }}</span>
      <button type="button" class="chat-header__button chat-header__button--ghost" @click="$emit('clear')">
        清空
      </button>
      <button type="button" class="chat-header__button" @click="$emit('refresh')">刷新</button>
    </div>
  </header>
</template>
