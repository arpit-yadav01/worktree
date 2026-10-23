import TaskItem from './TaskItem'

const FILTERS = ['all', 'active', 'done']

function EmptyState({ filter }) {
  const isDone = filter === 'done'
  return (
    <div className="empty-state">
      <div className="icon">{isDone ? '🎉' : '✅'}</div>
      <p>{isDone ? 'No completed tasks yet!' : 'No tasks here. Add one above!'}</p>
    </div>
  )
}

function TaskList({ tasks, filter, onToggle, onDelete }) {
  const filtered = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  )

  if (filtered.length === 0) return <EmptyState filter={filter} />

  return (
    <ul className="task-list">
      {filtered.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  )
}

function Filters({ current, onChange }) {
  return (
    <div className="filters">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={current === f ? 'active' : ''}
          onClick={() => onChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}

export { TaskList, Filters }
