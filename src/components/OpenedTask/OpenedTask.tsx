import styles from './OpenedTask.module.scss'
import React, {FC, useState} from "react"
import {taskType} from "../../types/types";
import DeleteTaskButton from "./DeleteTaskButton/DeleteTaskButton";
import {updateTaskByUIDFirestore} from "../../dataBaseResponse/tasksFirestore";
import {useAdminAuth} from "../../hooks/useAdminAuth";

type OpenedTaskProps = {
    setTaskIsOpen: (value: boolean) => void;
    task: taskType;
    taskItems: taskType[]
    setTaskItems: (value: taskType[]) => void

}

const OpenedTask: FC<OpenedTaskProps> = ({
                                             setTaskIsOpen,
                                             task,
                                             taskItems,
                                             setTaskItems,
                                         }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [titleInput, setTitleInput] = useState<string>(task.title)
    const [textInput, setTextInput] = useState<string>(task.text)
    const isAdmin = useAdminAuth()
    const onClickEditTask = () => {
        if (editMode && (titleInput !== task.title || textInput !== task.text)) {
            updateTaskByUIDFirestore(task.uid, {title: titleInput, text: textInput}).then().catch()
            task.title = titleInput
            task.text = textInput
            console.log('Измение 1')
        }
        setEditMode(!editMode)
    }

    return (
        <div className={styles.container}>
            <div onClick={() => setTaskIsOpen(false)} className={styles.overlay}></div>

            <form className={styles.window + ' ' + (editMode ? styles.borderEdit : '')}>

                <div className={styles.titleBlockWrapper}>


                    {editMode ?
                        <textarea className={styles.titleInput}
                                  onChange={(event) => setTitleInput(event.target.value)}
                                  value={titleInput}
                                  maxLength={40}
                        />
                        :
                        <div className={styles.titleBlock}>
                            {task.title}
                        </div>
                    }

                </div>

                <div className={styles.textBlockWrapper}>
                    {editMode ?
                        <textarea
                            className={styles.textInput}
                            onChange={(event) => setTextInput(event.target.value)}
                            value={textInput}
                            rows={1}
                        ></textarea>
                        :
                        <div className={styles.textBlock}>
                            {task.text}
                        </div>
                    }
                </div>

                <div className={styles.taskBottom}>
                    {
                        !!task.date.length &&
                        <div className={styles.dateBlock}>
                          <div className={`${styles.time} ${styles.date} ${!task.state && styles.greenDate}`}>
                              {task.date.slice(8, 10) + ':' + task.date.slice(10, 12)}
                          </div>
                          <div className={`${styles.yearMonthDay} ${styles.date} ${!task.state && styles.greenDate}`}>
                              {task.date.slice(6, 8) + '.' + task.date.slice(4, 6) + '.' + task.date.slice(0, 4)}
                          </div>
                        </div>
                    }
                    {
                        isAdmin &&
                        <div className={styles.buttonsBlock}>
                          <button onClick={onClickEditTask}
                                  className={styles.editButton}>{editMode ? 'Save' : 'Edit mode'}
                          </button>
                          <DeleteTaskButton
                              task={task}
                              taskItems={taskItems}
                              setTaskItems={setTaskItems}
                          />
                        </div>

                    }


                </div>


            </form>
            <button className={styles.backButton}
                    onClick={() => setTaskIsOpen(false)}
            >
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z"
                        fill="#7ba6b1"/>
                </svg>
            </button>

        </div>
    )
}
export default OpenedTask;