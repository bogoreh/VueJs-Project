<template>
  <div class="question-card" :class="{ 'fade-out': isTransitioning }">
    <div class="question-header">
      <div class="question-number">
        Question {{ questionNumber }}
      </div>
      <div class="question-points">
        <span class="points-label">Points:</span>
        <span class="points-value">{{ points }}</span>
      </div>
    </div>

    <h3 class="question-text">{{ questionData.question }}</h3>

    <div class="options-container">
      <button
        v-for="(option, index) in questionData.options"
        :key="index"
        class="option"
        :class="getOptionClass(index)"
        @click="handleOptionClick(index)"
        :disabled="isAnswered"
      >
        <div class="option-content">
          <div class="option-index">
            {{ String.fromCharCode(65 + index) }}
          </div>
          <div class="option-text">{{ option }}</div>
          <div class="option-feedback" v-if="isAnswered">
            <span v-if="index === questionData.correctAnswer">✅</span>
            <span v-else-if="index === selectedOption && index !== questionData.correctAnswer">❌</span>
          </div>
        </div>
      </button>
    </div>

    <div class="question-footer" v-if="isAnswered">
      <div class="feedback" :class="isCorrect ? 'correct' : 'incorrect'">
        <span v-if="isCorrect">🎉 Correct! +{{ points }} points</span>
        <span v-else>❌ Incorrect! The correct answer is: {{ getCorrectAnswerText() }}</span>
      </div>
      <div class="explanation" v-if="questionData.explanation">
        💡 {{ questionData.explanation }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'Question',
  props: {
    questionData: {
      type: Object,
      required: true
    },
    questionNumber: {
      type: Number,
      required: true
    },
    timeLeft: {
      type: Number,
      default: 30
    }
  },
  emits: ['answer-selected', 'time-up'],
  setup(props, { emit }) {
    const selectedOption = ref(null)
    const isAnswered = ref(false)
    const isCorrect = ref(false)
    const isTransitioning = ref(false)

    const points = computed(() => {
      // Base points + time bonus
      const basePoints = 100
      const timeBonus = Math.floor(props.timeLeft * 2)
      return basePoints + timeBonus
    })

    const handleOptionClick = (index) => {
      if (isAnswered.value) return

      selectedOption.value = index
      isAnswered.value = true
      isCorrect.value = index === props.questionData.correctAnswer

      // Animate selection
      const optionElement = document.querySelector(`.option:nth-child(${index + 1})`)
      if (optionElement) {
        if (isCorrect.value) {
          gsap.to(optionElement, {
            scale: 1.05,
            backgroundColor: '#10b981',
            duration: 0.3,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
              emit('answer-selected', {
                isCorrect: true,
                points: points.value,
                selectedOption: index
              })
            }
          })
        } else {
          gsap.to(optionElement, {
            x: [0, -10, 10, -10, 10, 0],
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              emit('answer-selected', {
                isCorrect: false,
                points: 0,
                selectedOption: index
              })
            }
          })
        }
      }
    }

    const getOptionClass = (index) => {
      if (!isAnswered.value) {
        return selectedOption.value === index ? 'selected' : ''
      }
      
      if (index === props.questionData.correctAnswer) {
        return 'correct'
      }
      
      if (index === selectedOption.value && index !== props.questionData.correctAnswer) {
        return 'incorrect'
      }
      
      return ''
    }

    const getCorrectAnswerText = () => {
      const correctIndex = props.questionData.correctAnswer
      const letter = String.fromCharCode(65 + correctIndex)
      return `${letter}. ${props.questionData.options[correctIndex]}`
    }

    const animateOut = () => {
      isTransitioning.value = true
      return gsap.to('.question-card', {
        opacity: 0,
        x: -100,
        duration: 0.3
      })
    }

    const animateIn = () => {
      return gsap.fromTo('.question-card',
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5 }
      )
    }

    // Watch for time up
    const checkTimeUp = () => {
      if (props.timeLeft <= 0 && !isAnswered.value) {
        isAnswered.value = true
        emit('time-up')
      }
    }

    return {
      selectedOption,
      isAnswered,
      isCorrect,
      isTransitioning,
      points,
      handleOptionClick,
      getOptionClass,
      getCorrectAnswerText,
      animateOut,
      animateIn,
      checkTimeUp
    }
  }
}
</script>

<style scoped>
.question-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.question-card.fade-out {
  opacity: 0;
  transform: translateX(-30px);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.question-number {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3b82f6;
  background: #eff6ff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.question-points {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.points-label {
  color: #6b7280;
  font-size: 0.9rem;
}

.points-value {
  color: #10b981;
  font-size: 1.2rem;
  background: #d1fae5;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
}

.question-text {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 2rem;
  line-height: 1.4;
  text-align: center;
}

.options-container {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option {
  display: block;
  width: 100%;
  padding: 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.option:hover:not(:disabled) {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.option.selected {
  border-color: #3b82f6;
  background: #eff6ff;
}

.option.correct {
  border-color: #10b981;
  background: #d1fae5;
}

.option.incorrect {
  border-color: #ef4444;
  background: #fee2e2;
}

.option:disabled {
  cursor: not-allowed;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.option-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #f3f4f6;
  border-radius: 50%;
  font-weight: bold;
  color: #374151;
  flex-shrink: 0;
}

.option.selected .option-index {
  background: #3b82f6;
  color: white;
}

.option.correct .option-index {
  background: #10b981;
  color: white;
}

.option.incorrect .option-index {
  background: #ef4444;
  color: white;
}

.option-text {
  flex: 1;
  font-size: 1rem;
  color: #374151;
}

.option-feedback {
  font-size: 1.2rem;
}

.question-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
}

.feedback {
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.feedback.correct {
  background: #d1fae5;
  color: #065f46;
}

.feedback.incorrect {
  background: #fee2e2;
  color: #991b1b;
}

.explanation {
  font-size: 1rem;
  color: #6b7280;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 10px;
  line-height: 1.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .question-card {
    padding: 1.5rem;
  }
  
  .question-text {
    font-size: 1.3rem;
  }
  
  .option {
    padding: 1rem;
  }
  
  .option-content {
    gap: 0.75rem;
  }
}
</style>