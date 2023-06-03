import styles from './Tasks.module.scss'
import {FC, useEffect, useState} from "react"
import Task from "../../../components/Task/Task";
import { taskType} from "../../../types/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import SkeletonTask from "../../../components/Task/SkeletonTask";
import {getAllTasksFirestore, getTasksByUserUIDFirestore} from "../../../dataBaseResponse/tasksFirestore";

const Tasks: FC = () => {
    const [taskItems, setTaskItems] = useState<taskType[]>([])
    const [pageIsLoading, setPageIsLoading] = useState(true)

    const {user, adminUser} = useSelector((state: RootState) => state.userSlice)
    const {search} = useSelector((state:RootState) => state.searchSlice)


    const formatDate = (date:string) => {
        const day = `${date.slice(6, 8)}.${date.slice(4, 6)}`
        const time = `${date.slice(8, 10)}:${date.slice(10, 12)}`
        return `${day} ${time}`
    }

    const setSortTaskFunc = (taskItems: taskType[]) => {
        //функция для сортировки таксов. Сортировка отмеченных тасков, а так же сортировка по дате.
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
        //загрузка тасков
        (async () => {
            await setPageIsLoading(true)
            const tasksData: taskType[] = ((user.login === adminUser.login) ?
                await getAllTasksFirestore() :
                await getTasksByUserUIDFirestore(user.uid)) || []
            setSortTaskFunc(tasksData)

            await setPageIsLoading(false)

        })()

    }, [])

    const renderTasksItems = () => {
        //фильтрация по поиску
        const searchFilterTasksItems = search.tasks.length > 0 ? taskItems.filter((task) => {
            //условие сортировки
            return task.username.includes(search.tasks)||
                formatDate(task.date).includes(search.tasks)||
                task.text.includes(search.tasks)||
                task.title.includes(search.tasks)
        }) : taskItems

        //вывод пользователей
        return  pageIsLoading ?
            [...new Array(18)].map((value, index) => <SkeletonTask key={index}/>)
            :
            searchFilterTasksItems.map((task) =>
                <Task key={task.uid}
                      task={task}
                      taskItems={taskItems}
                      setTaskItems={setTaskItems}
                      setSortTaskFunc={setSortTaskFunc}
                />
            )

    }



    return (
        <div className={styles.container}>
            {
                renderTasksItems()
            }

        </div>
    )
}
export default Tasks;