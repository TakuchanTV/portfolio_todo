import React, { ChangeEvent, useState } from 'react'
import styles from "./todo-list-ui.module.css"
import { text } from 'stream/consumers';
import { Interface } from 'readline';

interface Task {
  id:number
  text:string
  isCompleted:boolean
}

export const Todo_List_UI = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("")

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObject:Task = {id :Date.now(), text:newTask, isCompleted:false};
    setTasks([...tasks, newTaskObject])
    setNewTask("");
  };

  const toggleTaskCompletion = (id:number) => {
    setTasks(
      tasks.map((task)=>
      task.id === id
      ? {...task, isCompleted: !task.isCompleted}
      :task
      )
    );
  };

  const deletedTask = (id:number) => {
    setTasks(tasks.filter((task)=> task.id !== id))
  }
  return (
    <div className={styles.TodoContainer}>
      <h1 className={styles.title}>Todo 管理アプリ</h1>

      <div className={styles.input_container}>
        <input type="text"
        value={newTask}
        onChange={(e:ChangeEvent<HTMLInputElement>) => {
          setNewTask(e.target.value)
        }}
          placeholder='タスクを入力してください'
          className={styles.task_input}
        />
        <button onClick={addTask} className={styles.add_button}>追加</button>
      </div>

      <ul className={styles.task_list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.task_item}>
            <input type="checkbox"
            checked={task.isCompleted}
            onChange={() => toggleTaskCompletion(task.id)}
            className={styles.task_checkbox}
             />
             <span className={`${styles.task_text} ${task.isCompleted ? "completed" : ""}`}>
              {task.text}
             </span>
             <button className={styles.delete_button}
             onClick={() => deletedTask(task.id)}>削除</button>
          </li>
        ))}
      </ul>

      
    </div>
  )
}
