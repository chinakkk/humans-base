import styles from './Task.module.scss'
import commonStyles from './commonStyles.module.scss'
import React, {FC, useState} from "react"
import {taskType} from "../../types/types";
import OpenedTask from "../OpenedTask/OpenedTask";
import CheckTaskButton from "./CheckTaskButton/CheckTaskButton";


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


    return (
        <div className={styles.container}>
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
                 className={`${styles.wrapper}  ${commonStyles.border} ${isChecked ? styles.taskIsDisable : styles.taskIsEnable}`}>
                <div className={styles.leftBlock}>
                    <CheckTaskButton
                        task={task}
                        filteredTasks={filteredTasks}
                        setFilteredTasks={setFilteredTasks}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                    />
                </div>
                <div className={`${styles.rightBlock}`}
                     onClick={() => setTaskIsOpen(true)}
                >
                    <span className={styles.title}>{task.title} {task.login}</span>

                    <span className={styles.date + ' ' + (time ? styles.greenDate : styles.redDate)}>
                        {task.date}
                    </span>

                </div>


            </div>

        </div>
    )
}
export default Task;