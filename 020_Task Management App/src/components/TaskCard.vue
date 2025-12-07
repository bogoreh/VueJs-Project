<template>
  <div 
    class="task-card"
    :style="{ borderLeftColor: task.color }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="task-header">
      <h4 class="task-title">{{ task.title }}</h4>
      <button class="btn-delete-task" @click="deleteTask">×</button>
    </div>
    
    <p class="task-description" v-if="task.description">{{ task.description }}</p>
    
    <div class="task-footer">
      <div class="task-actions">
        <button class="btn-edit-task" @click="editTask">Edit</button>
      </div>
      <div class="task-meta">
        <span class="task-id">#{{ task.id }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    columnId: {
      type: Number,
      required: true
    },
    boardId: {
      type: Number,
      required: true
    }
  },
  emits: ['update-task', 'delete-task', 'task-drag-start'],
  setup(props, { emit }) {
    const isEditing = ref(false)
    const editedTask = ref({ ...props.task })

    const handleDragStart = (event) => {
      event.dataTransfer.setData('text/plain', props.task.id)
      event.dataTransfer.effectAllowed = 'move'
      
      // Add visual feedback
      event.target.classList.add('dragging')
      
      // Notify parent about drag start
      emit('task-drag-start', props.task.id)
    }

    const handleDragEnd = (event) => {
      event.target.classList.remove('dragging')
    }

    const editTask = () => {
      const newTitle = prompt('Enter new task title:', props.task.title)
      if (newTitle && newTitle.trim() !== '') {
        const newDescription = prompt('Enter new task description:', props.task.description)
        
        const updatedTask = {
          ...props.task,
          title: newTitle.trim(),
          description: newDescription ? newDescription.trim() : props.task.description
        }
        
        emit('update-task', updatedTask)
      }
    }

    const deleteTask = () => {
      if (confirm('Are you sure you want to delete this task?')) {
        emit('delete-task', props.task.id)
      }
    }

    return {
      isEditing,
      editedTask,
      handleDragStart,
      handleDragEnd,
      editTask,
      deleteTask
    }
  }
}
</script>