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
        }
        setEditMode(!editMode)
    }

    return (
        <div className={styles.container}>
            <div onClick={() => setTaskIsOpen(false)} className={styles.overlay}></div>

            <div className={styles.window + ' ' + (editMode ? styles.borderEdit : '')}>

                <form>
                    <div className={styles.titleBlock}>
                        {
                            editMode ? <input className={styles.titleInput}
                                              onChange={(event) => setTitleInput(event.target.value)}
                                              value={titleInput}
                                              autoFocus={true}
                                              maxLength={40}
                                />
                                :
                                task.title
                        }
                    </div>
                    <div className={styles.textBlock}>
                        {editMode ?
                            <textarea
                                className={styles.textInput}
                                onChange={(event) => setTextInput(event.target.value)}
                                value={textInput}
                            >
                        </textarea> :
                            task.text}
                    </div>

                    {
                        !!task.date.length &&
                        <>
                          <div className={`${styles.time} ${styles.date} ${!task.state && styles.greenDate}`}>
                              {task.date.slice(8, 10) + ':' + task.date.slice(10, 12)}
                          </div>
                          <div className={`${styles.yearMonthDay} ${styles.date} ${!task.state && styles.greenDate}`}>
                              {task.date.slice(6, 8) + '.' + task.date.slice(4, 6) + '.' + task.date.slice(0, 4)}
                          </div>
                        </>


                    }
                    {
                        isAdmin && <button onClick={onClickEditTask}
                                           className={styles.editButton}>{editMode ? 'Save' : 'Edit mode'}
                        </button>
                    }

                </form>

                {
                    isAdmin && <DeleteTaskButton
                        task={task}
                        taskItems={taskItems}
                        setTaskItems={setTaskItems}
                    />
                }


            </div>


        </div>
    )
}
export default OpenedTask;