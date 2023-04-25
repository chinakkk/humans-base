import styles from './Tasks.module.scss'
import {FC, useEffect, useState} from "react"
import Task from "../../../components/Task/Task";
import {taskType} from "../../../types/types";
import {getAllAxiosTasks, getAxiosTasksAboutLogin} from "../../../functions/tasksAxios";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import SkeletonCardHuman from "../../../components/CardHuman/SkeletonCardHuman/SkeletonCardHuman";
import CardHuman from "../../../components/CardHuman/CardHuman";
import SkeletonTask from "../../../components/Task/SkeletonTask/SkeletonTask";

const Tasks: FC = () => {
    const [filteredTasks, setFilteredTasks] = useState<taskType[]>([])
    const [pageIsLoading, setPageIsLoading] = useState(true)


    const {user, adminUser} = useSelector((state: RootState) => state.userSlice)

    useEffect(() => {
        (async () => {
            await setPageIsLoading(true)
            const data = (user.login === adminUser.login) ?
                await getAllAxiosTasks() :
                await getAxiosTasksAboutLogin(user.login)
            const trueTasksItems = data.filter((taskItem: taskType) => taskItem.state)
            const falseTasksItems = data.filter((taskItem: taskType) => !taskItem.state)
            setFilteredTasks([...falseTasksItems, ...trueTasksItems])
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
                        <Task key={task.id}
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