import './index.css'
import { useStore } from '../store'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import uuid from 'react-uuid'
function Task() {
  const { taskStore } = useStore()
  const [task, setTask] = useState('')

  // 新增方法
  const addItem = (e) => {
    if (task.length && e.code === 'Enter') {
      taskStore.addItem({
        id: uuid,
        name: task,
        isDone: false,
      })
      setTask('')
    }
  }
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        {/* 新增输入框 */}
        <input
          onKeyUp={addItem}
          className="new-todo"
          autoFocus
          autoComplete="off"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={(e) => taskStore.checkedAll(e.target.checked)}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {taskStore.list.map((item) => (
            <li
              className={item.isDone ? 'todo completed' : 'todo'}
              key={item.id}
            >
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  onChange={(e) =>
                    taskStore.changeChecked(item.id, e.target.checked)
                  }
                  checked={item.isDone}
                />
                <label>{item.name}</label>
                <button
                  className="destroy"
                  onClick={() => taskStore.delItem(item.id)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          任务数：{taskStore.list.length} 已完成：{taskStore.isFulfilTask}
        </span>
      </footer>
    </section>
  )
}

export default observer(Task)
