<template>
  <div class="container">
    <h1 class="app-title">Markdown <span>Editor</span></h1>
    <p class="app-subtitle">Write markdown on the left, see the formatted preview on the right</p>
    
    <Toolbar 
      @insert-text="handleInsertText"
      @download="handleDownload"
      @clear="handleClear"
    />
    
    <div class="editor-preview-container">
      <MarkdownEditor 
        v-model="markdownContent"
        ref="editorComponent"
      />
      <MarkdownPreview 
        :markdown="markdownContent"
      />
    </div>
    
    <div class="features">
      <div class="feature">
        <i class="fas fa-bolt"></i>
        <h3>Live Preview</h3>
        <p>See your formatted markdown in real-time as you type</p>
      </div>
      <div class="feature">
        <i class="fas fa-magic"></i>
        <h3>Easy Formatting</h3>
        <p>Use the toolbar to quickly add markdown formatting</p>
      </div>
      <div class="feature">
        <i class="fasfa-download"></i>
        <h3>Export</h3>
        <p>Download your markdown files for use anywhere</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Built with Vue 3, GSAP, and Vite • Markdown Editor &copy; {{ currentYear }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import Toolbar from './components/Toolbar.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import MarkdownPreview from './components/MarkdownPreview.vue'

// Initial markdown content with examples
const markdownContent = ref(`# Welcome to Markdown Editor

This is a **live preview** markdown editor. Write on the left, see the result on the right.

## Features
- **Real-time preview** of your markdown
- **Toolbar** for quick formatting
- **Export** your markdown as a file
- **Clean, modern** interface with animations

## Formatting Examples

### Text Formatting
You can make text **bold**, *italic*, or ***bold and italic***.

### Links
Here's a link to [Vue.js](https://vuejs.org) and [GSAP](https://greensock.com/gsap/).

### Code
Inline code: \`console.log('Hello World')\`

Code block:
\`\`\`javascript
function greet() {
  console.log('Hello from Markdown Editor!');
  return 'Formatted with GSAP animations';
}
\`\`\`

### Lists
1. First ordered item
2. Second ordered item
   - Sub-item
   - Another sub-item

### Blockquote
> This is a blockquote. It's great for highlighting important information.

### Table
| Feature | Status |
|---------|--------|
| Live Preview | ✅ Ready |
| Export | ✅ Ready |
| Animations | ✅ Ready |
| Mobile Friendly | ✅ Ready |

---

Start editing to see your changes in real-time!`)

const editorComponent = ref(null)
const currentYear = new Date().getFullYear()

const handleInsertText = (text) => {
  if (editorComponent.value) {
    editorComponent.value.insertAtCursor(text)
  }
}

const handleDownload = () => {
  if (!markdownContent.value.trim()) {
    alert('No content to download!')
    return
  }
  
  const element = document.createElement('a')
  const file = new Blob([markdownContent.value], { type: 'text/markdown' })
  element.href = URL.createObjectURL(file)
  element.download = 'markdown-document.md'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
  
  // Animation feedback
  gsap.to('.app-title', {
    y: -5,
    duration: 0.2,
    yoyo: true,
    repeat: 1
  })
}

const handleClear = () => {
  if (confirm('Are you sure you want to clear the editor?')) {
    if (editorComponent.value) {
      editorComponent.value.clearEditor()
    }
  }
}

// Add page entrance animation
onMounted(() => {
  gsap.from('.container', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out'
  })
  
  // Animate feature cards sequentially
  gsap.from('.feature', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.2,
    delay: 1
  })
})
</script>