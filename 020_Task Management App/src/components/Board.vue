<template>
  <div class="board" :data-board-id="board.id">
    <div class="board-header">
      <h2 class="board-title">{{ board.title }}</h2>
      <div class="board-actions">
        <button class="btn-add-column" @click="addNewColumn">+ Add Column</button>
        <button class="btn-delete-board" @click="deleteBoard">×</button>
      </div>
    </div>
    
    <div class="columns-container">
      <Column 
        v-for="column in board.columns" 
        :key="column.id"
        :column="column"
        :board-id="board.id"
        @update-column="updateColumn"
        @delete-column="deleteColumn"
        @task-dragged="handleTaskDrag"
      />
      
      <div class="add-column-placeholder" v-if="board.columns.length === 0">
        <p>No columns yet. Add one to get started!</p>
        <button class="btn-add-first-column" @click="addNewColumn">+ Add First Column</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Column from './Column.vue'

export default {
  name: 'Board',
  components: {
    Column
  },
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  emits: ['update-board', 'delete-board'],
  setup(props, { emit }) {
    let columnIdCounter = 100
    let taskIdCounter = 1000

    const addNewColumn = () => {
      const updatedBoard = { ...props.board }
      const newColumn = {
        id: columnIdCounter++,
        title: `New Column ${updatedBoard.columns.length + 1}`,
        tasks: []
      }
      
      updatedBoard.columns.push(newColumn)
      emit('update-board', updatedBoard)
    }

    const updateColumn = (updatedColumn) => {
      const updatedBoard = { ...props.board }
      const columnIndex = updatedBoard.columns.findIndex(col => col.id === updatedColumn.id)
      
      if (columnIndex !== -1) {
        updatedBoard.columns[columnIndex] = updatedColumn
        emit('update-board', updatedBoard)
      }
    }

    const deleteColumn = (columnId) => {
      const updatedBoard = { ...props.board }
      updatedBoard.columns = updatedBoard.columns.filter(col => col.id !== columnId)
      emit('update-board', updatedBoard)
    }

    const deleteBoard = () => {
      emit('delete-board', props.board.id)
    }

    const handleTaskDrag = ({ taskId, sourceColumnId, targetColumnId, targetIndex }) => {
      const updatedBoard = { ...props.board }
      
      // Find source column and task
      const sourceColumn = updatedBoard.columns.find(col => col.id === sourceColumnId)
      const targetColumn = updatedBoard.columns.find(col => col.id === targetColumnId)
      
      if (!sourceColumn || !targetColumn) return
      
      const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId)
      if (taskIndex === -1) return
      
      // Remove task from source column
      const [task] = sourceColumn.tasks.splice(taskIndex, 1)
      
      // Insert task into target column at the specified position
      if (targetIndex >= 0 && targetIndex <= targetColumn.tasks.length) {
        targetColumn.tasks.splice(targetIndex, 0, task)
      } else {
        targetColumn.tasks.push(task)
      }
      
      emit('update-board', updatedBoard)
    }

    return {
      addNewColumn,
      updateColumn,
      deleteColumn,
      deleteBoard,
      handleTaskDrag
    }
  }
}
</script>