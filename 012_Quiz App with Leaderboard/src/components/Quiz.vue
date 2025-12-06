<template>
  <div class="quiz-container dark-card">
    <!-- Quiz Status Bar -->
    <div class="quiz-status-bar">
      <div class="status-item">
        <span class="status-icon">🎯</span>
        <div class="status-info">
          <div class="status-label">SCORE</div>
          <div class="status-value">{{ score }}</div>
        </div>
      </div>
      
      <div class="status-item">
        <span class="status-icon">📊</span>
        <div class="status-info">
          <div class="status-label">PROGRESS</div>
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
            <span class="progress-text">{{ currentQuestionIndex + 1 }}/{{ questions.length }}</span>
          </div>
        </div>
      </div>
      
      <div class="status-item">
        <span class="status-icon">⚡</span>
        <div class="status-info">
          <div class="status-label">TIME</div>
          <div class="timer" :class="{ 'timer-critical': timeLeft < 10, 'timer-warning': timeLeft < 20 }">
            {{ timeLeft }}s
          </div>
        </div>
      </div>
    </div>

    <!-- Question Area -->
    <transition name="question" mode="out-in">
      <div class="question-area" v-if="!quizEnded" :key="currentQuestionIndex">
        <div class="question-header">
          <span class="question-tag">QUESTION {{ currentQuestionIndex + 1 }}</span>
          <span class="difficulty-tag" :class="currentQuestion.difficulty">
            {{ currentQuestion.difficulty?.toUpperCase() || 'MEDIUM' }}
          </span>
        </div>
        
        <h2 class="question-text">{{ currentQuestion.question }}</h2>
        
        <!-- Options Grid -->
        <div class="options-grid">
          <div
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option-card"
            :class="getOptionClass(index)"
            @click="selectAnswer(index)"
          >
            <div class="option-content">
              <div class="option-header">
                <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
                <div class="option-feedback" v-if="showResult">
                  <span v-if="index === currentQuestion.correctAnswer" class="correct-icon">✓</span>
                  <span v-else-if="selectedAnswer === index" class="wrong-icon">✗</span>
                </div>
              </div>
              <div class="option-text">{{ option }}</div>
            </div>
            
            <div class="option-hover-effect"></div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Action Buttons -->
    <div class="action-bar" v-if="!quizEnded">
      <button
        class="btn-action btn-primary"
        @click="showResult ? nextQuestion() : checkAnswer()"
        :disabled="selectedAnswer === null && !showResult"
        :class="{ 'btn-pulse': selectedAnswer !== null && !showResult }"
      >
        <span class="btn-icon">{{ showResult ? '⏭️' : '🚀' }}</span>
        {{ showResult ? (isLastQuestion ? 'View Results' : 'Next Question') : 'Submit Answer' }}
      </button>
      
      <button
        class="btn-action btn-secondary"
        @click="skipQuestion"
        :disabled="showResult || isAnimating"
      >
        <span class="btn-icon">⏭️</span>
        Skip
      </button>
    </div>

    <!-- Results Screen -->
    <transition name="result" v-if="quizEnded">
      <div class="results-screen">
        <div class="results-header">
          <h2 class="results-title">MISSION COMPLETE</h2>
          <p class="results-subtitle">Your performance has been recorded</p>
        </div>
        
        <div class="results-stats">
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
              <div class="stat-label">FINAL SCORE</div>
              <div class="stat-value">{{ score }}</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <div class="stat-label">ACCURACY</div>
              <div class="stat-value">{{ Math.round((correctAnswers / questions.length) * 100) }}%</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-content">
              <div class="stat-label">AVG TIME</div>
              <div class="stat-value">{{ Math.round(totalTime / questions.length) }}s</div>
            </div>
          </div>
        </div>
        
        <div class="results-actions">
          <button class="btn-results btn-leaderboard" @click="emitComplete">
            <span class="btn-icon">🏆</span>
            View Leaderboard
          </button>
        </div>
      </div>
    </transition>

    <!-- Floating Elements -->
    <div class="floating-elements">
      <div class="floating-element" v-for="n in 3" :key="n"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'Quiz',
  emits: ['quiz-completed', 'play-again'],
  setup(props, { emit }) {
    const questions = ref([
      {
        question: 'Which data structure uses LIFO (Last In, First Out) principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Stack uses LIFO principle while Queue uses FIFO.'
      },
      {
        question: 'What does API stand for in software development?',
        options: [
          'Application Programming Interface',
          'Advanced Programming Interface',
          'Application Process Integration',
          'Automated Programming Interface'
        ],
        correctAnswer: 0,
        difficulty: 'medium',
        explanation: 'API stands for Application Programming Interface.'
      },
      {
        question: 'Which protocol is used for secure web browsing?',
        options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts data.'
      },
      {
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctAnswer: 1,
        difficulty: 'hard',
        explanation: 'Binary search has O(log n) time complexity.'
      },
      {
        question: 'Which language is primarily used for iOS development?',
        options: ['Java', 'Kotlin', 'Swift', 'C#'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'Swift is Apple\'s programming language for iOS development.'
      },
      {
        question: 'What does CSS stand for?',
        options: [
          'Computer Style Sheets',
          'Creative Style System',
          'Cascading Style Sheets',
          'Colorful Style Sheets'
        ],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'CSS stands for Cascading Style Sheets.'
      },
      {
        question: 'Which database is known for being a NoSQL document store?',
        options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'MongoDB is a popular NoSQL document database.'
      },
      {
        question: 'What is the purpose of Docker in software development?',
        options: [
          'Code Version Control',
          'Containerization',
          'Load Balancing',
          'Database Management'
        ],
        correctAnswer: 1,
        difficulty: 'hard',
        explanation: 'Docker is used for containerization of applications.'
      }
    ])

    const currentQuestionIndex = ref(0)
    const selectedAnswer = ref(null)
    const score = ref(0)
    const correctAnswers = ref(0)
    const showResult = ref(false)
    const quizEnded = ref(false)
    const timeLeft = ref(30)
    const timer = ref(null)
    const isAnimating = ref(false)
    const totalTime = ref(0)
    const startTime = ref(Date.now())

    const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
    const progress = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100)
    const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)

    const startTimer = () => {
      clearInterval(timer.value)
      timeLeft.value = 30
      startTime.value = Date.now()
      timer.value = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--
        } else {
          clearInterval(timer.value)
          if (!showResult.value) {
            checkAnswer()
          }
        }
      }, 1000)
    }

    const selectAnswer = (index) => {
      if (!showResult.value && !isAnimating.value) {
        selectedAnswer.value = index
        
        // Animate selection
        const optionCards = document.querySelectorAll('.option-card')
        optionCards.forEach((card, i) => {
          if (i === index) {
            gsap.to(card, {
              scale: 1.02,
              duration: 0.2,
              ease: "power2.out"
            })
          } else {
            gsap.to(card, {
              opacity: 0.7,
              duration: 0.2,
              ease: "power2.out"
            })
          }
        })
      }
    }

    const checkAnswer = () => {
      if (selectedAnswer.value === null && !showResult.value) return

      if (!showResult.value) {
        showResult.value = true
        clearInterval(timer.value)
        totalTime.value += 30 - timeLeft.value
        
        const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer
        
        if (isCorrect) {
          correctAnswers.value++
          const timeBonus = Math.floor(timeLeft.value * 3)
          score.value += 100 + timeBonus
          
          // Animate correct answer
          gsap.to('.option-card.correct', {
            scale: 1.05,
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
            duration: 0.5,
            yoyo: true,
            repeat: 1
          })
        } else {
          // Animate wrong answer
          gsap.to('.option-card.wrong', {
            x: [0, -10, 10, -10, 10, 0],
            duration: 0.6,
            ease: "power2.out"
          })
        }
        
        // Animate score update
        gsap.fromTo('.status-value',
          { scale: 1.3, color: '#10b981' },
          { scale: 1, color: '#f8fafc', duration: 0.7, ease: "elastic.out(1, 0.3)" }
        )
      } else {
        nextQuestion()
      }
    }

    const skipQuestion = () => {
      if (!isAnimating.value) {
        isAnimating.value = true
        
        gsap.to('.question-area', {
          opacity: 0,
          x: -100,
          duration: 0.3,
          onComplete: () => {
            nextQuestion()
            isAnimating.value = false
          }
        })
      }
    }

    const nextQuestion = () => {
      if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value++
        selectedAnswer.value = null
        showResult.value = false
        startTimer()
        
        gsap.fromTo('.question-area',
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        )
      } else {
        endQuiz()
      }
    }

    const endQuiz = () => {
      quizEnded.value = true
      clearInterval(timer.value)
      
      gsap.from('.results-screen', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
    }

    const emitComplete = () => {
      emit('quiz-completed', score.value)
    }

    const getOptionClass = (index) => {
      if (!showResult.value) {
        return selectedAnswer.value === index ? 'selected' : ''
      }
      
      if (index === currentQuestion.value.correctAnswer) {
        return 'correct'
      }
      
      if (selectedAnswer.value === index && index !== currentQuestion.value.correctAnswer) {
        return 'wrong'
      }
      
      return ''
    }

    onMounted(() => {
      startTimer()
      
      gsap.from('.quiz-status-bar', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      })
      
      gsap.from('.question-area', {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        delay: 0.4
      })
      
      // Floating elements animation
      gsap.to('.floating-element', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      })
    })

    onUnmounted(() => {
      clearInterval(timer.value)
    })

    return {
      questions,
      currentQuestionIndex,
      selectedAnswer,
      score,
      correctAnswers,
      showResult,
      quizEnded,
      timeLeft,
      isAnimating,
      totalTime,
      currentQuestion,
      progress,
      isLastQuestion,
      selectAnswer,
      checkAnswer,
      skipQuestion,
      nextQuestion,
      emitComplete,
      getOptionClass
    }
  }
}
</script>

<style scoped>
.quiz-container {
  background: var(--bg-secondary);
  border-radius: 24px;
  padding: 2.5rem;
  width: 100%;
  max-width: 900px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 60px var(--shadow-color);
}

.dark-card {
  background: linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary));
}

/* Status Bar */
.quiz-status-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.status-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.status-item:hover {
  transform: translateY(-2px);
  border-color: var(--accent-primary);
}

.status-icon {
  font-size: 2rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.status-info {
  flex: 1;
}

.status-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.status-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
}

.progress-container {
  position: relative;
  height: 8px;
  background: var(--bg-primary);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-bar {
  position: absolute;
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.timer {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
}

.timer-warning {
  color: #f59e0b;
  animation: pulse 1s infinite;
}

.timer-critical {
  color: #ef4444;
  animation: pulse 0.5s infinite;
}

/* Question Area */
.question-area {
  margin-bottom: 2.5rem;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.question-tag {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-primary);
  background: rgba(99, 102, 241, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.difficulty-tag {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.difficulty-tag.easy {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.difficulty-tag.medium {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.difficulty-tag.hard {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.question-text {
  font-size: 1.8rem;
  line-height: 1.4;
  color: var(--text-primary);
  margin-bottom: 3rem;
  font-weight: 500;
}

/* Options Grid */
.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.option-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.option-card:hover:not(.selected):not(.correct):not(.wrong) {
  transform: translateY(-2px);
  border-color: var(--accent-primary);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
}

.option-card.selected {
  border-color: var(--accent-primary);
  background: rgba(99, 102, 241, 0.1);
}

.option-card.correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.option-card.wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.option-content {
  position: relative;
  z-index: 2;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--gradient-primary);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.1rem;
}

.option-card.selected .option-letter {
  background: var(--gradient-primary);
}

.option-card.correct .option-letter {
  background: linear-gradient(135deg, #10b981, #059669);
}

.option-card.wrong .option-letter {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.option-feedback {
  font-size: 1.2rem;
}

.correct-icon {
  color: #10b981;
}

.wrong-icon {
  color: #ef4444;
}

.option-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.option-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.option-card:hover .option-hover-effect {
  opacity: 0.05;
}

/* Action Bar */
.action-bar {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.btn-action {
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  min-width: 200px;
  justify-content: center;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-pulse {
  animation: pulse 2s infinite;
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--bg-secondary);
  transform: translateY(-2px);
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.2rem;
}

/* Results Screen */
.results-screen {
  text-align: center;
  padding: 2rem 0;
}

.results-header {
  margin-bottom: 3rem;
}

.results-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.results-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
}

.stat-icon {
  font-size: 2.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-content {
  text-align: left;
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.results-actions {
  display: flex;
  justify-content: center;
}

.btn-results {
  padding: 1.25rem 3rem;
  border: none;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.btn-leaderboard {
  background: var(--gradient-secondary);
  color: white;
}

.btn-leaderboard:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(139, 92, 246, 0.4);
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  width: 100px;
  height: 100px;
  background: var(--gradient-primary);
  opacity: 0.03;
  border-radius: 50%;
  filter: blur(40px);
}

.floating-element:nth-child(1) {
  top: 10%;
  left: 10%;
}

.floating-element:nth-child(2) {
  top: 60%;
  right: 10%;
}

.floating-element:nth-child(3) {
  bottom: 20%;
  left: 20%;
}

/* Transitions */
.question-enter-active,
.question-leave-active {
  transition: all 0.5s ease;
}

.question-enter-from,
.question-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.result-enter-active {
  transition: all 0.8s ease;
}

.result-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .quiz-container {
    padding: 1.5rem;
  }
  
  .quiz-status-bar {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .question-text {
    font-size: 1.5rem;
  }
  
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .results-stats {
    grid-template-columns: 1fr;
  }
  
  .btn-action {
    min-width: auto;
    flex: 1;
  }
  
  .action-bar {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .question-text {
    font-size: 1.3rem;
  }
  
  .results-title {
    font-size: 2rem;
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  .stat-value {
    font-size: 1.8rem;
  }
}
</style>