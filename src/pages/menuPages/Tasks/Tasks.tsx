import styles from './Tasks.module.scss'
import {FC, useEffect, useState} from "react"
import Task from "../../../components/Task/Task";
import {messageObjType, taskType} from "../../../types/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import SkeletonTask from "../../../components/Task/SkeletonTask";
import {getAllTasksFirestore, getTasksByUserUIDFirestore} from "../../../dataBaseResponse/tasksFirestore";

const Tasks: FC = () => {
    const [taskItems, setTaskItems] = useState<taskType[]>([])
    const [pageIsLoading, setPageIsLoading] = useState(true)


    const {user, adminUser} = useSelector((state: RootState) => state.userSlice)

    const setSortTaskFunc = (taskItems: taskType[]) => {
        if (taskItems && taskItems.length > 0) {
            const trueTaskItems: taskType[] = taskItems.filter((taskItem: taskType) => taskItem.state)
            const falseTaskItems: taskType[] = taskItems.filter((taskItem: taskType) => !taskItem.state)

            const trueTaskItemsSort: taskType[] = trueTaskItems.sort(function (a: any, b: any) {
                return Number(b.date) - Number(a.date)
            })
            const falseTaskItemsSort: taskType[] = falseTaskItems.sort(function (a: any, b: any) {
                return Number(b.date) - Number(a.date)
            })
            setTaskItems([...falseTaskItemsSort, ...trueTaskItemsSort])

        } else setTaskItems([])

    }

    useEffect(() => {
        (async () => {
            await setPageIsLoading(true)
            const tasksData: taskType[] = ((user.login === adminUser.login) ?
                await getAllTasksFirestore() :
                await getTasksByUserUIDFirestore(user.uid)) || []
            setSortTaskFunc(tasksData)

            await setPageIsLoading(false)

        })()

    }, [])


    return (
        <div className={styles.container}>
            {
                pageIsLoading ?
                    [...new Array(18)].map((value, index) => <SkeletonTask key={index}/>)
                    :
                    taskItems.map((task) =>
                        <Task key={task.uid}
                              task={task}
                              taskItems={taskItems}
                              setTaskItems={setTaskItems}
                              setSortTaskFunc={setSortTaskFunc}
                        />
                    )

            }

        </div>
    )
}
export default Tasks;