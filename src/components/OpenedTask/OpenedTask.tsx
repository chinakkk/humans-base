import styles from './OpenedTask.module.scss'
import React, {FC} from "react"
import {taskType} from "../../types/types";
import DeleteTaskButton from "./DeleteTaskButton/DeleteTaskButton";

type openedTaskProps = {
    setTaskIsOpen: (value: boolean) => void;
    task: taskType;
    filteredTasks: taskType[]
    setFilteredTasks: (value: taskType[]) => void
    time:boolean

}

const openedTask: FC<openedTaskProps> = ({
                                             setTaskIsOpen,
                                             task,
                                             filteredTasks,
                                             setFilteredTasks,
                                             time
                                         }) => {
    return (
        <div className={styles.container}>
            <div onClick={() => setTaskIsOpen(false)} className={styles.overlay}></div>

            <div className={styles.window}>
                <div className={styles.titleBlock}>
                    {task.title}
                </div>
                <div className={styles.textBlock}>{task.text}</div>
                {
                    !!task.date.length && <div className={`${styles.date} ${time&&styles.greenDate}`}>{task.date}</div>

                }
                <DeleteTaskButton
                    task={task}
                    filteredTasks={filteredTasks}
                    setFilteredTasks={setFilteredTasks}
                />

            </div>


        </div>
    )
}
export default openedTask;