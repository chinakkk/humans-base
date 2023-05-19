import styles from './OpenedTask.module.scss'
import React, {FC, useRef, useState} from "react"
import {taskType} from "../../types/types";
import DeleteTaskButton from "./DeleteTaskButton/DeleteTaskButton";
import {updateTaskByUIDFirestore} from "../../dataBaseResponse/tasksFirestore";

type OpenedTaskProps = {
    setTaskIsOpen: (value: boolean) => void;
    task: taskType;
    filteredTasks: taskType[]
    setFilteredTasks: (value: taskType[]) => void
    time:boolean

}

const OpenedTask: FC<OpenedTaskProps> = ({
                                             setTaskIsOpen,
                                             task,
                                             filteredTasks,
                                             setFilteredTasks,
                                             time
                                         }) => {
    const [editMode,setEditMode]=useState<boolean>(false)
    const [titleInput,setTitleInput]=useState<string>(task.title)
    const [textInput,setTextInput]=useState<string>(task.text)
    const onClickEditTask=() => {
        if (editMode&&(titleInput!==task.title||textInput!==task.text)){
            updateTaskByUIDFirestore(task.uid,{title:titleInput,text:textInput}).then().catch()
            task.title=titleInput
            task.text=textInput
        }
        setEditMode(!editMode)
    }
    return (
        <div className={styles.container}>
            <div onClick={() => setTaskIsOpen(false)} className={styles.overlay}></div>

            <div className={styles.window + ' ' + (editMode?styles.borderEdit:'x')}>

                <div className={styles.titleBlock}>
                    {
                        editMode?<input className={styles.titleInput}
                                        onChange={(event) => setTitleInput(event.target.value)}
                                        value={titleInput}
                                        autoFocus={true}
                            />
                            :
                            task.title
                    }
                </div>
                <div className={styles.textBlock}>
                    {editMode?
                        <textarea
                            className={styles.textInput}
                            onChange={(event) => setTextInput(event.target.value)}
                            value={textInput}
                        >
                        </textarea> :
                        task.text}
                </div>
                {
                    !!task.date.length && <div className={`${styles.date} ${time&&styles.greenDate}`}>{task.date}</div>

                }
                <button onClick={onClickEditTask} className={styles.editButton}>{editMode?'Save':'Edit mode'}</button>
                <DeleteTaskButton
                    task={task}
                    filteredTasks={filteredTasks}
                    setFilteredTasks={setFilteredTasks}
                />

            </div>


        </div>
    )
}
export default OpenedTask;