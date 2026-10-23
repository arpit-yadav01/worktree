import { useRef } from 'react'

function AddTaskInput({ onAdd }) {
  const inputRef = useRef(null)

  const handleAdd = () => {
    const text = inputRef.current.value.trim()
    if (!text) return
    onAdd(text)
    inputRef.current.value = ''
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="input-row">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new task..."
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd}>＋</button>
    </div>
  )
}

export default AddTaskInput
