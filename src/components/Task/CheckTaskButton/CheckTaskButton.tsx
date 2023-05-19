import styles from './CheckTaskButton.module.scss'
import React, {FC, useCallback} from "react"
import {taskType} from "../../../types/types";
import {debounce} from "../../../utils/debounce";
import {setStateTaskByUIDFirestore} from "../../../dataBaseResponse/tasksFirestore";

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

    const currentTask = filteredTasks.find((taskItem) => taskItem.uid === task.uid)
    const filterTask = () => {
        if (currentTask) currentTask.state = !isChecked
        const trueTasksItems = filteredTasks.filter((taskItem: taskType) => taskItem.state)
        const falseTasksItems = filteredTasks.filter((taskItem: taskType) => !taskItem.state)
        setFilteredTasks([...falseTasksItems, ...trueTasksItems])
    }


    const debounceTask = useCallback(
        debounce((check: boolean) => {
            setStateTaskByUIDFirestore(task.uid,check).then().catch()
        }, 500)
        , []
    )

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