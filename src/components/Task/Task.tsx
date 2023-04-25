import styles from './Task.module.scss'
import React, {FC, useCallback, useState} from "react"
import {taskType} from "../../types/types";
import {updateAxiosTask} from "../../functions/tasksAxios";
import debounce from 'lodash.debounce'
import OpenedCardHuman from "../OpededCardHuman/OpenedCardHuman";
import OpenedTask from "../OpenedTask/OpenedTask";
import {toUpperHeadString} from "../../functions/toUpperHeadString";


type TaskProps = {
    task: taskType;
    filteredTasks: taskType[];
    setFilteredTasks: (mas: taskType[]) => void;
}

const Task: FC<TaskProps> = ({
                                 task, filteredTasks, setFilteredTasks

                             }) => {
    const [isChecked, setIsChecked] = useState<boolean>(task.state)
    const [taskIsOpen, setTaskIsOpen] = useState<boolean>(false)
    const time: boolean = true
    const currentTask = filteredTasks.find((taskItem) => taskItem.id === task.id)

    const filterTask = () => {
        if (currentTask) currentTask.state = !isChecked
        const trueTasksItems = filteredTasks.filter((taskItem: taskType) => taskItem.state)
        const falseTasksItems = filteredTasks.filter((taskItem: taskType) => !taskItem.state)
        setFilteredTasks([...falseTasksItems, ...trueTasksItems])
    }

    const debounceTaskState = useCallback(
        debounce(() => {
            const newTask = {
                title: task.title,
                text: task.text,
                date: task.date,
                login: task.login,
                id: task.id,
                state: !isChecked,
            }
            updateAxiosTask(task.id, newTask).then()
        }, 500), []
    )

    const onClickCheck = () => {

        debounceTaskState()
        setIsChecked(!isChecked)
        filterTask()
    }

    return (
        <div className={styles.container}>
            {
                taskIsOpen && <OpenedTask
                    setTaskIsOpen={setTaskIsOpen}
                    task={task}
                />
            }
            <div onClick={() => setTaskIsOpen(true)}
                 className={styles.wrapper + ' ' + (isChecked ? styles.taskIsDisable : styles.taskIsEnable)}>
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

        </div>
    )
}
export default Task;