<template>
  <div class="quote-generator">
    <div class="quote-card" :class="{ 'fade-in': showAnimation }">
      <div class="quote-content">
        <span class="quote-mark">"</span>
        <p class="quote-text">{{ currentQuote.text }}</p>
        <span class="quote-mark">"</span>
      </div>
      <p class="quote-author">— {{ currentQuote.author }}</p>
    </div>
    
    <div class="controls">
      <button @click="getRandomQuote" class="new-quote-btn">
        New Quote
      </button>
      <button @click="copyToClipboard" class="copy-btn" :class="{ 'copied': isCopied }">
        {{ isCopied ? 'Copied!' : 'Copy Quote' }}
      </button>
    </div>
    
    <div class="history" v-if="quoteHistory.length > 0">
      <h3>Recent Quotes</h3>
      <div class="history-list">
        <div 
          v-for="(quote, index) in quoteHistory.slice(0, 3)" 
          :key="index" 
          class="history-item"
          @click="selectFromHistory(quote)"
        >
          "{{ quote.text.substring(0, 50) }}..."
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteGenerator',
  data() {
    return {
      quotes: [
        {
          text: "The only way to do great work is to love what you do.",
          author: "Steve Jobs"
        },
        {
          text: "Innovation distinguishes between a leader and a follower.",
          author: "Steve Jobs"
        },
        {
          text: "Your time is limited, so don't waste it living someone else's life.",
          author: "Steve Jobs"
        },
        {
          text: "The future belongs to those who believe in the beauty of their dreams.",
          author: "Eleanor Roosevelt"
        },
        {
          text: "The way to get started is to quit talking and begin doing.",
          author: "Walt Disney"
        },
        {
          text: "If you look at what you have in life, you'll always have more.",
          author: "Oprah Winfrey"
        },
        {
          text: "Life is what happens to you while you're busy making other plans.",
          author: "John Lennon"
        },
        {
          text: "The only impossible journey is the one you never begin.",
          author: "Tony Robbins"
        },
        {
          text: "It does not matter how slowly you go as long as you do not stop.",
          author: "Confucius"
        },
        {
          text: "Everything you've ever wanted is on the other side of fear.",
          author: "George Addair"
        }
      ],
      currentQuote: {},
      quoteHistory: [],
      showAnimation: false,
      isCopied: false
    }
  },
  mounted() {
    this.getRandomQuote()
  },
  methods: {
    getRandomQuote() {
      this.showAnimation = false
      
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.quotes.length)
        const newQuote = this.quotes[randomIndex]
        
        // Don't show the same quote twice in a row
        if (newQuote.text !== this.currentQuote.text) {
          this.currentQuote = newQuote
          this.addToHistory(newQuote)
          this.showAnimation = true
        } else {
          this.getRandomQuote() // Try again if same quote
        }
      }, 100)
    },
    
    addToHistory(quote) {
      // Avoid duplicates in history
      if (!this.quoteHistory.some(q => q.text === quote.text)) {
        this.quoteHistory.unshift(quote)
        // Keep only last 5 quotes in history
        if (this.quoteHistory.length > 5) {
          this.quoteHistory = this.quoteHistory.slice(0, 5)
        }
      }
    },
    
    selectFromHistory(quote) {
      this.showAnimation = false
      setTimeout(() => {
        this.currentQuote = quote
        this.showAnimation = true
      }, 100)
    },
    
    async copyToClipboard() {
      const quoteText = `"${this.currentQuote.text}" - ${this.currentQuote.author}`
      
      try {
        await navigator.clipboard.writeText(quoteText)
        this.isCopied = true
        setTimeout(() => {
          this.isCopied = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    }
  }
}
</script>

<style scoped>
.quote-generator {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
}

.quote-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #667eea;
  transition: all 0.3s ease;
}

.quote-card.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.quote-content {
  margin-bottom: 1.5rem;
}

.quote-mark {
  font-size: 3rem;
  color: #667eea;
  line-height: 1;
}

.quote-text {
  font-size: 1.4rem;
  line-height: 1.6;
  color: #333;
  margin: 1rem 0;
  font-style: italic;
}

.quote-author {
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.new-quote-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.new-quote-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.copy-btn {
  background: #f8f9fa;
  color: #333;
  border: 2px solid #e9ecef;
}

.copy-btn:hover {
  background: #e9ecef;
}

.copy-btn.copied {
  background: #28a745;
  color: white;
  border-color: #28a745;
}

.history {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.history h3 {
  color: #333;
  margin-bottom: 1rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  background: #f8f9fa;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.history-item:hover {
  background: #e9ecef;
  border-left-color: #667eea;
  transform: translateX(5px);
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  button {
    width: 200px;
  }
  
  .quote-text {
    font-size: 1.2rem;
  }
}
</style>