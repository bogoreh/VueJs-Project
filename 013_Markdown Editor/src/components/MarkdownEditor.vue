<template>
  <div class="section">
    <div class="section-header">
      <i class="fas fa-edit"></i>
      <span>Markdown Editor</span>
      <div class="char-count">{{ characterCount }} characters</div>
    </div>
    <div class="section-content">
      <textarea 
        ref="editorTextarea"
        v-model="markdownText" 
        @input="handleInput"
        class="editor-textarea" 
        placeholder="Start typing your markdown here..."
        autofocus
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const editorTextarea = ref(null)

const markdownText = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const characterCount = computed(() => {
  return markdownText.value.length
})

const handleInput = () => {
  // Optional: Add any input handling logic here
}

// Focus the textarea when component mounts
onMounted(() => {
  if (editorTextarea.value) {
    editorTextarea.value.focus()
    
    // Add entrance animation
    gsap.from(editorTextarea.value, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3
    })
  }
})

// Method to insert text at cursor position
const insertAtCursor = (text) => {
  const textarea = editorTextarea.value
  if (!textarea) return
  
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const currentText = markdownText.value
  
  markdownText.value = currentText.substring(0, start) + text + currentText.substring(end)
  
  // Set cursor position after inserted text
  setTimeout(() => {
    textarea.selectionStart = textarea.selectionEnd = start + text.length
    textarea.focus()
    
    // Animation feedback
    gsap.to(textarea, {
      backgroundColor: '#e8f4fc',
      duration: 0.2,
      yoyo: true,
      repeat: 1
    })
  }, 10)
}

// Method to clear the editor
const clearEditor = () => {
  gsap.to(editorTextarea.value, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      markdownText.value = ''
      gsap.to(editorTextarea.value, {
        opacity: 1,
        duration: 0.3
      })
    }
  })
}

// Expose methods to parent component
defineExpose({
  insertAtCursor,
  clearEditor
})
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  font-size: 0.9rem;
  opacity: 0.8;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
}
</style>