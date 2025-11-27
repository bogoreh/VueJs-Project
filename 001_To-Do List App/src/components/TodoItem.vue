<template>
  <div class="todo" :class="{ completed: todo.completed, editing: todo.editing }">
    <!-- View Mode -->
    <div v-if="!todo.editing" class="view">
      <input 
        type="checkbox" 
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
        class="toggle"
      >
      <label 
        @dblclick="startEditing"
        :class="{ completed: todo.completed }"
      >
        {{ todo.text }}
      </label>
      <button @click="$emit('delete', todo.id)" class="destroy">×</button>
    </div>

    <!-- Edit Mode -->
    <input 
      v-else
      v-model="editText"
      @blur="finishEditing"
      @keyup.enter="finishEditing"
      @keyup.escape="cancelEditing"
      class="edit"
      v-focus
    >
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  emits: ['toggle', 'delete', 'edit'],
  setup(props, { emit }) {
    const editText = ref('')
    const originalText = ref('')

    const startEditing = () => {
      originalText.value = props.todo.text
      editText.value = props.todo.text
      props.todo.editing = true
    }

    const finishEditing = () => {
      if (editText.value.trim()) {
        emit('edit', props.todo.id, editText.value)
      } else {
        emit('delete', props.todo.id)
      }
      props.todo.editing = false
    }

    const cancelEditing = () => {
      editText.value = originalText.value
      props.todo.editing = false
    }

    return {
      editText,
      startEditing,
      finishEditing,
      cancelEditing
    }
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.todo {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo:last-child {
  border-bottom: none;
}

.view {
  display: flex;
  align-items: center;
  width: 100%;
}

.toggle {
  margin-right: 10px;
}

label {
  flex: 1;
  margin-right: 10px;
  cursor: pointer;
  transition: color 0.3s;
}

label.completed {
  text-decoration: line-through;
  color: #888;
}

.destroy {
  background: none;
  border: none;
  font-size: 20px;
  color: #cc9a9a;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.destroy:hover {
  color: #af5b5e;
}

.edit {
  flex: 1;
  padding: 10px;
  border: 1px solid #4CAF50;
  border-radius: 4px;
  font-size: 16px;
}

.todo.editing {
  border-bottom: 1px solid #4CAF50;
}
</style>