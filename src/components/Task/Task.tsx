import styles from './Task.module.scss'
import {FC, useCallback, useState} from "react"
import {taskType} from "../../types/types";
import {updateTask} from "../../functions/tasksAxios";
import debounce from 'lodash.debounce'


type TaskProps = {
    task: taskType;
}

const Task: FC<TaskProps> = ({task}) => {
    const [isChecked, setIsChecked] = useState<boolean>(task.state)

    const time: boolean = true
    const debounceTaskState = useCallback(
        debounce((newTask) => {
            updateTask(task.id, newTask).then()
        }, 500), []
    )

    const onClickCheck = () => {
        const newTask = {
            title: task.title,
            text: task.text,
            date: task.date,
            login: task.login,
            id: task.id,
            state: !isChecked,
        }
        debounceTaskState(newTask)

        setIsChecked(!isChecked)

    }

    return (
        <div className={styles.container + ' ' + (isChecked ? styles.taskIsDisable : styles.taskIsEnable)}>
            <span className={styles.leftBlock}>
                <div
                    onClick={onClickCheck}
                    className={styles.check + ' ' + (isChecked ? styles.activeCheck : '')}
                >

                </div>
                <span className={styles.title}>{task.title} {task.login}</span>
            </span>

            <span className={styles.date + ' ' + (time ? styles.greenDate : styles.redDate)}>{task.date}</span>

        </div>
    )
}
export default Task;