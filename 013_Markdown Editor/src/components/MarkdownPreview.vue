<template>
  <div class="section">
    <div class="section-header">
      <i class="fas fa-eye"></i>
      <span>Live Preview</span>
      <div class="last-updated">Updated: {{ lastUpdated }}</div>
    </div>
    <div class="section-content">
      <div 
        class="markdown-preview" 
        ref="previewContainer"
        v-html="renderedMarkdown"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { gsap } from 'gsap'

const props = defineProps({
  markdown: {
    type: String,
    default: ''
  }
})

const previewContainer = ref(null)
const lastUpdated = ref('just now')

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false
})

const renderedMarkdown = computed(() => {
  const rawMarkdown = props.markdown || '*Your preview will appear here*'
  const rawHtml = marked(rawMarkdown)
  const cleanHtml = DOMPurify.sanitize(rawHtml)
  return cleanHtml
})

// Watch for markdown changes to update timestamp and animate
watch(() => props.markdown, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    const now = new Date()
    lastUpdated.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    // Add subtle animation to preview when content changes
    if (previewContainer.value) {
      gsap.fromTo(previewContainer.value, 
        { backgroundColor: '#f0f7ff' },
        { backgroundColor: 'transparent', duration: 0.5 }
      )
    }
  }
})

// Add entrance animation when component mounts
onMounted(() => {
  if (previewContainer.value) {
    gsap.from(previewContainer.value, {
      opacity: 0,
      x: 20,
      duration: 0.8,
      delay: 0.5
    })
  }
})
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-updated {
  font-size: 0.9rem;
  opacity: 0.8;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
}
</style>