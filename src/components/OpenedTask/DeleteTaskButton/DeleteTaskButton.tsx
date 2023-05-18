import styles from './DeleteTaskButton.module.scss'
import {FC} from "react"
import {taskType} from "../../../types/types";
import {deleteTaskByUIDFirestore} from "../../../dataBaseResponse/tasksFirestore";

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
        deleteTaskByUIDFirestore(task.uid).then().catch()
        console.log(task)
        setFilteredTasks(filteredTasks.filter((taskItem) => taskItem.uid!==task.uid))
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