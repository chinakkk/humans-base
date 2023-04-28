import styles from './DeleteTaskButton.module.scss'
import {FC} from "react"
import {deleteAxiosTaskById} from "../../../functions/tasksAxios";
import {taskType} from "../../../types/types";

type DeleteTaskButtonProps = {
    task: taskType;
    filteredTasks: taskType[]
    setFilteredTasks: (value: taskType[]) => void
}

const DeleteTaskButton: FC<DeleteTaskButtonProps> = ({
                                                         task,
                                                         filteredTasks,
                                                         setFilteredTasks
                                                     }) => {


    const onClickDeleteTask = async () => {
        deleteAxiosTaskById(task.id).then().catch()
        setFilteredTasks(filteredTasks.filter((taskItem) => taskItem.id!==task.id))
    }

    return (
        <div className={styles.container}>
            <button onClick={onClickDeleteTask} className={styles.deleteButton}>
                Delete task
            </button>
        </div>
    )
}
export default DeleteTaskButton;