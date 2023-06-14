import styles from './Task.module.scss'
import commonStyles from './commonStyles.module.scss'
import React, {FC, useState} from "react"
import {taskType} from "../../types/types";
import OpenedTask from "../OpenedTask/OpenedTask";
import CheckTaskButton from "./CheckTaskButton/CheckTaskButton";
import {useAdminAuth} from "../../hooks/useAdminAuth";


type TaskProps = {
    task: taskType;
    taskItems: taskType[];
    setTaskItems: (arr: taskType[]) => void;
    setSortTaskFunc:(arr:taskType[]) => void;
}

const Task: FC<TaskProps> = ({
                                 task,
                                 taskItems,
                                 setTaskItems,
                                 setSortTaskFunc

                             }) => {
    const [isChecked, setIsChecked] = useState<boolean>(task.state)
    const [taskIsOpen, setTaskIsOpen] = useState<boolean>(false)
    const isAdmin = useAdminAuth()

    const dateToMonthDay=(date:string) => {
        return date.slice(6,8)+'.'+date.slice(4,6)
    }


    return (
        <div>
            {
                taskIsOpen && <OpenedTask
                    setTaskIsOpen={setTaskIsOpen}
                    task={task}
                    taskItems={taskItems}
                    setTaskItems={setTaskItems}
                />
            }
            <div
                className={`${styles.container}  ${commonStyles.border} ${isChecked ? styles.taskIsDisable : styles.taskIsEnable}`}>

                <CheckTaskButton
                    task={task}
                    taskItems={taskItems}
                    setTaskItems={setTaskItems}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    setSortTaskFunc={setSortTaskFunc}
                />

                <div className={`${styles.textBlock}`}
                     onClick={() => setTaskIsOpen(true)}
                >
                    <span className={styles.title}>
                        {task.title}
                    </span>

                    <span className={styles.info}>
                        {
                            isAdmin &&
                            <span className={styles.loginInTask}>
                                {task.username.slice(0,7)}
                            </span>
                        }
                        {
                            task.date &&
                            <span className={styles.date + ' ' + (!isChecked ? styles.greenDate : '')}>
                                {dateToMonthDay(task.date)}
                            </span>
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Task;