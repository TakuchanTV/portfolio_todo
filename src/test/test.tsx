import React from 'react'
import styles from "./test.module.css"

export const Test = () => {
    return (
        <div className={styles.div}>
           <p className={styles.span}>この画面はテスト画面です。ご注意ください</p> 
           <p className={styles.span}>この行が最新のデプロイに反映されているか確認します</p> 
        </div>
    )
}
