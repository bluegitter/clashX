<script setup lang="ts">
import type { ChatMessageItem } from '../types'

defineProps<{
  messages: ChatMessageItem[]
  emptyText?: string
}>()
</script>

<template>
  <section class="chat-message-list">
    <div v-if="!messages.length" class="chat-message-list__empty">
      {{ emptyText || '暂无消息，开始新的对话吧。' }}
    </div>

    <article v-for="message in messages" :key="message.id" class="chat-message-card" :data-role="message.role">
      <header class="chat-message-card__header">
        <span class="chat-message-card__role">{{ message.role }}</span>
        <span v-if="message.createdAt" class="chat-message-card__time">{{ message.createdAt }}</span>
      </header>

      <div v-if="message.reasoning" class="chat-message-card__reasoning">
        {{ message.reasoning }}
      </div>

      <div class="chat-message-card__content">{{ message.content }}</div>
      <footer v-if="message.status" class="chat-message-card__status">{{ message.status }}</footer>
    </article>
  </section>
</template>
