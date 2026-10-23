import { useState, useEffect } from 'react'
import AddTaskInput from './components/AddTaskInput'
import { TaskList, Filters } from './components/TaskList'

// Helper to load tasks from localStorage
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem('todos') || '[]')
  } catch {
    return []
  }
}

// Format today's date nicely
const dateLabel = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [filter, setFilter] = useState('all')

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    setTasks((prev) => [{ id: Date.now(), text, done: false }, ...prev])
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const clearDone = () => {
    setTasks((prev) => prev.filter((t) => !t.done))
  }

  const remaining = tasks.filter((t) => !t.done).length

  const total = tasks.length
  const done = tasks.filter((t) => t.done).length
  const progress = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="header-top">
          <div className="header-icon">📝</div>
          <h1>My To-Dos</h1>
        </div>
        <p className="subtitle">{dateLabel}</p>

        {/* Progress bar */}
        {total > 0 && (
          <div className="progress-wrap">
            <div className="progress-meta">
              <span>{done} of {total} completed</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      <AddTaskInput onAdd={addTask} />

      <Filters current={filter} onChange={setFilter} />

      <TaskList
        tasks={tasks}
        filter={filter}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      <div className="footer">
        <span className="footer-count">
          <strong>{remaining}</strong> task{remaining !== 1 ? 's' : ''} left
        </span>
        <button className="clear-btn" onClick={clearDone}>
          Clear completed
        </button>
      </div>
    </div>
  )
}

export default App
