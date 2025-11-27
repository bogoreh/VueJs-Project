<template>
  <div class="app">
    <div class="container">
      <h1>Todo List</h1>
      
      <!-- Add Todo Form -->
      <div class="add-todo">
        <input 
          v-model="newTodo" 
          @keyup.enter="addTodo"
          placeholder="What needs to be done?"
          class="todo-input"
        >
        <button @click="addTodo" class="add-btn">Add</button>
      </div>

      <!-- Todo List -->
      <div class="todo-list">
        <div 
          v-for="todo in filteredTodos" 
          :key="todo.id"
          class="todo-item"
        >
          <TodoItem 
            :todo="todo"
            @toggle="toggleTodo"
            @delete="deleteTodo"
            @edit="editTodo"
          />
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredTodos.length === 0" class="empty-state">
          No todos found
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="todo-count">
          {{ activeTodosCount }} items left
        </div>
        
        <!-- Filters -->
        <div class="filters">
          <button 
            v-for="filter in filters" 
            :key="filter"
            @click="currentFilter = filter"
            :class="{ active: currentFilter === filter }"
            class="filter-btn"
          >
            {{ filter }}
          </button>
        </div>

        <!-- Clear Completed -->
        <button 
          v-if="hasCompletedTodos"
          @click="clearCompleted"
          class="clear-btn"
        >
          Clear Completed
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import TodoItem from './components/TodoItem.vue'

export default {
  name: 'App',
  components: {
    TodoItem
  },
  setup() {
    const todos = ref([])
    const newTodo = ref('')
    const currentFilter = ref('All')
    const filters = ['All', 'Active', 'Completed']

    // Computed properties
    const activeTodosCount = computed(() => {
      return todos.value.filter(todo => !todo.completed).length
    })

    const hasCompletedTodos = computed(() => {
      return todos.value.some(todo => todo.completed)
    })

    const filteredTodos = computed(() => {
      switch (currentFilter.value) {
        case 'Active':
          return todos.value.filter(todo => !todo.completed)
        case 'Completed':
          return todos.value.filter(todo => todo.completed)
        default:
          return todos.value
      }
    })

    // Methods
    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: Date.now(),
          text: newTodo.value.trim(),
          completed: false,
          editing: false
        })
        newTodo.value = ''
      }
    }

    const toggleTodo = (id) => {
      const todo = todos.value.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }

    const deleteTodo = (id) => {
      todos.value = todos.value.filter(todo => todo.id !== id)
    }

    const editTodo = (id, newText) => {
      const todo = todos.value.find(todo => todo.id === id)
      if (todo && newText.trim()) {
        todo.text = newText.trim()
      }
    }

    const clearCompleted = () => {
      todos.value = todos.value.filter(todo => !todo.completed)
    }

    return {
      todos,
      newTodo,
      currentFilter,
      filters,
      activeTodosCount,
      hasCompletedTodos,
      filteredTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted
    }
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.add-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background: #45a049;
}

.todo-list {
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 20px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.todo-count {
  color: #666;
}

.filters {
  display: flex;
  gap: 5px;
}

.filter-btn {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.filter-btn.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.clear-btn {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  color: #ff4444;
}

.clear-btn:hover {
  background: #ff4444;
  color: white;
}
</style>