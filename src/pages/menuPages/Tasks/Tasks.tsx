import styles from './Tasks.module.scss'
import {FC, useEffect, useState} from "react"
import Task from "../../../components/Task/Task";
import {taskType} from "../../../types/types";
import {getAllAxiosTasks, getAxiosTasksAboutLogin} from "../../../functions/tasksAxios";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import axios from "axios";

const Tasks: FC = () => {
    const [tasksItem, setTasksItem] = useState<taskType[]>([])
    // const [doneTasksItems, setDoneTasksItems] = useState<taskType[]>([])
    // const

    const {user,adminUser}=useSelector((state:RootState) => state.userSlice)

    useEffect(() => {
        (async () => {

            const data=(user.login===adminUser.login)?
                await getAllAxiosTasks():
                await getAxiosTasksAboutLogin(user.login)
            setTasksItem(data)
        })()

    }, [])


    return (
        <div className={styles.container}>
            {
                tasksItem.map((task) => {
                    return (
                        <Task key={task.id} task={task}/>
                    )
                })
            }
        </div>
    )
}
export default Tasks;