import styles from './ToggleTaskModeButton.module.scss'
import React, {FC} from "react"
import {userType} from "../../../redux/slices/authUserSlice";

type AddNewTaskButtonProps = {
    user: userType;
    setAddTaskMode: (value: boolean) => void;
    addTaskMode: boolean;
}

const ToggleTaskModeButton: FC<AddNewTaskButtonProps> = ({user, setAddTaskMode, addTaskMode}) => {

    const onClickAddTask = () => {
        setAddTaskMode(!addTaskMode)
    }
    return (
        <div className={styles.container}>

            <button
                onClick={onClickAddTask}
                className={`${styles.addTaskButton} ${addTaskMode ? styles.goBackButton : ''}`}
            >
                {addTaskMode ? 'Go back' : 'Task mode'}
            </button>

        </div>
    )
}
export default ToggleTaskModeButton;