<script setup lang="ts">
defineProps<{
  version: string
  buildInfo: string
  summary: string
}>()
</script>

<template>
  <section class="settings-panel">
    <div class="settings-panel__title">关于 QClaw</div>
    <div class="about-panel__row"><strong>版本：</strong>{{ version }}</div>
    <div class="about-panel__row"><strong>构建：</strong>{{ buildInfo }}</div>
    <p class="about-panel__summary">{{ summary }}</p>
  </section>
</template>
