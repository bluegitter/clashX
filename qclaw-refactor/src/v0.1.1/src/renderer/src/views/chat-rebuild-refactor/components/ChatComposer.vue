<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  sending?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

function handleSubmit() {
  if (!props.modelValue.trim() || props.disabled || props.sending) {
    return
  }

  emit('submit')
}
</script>

<template>
  <footer class="chat-composer">
    <textarea
      class="chat-composer__input"
      :value="modelValue"
      :disabled="disabled"
      placeholder="请输入消息..."
      @input="handleInput"
      @keydown.meta.enter.prevent="handleSubmit"
      @keydown.ctrl.enter.prevent="handleSubmit"
    />
    <button type="button" class="chat-composer__submit" :disabled="disabled || !modelValue.trim()" @click="handleSubmit">
      {{ sending ? '发送中...' : '发送' }}
    </button>
  </footer>
</template>
