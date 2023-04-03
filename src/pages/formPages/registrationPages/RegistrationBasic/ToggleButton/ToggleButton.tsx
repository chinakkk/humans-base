import styles from './ToggleButton.module.scss'
import {FC} from "react"

const ToggleButton: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.toggleButton}>Student</div>
            <div className={styles.toggleButton}>Professor</div>
        </div>
    )
}
export default ToggleButton;