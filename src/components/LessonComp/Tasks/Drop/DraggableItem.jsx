import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import styles from '../style.module.css'

function DraggableItem({ id, children, onClick }) {
  const { setNodeRef } = useDraggable({ id })

  return (
    <div
      ref={setNodeRef}
      onClick={() => onClick(id)}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  )
}
function DropZone({ id, children, onClick }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div onClick={() => onClick(id)} ref={setNodeRef}>
      {children}
    </div>
  )
}

export { DraggableItem, DropZone }
