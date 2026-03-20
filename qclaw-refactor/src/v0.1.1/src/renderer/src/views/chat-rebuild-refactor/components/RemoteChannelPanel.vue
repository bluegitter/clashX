<script setup lang="ts">
import type { RemoteChannelCard } from '../types'

defineProps<{
  channels: RemoteChannelCard[]
}>()

defineEmits<{
  open: [channelId: string]
  disconnect: [channelId: string]
}>()
</script>

<template>
  <section class="settings-panel">
    <div class="settings-panel__title">远控通道</div>
    <div class="remote-channel-grid">
      <article v-for="channel in channels" :key="channel.id" class="remote-channel-card">
        <div class="remote-channel-card__header">
          <div class="remote-channel-card__icon">{{ channel.icon }}</div>
          <div>
            <div class="remote-channel-card__name">{{ channel.name }}</div>
            <div class="remote-channel-card__desc">{{ channel.description }}</div>
          </div>
        </div>
        <div class="remote-channel-card__footer">
          <button type="button" @click="$emit('open', channel.id)">
            {{ channel.status === 'connected' ? '查看配置' : '立即配置' }}
          </button>
          <button v-if="channel.status === 'connected'" type="button" class="ghost" @click="$emit('disconnect', channel.id)">
            断开
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
