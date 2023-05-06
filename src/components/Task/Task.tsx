import styles from './Task.module.scss'
import commonStyles from './commonStyles.module.scss'
import React, {FC, useState} from "react"
import {taskType} from "../../types/types";
import OpenedTask from "../OpenedTask/OpenedTask";
import CheckTaskButton from "./CheckTaskButton/CheckTaskButton";
import {useAdminAuth} from "../../hooks/useAdminAuth";


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
    const isAdmin = useAdminAuth()


    return (
        <div>
            {
                taskIsOpen && <OpenedTask
                    setTaskIsOpen={setTaskIsOpen}
                    task={task}
                    filteredTasks={filteredTasks}
                    setFilteredTasks={setFilteredTasks}
                    time={time}
                />
            }
            <div
                className={`${styles.container}  ${commonStyles.border} ${isChecked ? styles.taskIsDisable : styles.taskIsEnable}`}>

                <CheckTaskButton
                    task={task}
                    filteredTasks={filteredTasks}
                    setFilteredTasks={setFilteredTasks}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
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
                                {task.login}
                            </span>
                        }

                        {
                            task.date &&
                            <span className={styles.date + ' ' + (time ? styles.greenDate : styles.redDate)}>
                                {task.date.slice(0,5)}
                            </span>
                        }

                    </span>


                </div>


            </div>

        </div>
    )
}
export default Task;