import styles from './CheckTaskButton.module.scss'
import React, {FC, useCallback} from "react"
import {taskType} from "../../../types/types";
import {updateAxiosTask} from "../../../axios/tasksAxios";
import {debounce} from "../../../utils/debounce";

type CheckTaskButtonProps = {
    task: taskType;
    filteredTasks: taskType[];
    setFilteredTasks: (value: taskType[]) => void;
    isChecked: boolean
    setIsChecked: (value: boolean) => void;
}

const CheckTaskButton: FC<CheckTaskButtonProps> = ({
                                                       task,
                                                       filteredTasks,
                                                       setFilteredTasks,
                                                       isChecked,
                                                       setIsChecked
                                                   }) => {

    const currentTask = filteredTasks.find((taskItem) => taskItem.id === task.id)
    const filterTask = () => {
        if (currentTask) currentTask.state = !isChecked
        const trueTasksItems = filteredTasks.filter((taskItem: taskType) => taskItem.state)
        const falseTasksItems = filteredTasks.filter((taskItem: taskType) => !taskItem.state)
        setFilteredTasks([...falseTasksItems, ...trueTasksItems])
    }


    const debounceTask = useCallback(
        debounce((check:boolean) => {
            const newTask = {
                title: task.title,
                text: task.text,
                date: task.date,
                login: task.login,
                id: task.id,
                state: check,
            }
            updateAxiosTask(task.id, newTask).then().catch()

        }, 500)
        , [])

    const onClickCheck = () => {

        debounceTask(!isChecked)
        setIsChecked(!isChecked)
        filterTask()
    }


    return (
        <div className={styles.container}>

            <div
                onClick={onClickCheck}
                className={styles.check + ' ' + (isChecked ? styles.activeCheck : '')}
            >

            </div>
        </div>
    )
}
export default CheckTaskButton;