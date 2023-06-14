import styles from './ModeButtons.module.scss'
import React, {FC} from "react"

type AddNewTaskButtonProps = {
    setAddTaskMode: (value: boolean) => void;
    addTaskMode: boolean;
}

const ToggleTaskModeButton: FC<AddNewTaskButtonProps> = ({ setAddTaskMode, addTaskMode}) => {

    const onClickAddTask = () => {
        setAddTaskMode(!addTaskMode)
    }
    return (
        <div className={styles.container}>

            <button
                onClick={onClickAddTask}
                className={`${styles.toggleModeButton} ${styles.taskButton} ${addTaskMode ? styles.goBackButton : ''}`}
            >
                {addTaskMode ? 'Go back' : 'Task mode'}
            </button>

        </div>
    )
}
export default ToggleTaskModeButton;