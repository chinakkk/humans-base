import styles from './Tasks.module.scss'
import {FC, useEffect, useState} from "react"
import Task from "../../../components/Task/Task";
import {taskType} from "../../../types/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import SkeletonTask from "../../../components/Task/SkeletonTask";
import {getAllTasksFirestore, getTasksByUserUIDFirestore} from "../../../dataBaseResponse/tasksFirestore";

const Tasks: FC = () => {
    const [filteredTasks, setFilteredTasks] = useState<taskType[]>([])
    const [pageIsLoading, setPageIsLoading] = useState(true)


    const {user, adminUser} = useSelector((state: RootState) => state.userSlice)

    useEffect(() => {
        (async () => {
            await setPageIsLoading(true)
            const data = (user.login === adminUser.login) ?
                await getAllTasksFirestore() :
                await getTasksByUserUIDFirestore(user.uid)
            if (data&&data.length>0){
                const trueTasksItems = data ? data.filter((taskItem: taskType) => taskItem.state) : []
                const falseTasksItems = data ? data.filter((taskItem: taskType) => !taskItem.state) : []
                setFilteredTasks([...falseTasksItems, ...trueTasksItems])
            }
            else setFilteredTasks([])

            await setPageIsLoading(false)

        })()

    }, [])


    return (
        <div className={styles.container}>
            {
                pageIsLoading ?
                    [...new Array(18)].map((value, index) => <SkeletonTask key={index}/>)
                    :
                    filteredTasks.map((task) =>
                        <Task key={task.uid}
                              task={task}
                              filteredTasks={filteredTasks}
                              setFilteredTasks={setFilteredTasks}
                        />
                    )

            }

        </div>
    )
}
export default Tasks;