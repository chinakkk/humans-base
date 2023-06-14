import styles from './DeleteTaskButton.module.scss'
import {FC} from "react"
import {taskType} from "../../../types/types";
import {deleteTaskByUIDFirestore} from "../../../dataBaseResponse/tasksFirestore";

type DeleteTaskButtonProps = {
    task: taskType;
    taskItems: taskType[]
    setTaskItems: (value: taskType[]) => void
}

const DeleteTaskButton: FC<DeleteTaskButtonProps> = ({
                                                         task,
                                                         taskItems,
                                                         setTaskItems
                                                     }) => {


    const onClickDeleteTask = () => {
        setTaskItems([...taskItems.filter((taskItem) => taskItem.uid !== task.uid)])
        deleteTaskByUIDFirestore(task.uid).then().catch()

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