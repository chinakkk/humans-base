import styles from './Note.module.scss'
import {FC} from "react"

const Note: FC = () => {
    return (
        <div className={styles.container}>
            {/*<input*/}
            {/*    className={styles.aboutMeInput}*/}
            {/*/>*/}
            <div className={styles.aboutMeInput}></div>
            <button className={styles.editButton}>Edit</button>
        </div>
    )
}
export default Note;