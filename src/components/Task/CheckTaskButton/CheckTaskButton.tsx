import styles from './CheckTaskButton.module.scss'
import React, {FC, useCallback} from "react"
import {taskType} from "../../../types/types";
import {debounce} from "../../../utils/debounce";
import {setStateTaskByUIDFirestore} from "../../../dataBaseResponse/tasksFirestore";

type CheckTaskButtonProps = {
    task: taskType;
    taskItems: taskType[];
    setTaskItems: (value: taskType[]) => void;
    isChecked: boolean
    setIsChecked: (value: boolean) => void;
    setSortTaskFunc:(arr:taskType[]) => void;


}

const CheckTaskButton: FC<CheckTaskButtonProps> = ({
                                                       task,
                                                       taskItems,
                                                       setTaskItems,
                                                       isChecked,
                                                       setIsChecked,
                                                       setSortTaskFunc
                                                   }) => {


    const debounceTask = useCallback(
        debounce( (check: boolean,taskItemsParams:taskType[]) => {
            if (task.state !== check) {
                task.state = check
                setStateTaskByUIDFirestore(task.uid, check).then().catch()
                setSortTaskFunc(taskItemsParams)
            }
        }, 500)
        , []
    )

    const onClickCheck = () => {
        debounceTask(!isChecked,taskItems)
        setIsChecked(!isChecked)
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