<script setup lang="ts">
import { computed } from 'vue'
import type { SkillItem } from '../types'

const props = defineProps<{
  skills: SkillItem[]
  selectedSkillId?: string
}>()

defineEmits<{
  toggle: [skillId: string]
  select: [skillId: string]
  importGithub: []
  remove: [skillId: string]
}>()

const selectedSkill = computed(() => props.skills.find((skill) => skill.id === props.selectedSkillId))
</script>

<template>
  <section class="settings-panel settings-panel--split">
    <div>
      <div class="settings-panel__title">技能管理</div>
      <div class="skill-list">
        <article
          v-for="skill in skills"
          :key="skill.id"
          class="skill-card"
          :class="{ 'is-selected': skill.id === selectedSkillId }"
          @click="$emit('select', skill.id)"
        >
          <div class="skill-card__top">
            <div>
              <div class="skill-card__name">{{ skill.name }}</div>
              <div class="skill-card__desc">{{ skill.description || '暂无描述' }}</div>
            </div>
            <input
              type="checkbox"
              :checked="!!skill.enabled"
              :disabled="skill.alwaysEnabled"
              @click.stop
              @change="$emit('toggle', skill.id)"
            />
          </div>
          <div class="skill-card__bottom">
            <span>{{ skill.source }}</span>
            <button v-if="!skill.alwaysEnabled" type="button" @click.stop="$emit('remove', skill.id)">移除</button>
          </div>
        </article>
      </div>
      <button type="button" class="settings-panel__primary" @click="$emit('importGithub')">从 GitHub 导入技能</button>
    </div>

    <aside class="skill-detail">
      <template v-if="selectedSkill">
        <div class="skill-detail__title">{{ selectedSkill.name }}</div>
        <div class="skill-detail__meta">
          <span>{{ selectedSkill.source }}</span>
          <span v-if="selectedSkill.version">v{{ selectedSkill.version }}</span>
        </div>
        <div class="skill-detail__body">
          {{ selectedSkill.fullDescription || selectedSkill.description || '暂无详细描述' }}
        </div>
        <div v-if="selectedSkill.path" class="skill-detail__path">{{ selectedSkill.path }}</div>
      </template>
      <div v-else class="skill-detail__empty">请选择左侧技能查看详情。</div>
    </aside>
  </section>
</template>
