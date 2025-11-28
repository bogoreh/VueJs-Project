<template>
  <div class="calculator">
    <div class="display">
      {{ displayValue || '0' }}
    </div>
    
    <div class="buttons">
      <button @click="clear" class="btn clear">C</button>
      <button @click="backspace" class="btn operator">⌫</button>
      <button @click="append('%')" class="btn operator">%</button>
      <button @click="append('/')" class="btn operator">/</button>
      
      <button @click="append('7')" class="btn">7</button>
      <button @click="append('8')" class="btn">8</button>
      <button @click="append('9')" class="btn">9</button>
      <button @click="append('*')" class="btn operator">×</button>
      
      <button @click="append('4')" class="btn">4</button>
      <button @click="append('5')" class="btn">5</button>
      <button @click="append('6')" class="btn">6</button>
      <button @click="append('-')" class="btn operator">-</button>
      
      <button @click="append('1')" class="btn">1</button>
      <button @click="append('2')" class="btn">2</button>
      <button @click="append('3')" class="btn">3</button>
      <button @click="append('+')" class="btn operator">+</button>
      
      <button @click="append('0')" class="btn zero">0</button>
      <button @click="append('.')" class="btn">.</button>
      <button @click="calculate" class="btn equals">=</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      displayValue: '',
      previousValue: null,
      operator: null,
      waitingForNewValue: false
    }
  },
  methods: {
    append(value) {
      if (this.waitingForNewValue) {
        this.displayValue = value
        this.waitingForNewValue = false
      } else {
        this.displayValue = this.displayValue === '0' ? value : this.displayValue + value
      }
    },
    
    clear() {
      this.displayValue = ''
      this.previousValue = null
      this.operator = null
      this.waitingForNewValue = false
    },
    
    backspace() {
      this.displayValue = this.displayValue.slice(0, -1)
      if (this.displayValue === '') {
        this.displayValue = '0'
      }
    },
    
    setOperator(newOperator) {
      if (this.displayValue === '') return
      
      if (this.previousValue !== null && this.operator && !this.waitingForNewValue) {
        this.calculate()
      }
      
      this.operator = newOperator
      this.previousValue = parseFloat(this.displayValue)
      this.waitingForNewValue = true
    },
    
    calculate() {
      if (this.previousValue === null || this.operator === null) return
      
      const currentValue = parseFloat(this.displayValue)
      let result
      
      switch (this.operator) {
        case '+':
          result = this.previousValue + currentValue
          break
        case '-':
          result = this.previousValue - currentValue
          break
        case '*':
          result = this.previousValue * currentValue
          break
        case '/':
          result = currentValue !== 0 ? this.previousValue / currentValue : 'Error'
          break
        case '%':
          result = this.previousValue % currentValue
          break
        default:
          return
      }
      
      this.displayValue = result.toString()
      this.previousValue = null
      this.operator = null
      this.waitingForNewValue = true
    }
  },
  watch: {
    displayValue: {
      handler(newVal) {
        // Handle operator buttons
        if (['+', '-', '*', '/', '%'].includes(newVal.slice(-1))) {
          this.setOperator(newVal.slice(-1))
          this.displayValue = this.displayValue.slice(0, -1)
        }
      },
      immediate: false
    }
  }
}
</script>

<style scoped>
.calculator {
  max-width: 300px;
  margin: 0 auto;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.display {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 15px;
  min-height: 40px;
  word-wrap: break-word;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: #e0e0e0;
}

.btn.operator {
  background: #ff9500;
  color: white;
}

.btn.operator:hover {
  background: #e08500;
}

.btn.clear {
  background: #ff3b30;
  color: white;
}

.btn.clear:hover {
  background: #e0352b;
}

.btn.equals {
  background: #007aff;
  color: white;
}

.btn.equals:hover {
  background: #0069d9;
}

.zero {
  grid-column: span 2;
}
</style>