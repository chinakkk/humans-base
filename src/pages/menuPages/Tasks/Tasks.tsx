import styles from './Tasks.module.scss'
import {FC} from "react"

const Tasks: FC = () => {
    const studentsArr=[1,2,3,4,5]
    return (
        <div className={styles.container}>
            Здесь будет туду лист с тасками от тимлида
        </div>
    )
}
export default Tasks;