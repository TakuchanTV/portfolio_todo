import React from 'react'
import styles from "./todo-list-ui.module.css"

export const Todo_List_UI = () => {
  return (
    <div className={styles.TodoContainer}>
      <h1 className={styles.title}>Todo 管理アプリ</h1>

      <div className={styles.input_container}>
        <input type="text"
          placeholder='タスクを入力してください'
          className={styles.task_input}
        />
        <button className={styles.add_button}>追加</button>
      </div>

      
    </div>
  )
}
