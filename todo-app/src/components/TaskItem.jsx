function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={onToggle}
      />
      <span className="task-text">{task.text}</span>
      <button className="delete-btn" onClick={onDelete} aria-label="Delete task">
        🗑
      </button>
    </li>
  )
}

export default TaskItem
