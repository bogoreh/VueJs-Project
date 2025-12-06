<template>
  <div class="toolbar">
    <button @click="insertText('# Heading 1\n')" title="Insert H1">
      <i class="fas fa-heading"></i> H1
    </button>
    <button @click="insertText('## Heading 2\n')" title="Insert H2">
      <i class="fas fa-heading"></i> H2
    </button>
    <button @click="insertText('**Bold Text**')" title="Insert Bold Text">
      <i class="fas fa-bold"></i> Bold
    </button>
    <button @click="insertText('*Italic Text*')" title="Insert Italic Text">
      <i class="fas fa-italic"></i> Italic
    </button>
    <button @click="insertText('[Link Text](https://example.com)')" title="Insert Link">
      <i class="fas fa-link"></i> Link
    </button>
    <button @click="insertText('```\nCode Block\n```\n')" title="Insert Code Block">
      <i class="fas fa-code"></i> Code
    </button>
    <button @click="insertText('- List Item\n- Another Item\n')" title="Insert Bullet List">
      <i class="fas fa-list-ul"></i> List
    </button>
    <button @click="insertText('1. First Item\n2. Second Item\n')" title="Insert Numbered List">
      <i class="fas fa-list-ol"></i> Numbered List
    </button>
    <button @click="insertText('> Blockquote\n')" title="Insert Blockquote">
      <i class="fas fa-quote-right"></i> Quote
    </button>
    <button @click="downloadMarkdown" title="Download as Markdown">
      <i class="fas fa-download"></i> Download
    </button>
    <button @click="clearEditor" title="Clear Editor">
      <i class="fas fa-trash-alt"></i> Clear
    </button>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'

const emit = defineEmits(['insert-text', 'download', 'clear'])

const insertText = (text) => {
  emit('insert-text', text)
  
  // Add animation feedback
  const buttons = document.querySelectorAll('.toolbar button')
  const button = Array.from(buttons).find(btn => btn.textContent.includes(text.substring(0, 5).trim()) || btn.textContent.includes(text.substring(0, 3).trim()))
  if (button) {
    gsap.to(button, {
      scale: 1.1,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  }
}

const downloadMarkdown = () => {
  emit('download')
  
  // Animation feedback
  const downloadBtn = document.querySelector('.toolbar button:has(.fa-download)')
  if (downloadBtn) {
    gsap.to(downloadBtn, {
      backgroundColor: '#27ae60',
      duration: 0.3,
      onComplete: () => {
        gsap.to(downloadBtn, {
          backgroundColor: '#3498db',
          duration: 0.3,
          delay: 0.5
        })
      }
    })
  }
}

const clearEditor = () => {
  emit('clear')
  
  // Animation feedback
  const clearBtn = document.querySelector('.toolbar button:has(.fa-trash-alt)')
  if (clearBtn) {
    gsap.to(clearBtn, {
      rotation: 360,
      duration: 0.5
    })
  }
}
</script>