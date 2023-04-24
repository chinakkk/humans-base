import styles from './AddNewTaskButton.module.scss'
import React, {FC} from "react"
import {userType} from "../../redux/slices/userSlice";
import {addAxiosTaskAboutLogin} from "../../functions/tasksAxios";
import {userInfoType} from "../../types/types";

type AddNewTaskButtonProps = {
    user:userType
}

const AddNewTaskButton: FC<AddNewTaskButtonProps> = ({user}) => {

    const onClickAddTask = () => {
        const title=prompt('title of task')
        const text=prompt('text of task')
        addAxiosTaskAboutLogin(user.login,title,text).then()
    }
    return (
        <div className={styles.container}>
            <button
                onClick={onClickAddTask}
                className={styles.addTaskButton}
            >
                Add task
            </button>
        </div>
    )
}
export default AddNewTaskButton;