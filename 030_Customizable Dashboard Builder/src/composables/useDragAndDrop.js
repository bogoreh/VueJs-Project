import { ref } from 'vue'

export function useDragAndDrop() {
  const draggedWidget = ref(null)
  const dropTarget = ref(null)

  const handleDragStart = (event, widget) => {
    draggedWidget.value = widget
    event.dataTransfer.setData('text/plain', widget.id)
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (event, target) => {
    event.preventDefault()
    dropTarget.value = target
    event.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (event, dashboard) => {
    event.preventDefault()
    
    if (draggedWidget.value && dropTarget.value !== null) {
      // Find the index of the dragged widget
      const draggedIndex = dashboard.value.findIndex(
        w => w.id === draggedWidget.value.id
      )
      
      // Find the index of the drop target
      const dropIndex = dashboard.value.findIndex(
        w => w.id === dropTarget.value
      )
      
      if (draggedIndex !== -1 && dropIndex !== -1) {
        // Remove the dragged widget from its original position
        const [widget] = dashboard.value.splice(draggedIndex, 1)
        // Insert it at the drop position
        dashboard.value.splice(dropIndex, 0, widget)
      }
    }
    
    draggedWidget.value = null
    dropTarget.value = null
  }

  const handleDragEnd = () => {
    draggedWidget.value = null
    dropTarget.value = null
  }

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  }
}