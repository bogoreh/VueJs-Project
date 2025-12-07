<template>
  <div 
    class="column" 
    :data-column-id="column.id"
    @dragover.prevent="handleDragOver"
    @drop="handleDrop"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
  >
    <div class="column-header">
      <h3 class="column-title">{{ column.title }}</h3>
      <div class="column-actions">
        <span class="task-count">{{ column.tasks.length }}</span>
        <button class="btn-add-task" @click="addNewTask">+</button>
        <button class="btn-delete-column" @click="deleteColumn">×</button>
      </div>
    </div>
    
    <div class="tasks-container" ref="tasksContainer">
      <TaskCard 
        v-for="(task, index) in column.tasks" 
        :key="task.id"
        :task="task"
        :task-index="index"
        :column-id="column.id"
        :board-id="boardId"
        @update-task="updateTask"
        @delete-task="deleteTask"
        @task-drag-start="handleTaskDragStart"
      />
      
      <div class="add-task-placeholder" v-if="column.tasks.length === 0">
        <p>No tasks yet. Drag tasks here or add a new one!</p>
      </div>
    </div>
    
    <div class="column-footer">
      <button class="btn-add-task-full" @click="addNewTask">
        + Add a task
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import TaskCard from './TaskCard.vue'

export default {
  name: 'Column',
  components: {
    TaskCard
  },
  props: {
    column: {
      type: Object,
      required: true
    },
    boardId: {
      type: Number,
      required: true
    }
  },
  emits: ['update-column', 'delete-column', 'task-dragged'],
  setup(props, { emit }) {
    const tasksContainer = ref(null)
    let taskIdCounter = 1000
    const dragOver = ref(false)

    const addNewTask = () => {
      const updatedColumn = { ...props.column }
      const newTask = {
        id: taskIdCounter++,
        title: `New Task ${updatedColumn.tasks.length + 1}`,
        description: 'Task description goes here',
        color: getRandomColor()
      }
      
      updatedColumn.tasks.push(newTask)
      emit('update-column', updatedColumn)
    }

    const updateTask = (updatedTask) => {
      const updatedColumn = { ...props.column }
      const taskIndex = updatedColumn.tasks.findIndex(task => task.id === updatedTask.id)
      
      if (taskIndex !== -1) {
        updatedColumn.tasks[taskIndex] = updatedTask
        emit('update-column', updatedColumn)
      }
    }

    const deleteTask = (taskId) => {
      const updatedColumn = { ...props.column }
      updatedColumn.tasks = updatedColumn.tasks.filter(task => task.id !== taskId)
      emit('update-column', updatedColumn)
    }

    const deleteColumn = () => {
      emit('delete-column', props.column.id)
    }

    const handleTaskDragStart = (taskId) => {
      // Store the dragged task info
      window.currentDraggedTask = {
        taskId,
        sourceColumnId: props.column.id,
        boardId: props.boardId
      }
    }

    const handleDragOver = (event) => {
      event.preventDefault()
      dragOver.value = true
    }

    const handleDragEnter = () => {
      dragOver.value = true
    }

    const handleDragLeave = (event) => {
      // Only set to false if leaving the column itself, not a child element
      if (!event.currentTarget.contains(event.relatedTarget)) {
        dragOver.value = false
      }
    }

    const handleDrop = (event) => {
      event.preventDefault()
      dragOver.value = false
      
      const draggedTask = window.currentDraggedTask
      if (!draggedTask || draggedTask.boardId !== props.boardId) return
      
      // Calculate drop position
      const tasksContainerEl = tasksContainer.value
      const tasks = Array.from(tasksContainerEl.querySelectorAll('.task-card'))
      const dropY = event.clientY
      
      let targetIndex = props.column.tasks.length
      
      for (let i = 0; i < tasks.length; i++) {
        const taskRect = tasks[i].getBoundingClientRect()
        const taskCenterY = taskRect.top + taskRect.height / 2
        
        if (dropY < taskCenterY) {
          targetIndex = i
          break
        }
      }
      
      // Emit the drag event to parent
      emit('task-dragged', {
        taskId: draggedTask.taskId,
        sourceColumnId: draggedTask.sourceColumnId,
        targetColumnId: props.column.id,
        targetIndex
      })
      
      // Clear the dragged task
      window.currentDraggedTask = null
    }

    const getRandomColor = () => {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', 
        '#118AB2', '#EF476F', '#073B4C', '#7209B7',
        '#F15BB5', '#FF9E00', '#00BBF9', '#00F5D4'
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    return {
      tasksContainer,
      dragOver,
      addNewTask,
      updateTask,
      deleteTask,
      deleteColumn,
      handleTaskDragStart,
      handleDragOver,
      handleDragEnter,
      handleDragLeave,
      handleDrop
    }
  }
}
</script>