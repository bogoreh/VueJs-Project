<template>
  <div id="app">
    <header class="app-header">
      <h1>📋 Trello Clone</h1>
      <div class="user-controls">
        <button class="add-board-btn" @click="addNewBoard">+ Add New Board</button>
        <div class="user-avatar">JD</div>
      </div>
    </header>
    
    <main class="app-main">
      <div class="boards-container">
        <Board 
          v-for="board in boards" 
          :key="board.id"
          :board="board"
          @update-board="updateBoard"
          @delete-board="deleteBoard"
        />
      </div>
    </main>
    
    <div class="app-footer">
      <p>Drag and drop tasks between columns.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  },
  setup() {
    const boards = ref([
      {
        id: 1,
        title: 'Product Roadmap',
        columns: [
          {
            id: 1,
            title: 'To Do',
            tasks: [
              { id: 1, title: 'Design UI mockups', description: 'Create mockups for new dashboard', color: '#FF6B6B' },
              { id: 2, title: 'User research', description: 'Conduct interviews with 5 users', color: '#4ECDC4' },
              { id: 3, title: 'Write project brief', description: 'Document project requirements', color: '#FFD166' }
            ]
          },
          {
            id: 2,
            title: 'In Progress',
            tasks: [
              { id: 4, title: 'Develop auth system', description: 'Implement JWT authentication', color: '#06D6A0' },
              { id: 5, title: 'API integration', description: 'Connect frontend to backend API', color: '#118AB2' }
            ]
          },
          {
            id: 3,
            title: 'Review',
            tasks: [
              { id: 6, title: 'Code review', description: 'Review PR #45 from dev team', color: '#EF476F' },
              { id: 7, title: 'Test mobile responsiveness', description: 'Check UI on mobile devices', color: '#073B4C' }
            ]
          },
          {
            id: 4,
            title: 'Done',
            tasks: [
              { id: 8, title: 'Set up development environment', description: 'Install all required dependencies', color: '#7209B7' },
              { id: 9, title: 'Create project repository', description: 'Initialize Git repo with README', color: '#F15BB5' }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Marketing Campaign',
        columns: [
          {
            id: 5,
            title: 'Backlog',
            tasks: [
              { id: 10, title: 'Social media posts', description: 'Create content for LinkedIn', color: '#FF9E00' }
            ]
          },
          {
            id: 6,
            title: 'Active',
            tasks: [
              { id: 11, title: 'Email newsletter', description: 'Design Q3 newsletter', color: '#00BBF9' }
            ]
          },
          {
            id: 7,
            title: 'Completed',
            tasks: [
              { id: 12, title: 'Website banner', description: 'Update homepage banner', color: '#00F5D4' }
            ]
          }
        ]
      }
    ])

    let boardIdCounter = 3
    let columnIdCounter = 8
    let taskIdCounter = 13

    const addNewBoard = () => {
      const newBoard = {
        id: boardIdCounter++,
        title: `New Board ${boardIdCounter - 2}`,
        columns: [
          {
            id: columnIdCounter++,
            title: 'To Do',
            tasks: []
          },
          {
            id: columnIdCounter++,
            title: 'In Progress',
            tasks: []
          },
          {
            id: columnIdCounter++,
            title: 'Done',
            tasks: []
          }
        ]
      }
      
      boards.value.push(newBoard)
    }

    const updateBoard = (updatedBoard) => {
      const index = boards.value.findIndex(board => board.id === updatedBoard.id)
      if (index !== -1) {
        boards.value[index] = updatedBoard
      }
    }

    const deleteBoard = (boardId) => {
      boards.value = boards.value.filter(board => board.id !== boardId)
    }

    return {
      boards,
      addNewBoard,
      updateBoard,
      deleteBoard
    }
  }
}
</script>