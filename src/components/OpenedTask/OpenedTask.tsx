import styles from './OpenedTask.module.scss'
import React, {FC} from "react"
import {taskType} from "../../types/types";

type openedTaskProps = {
    setTaskIsOpen:(value:boolean) => void;
    task:taskType;

}

const openedTask: FC <openedTaskProps>= ({setTaskIsOpen,task}) => {
    return (
        <div className={styles.container}>
            <div onClick={() => setTaskIsOpen(false)} className={styles.overlay}></div>

            <div className={styles.window}>
                <div className={styles.titleBlock}>
                    {task.title}
                </div>
                <div className={styles.textBlock}>{task.text}</div>
            </div>


        </div>
    )
}
export default openedTask;