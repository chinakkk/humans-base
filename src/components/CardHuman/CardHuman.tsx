import styles from './CardHuman.module.scss'
import {FC} from "react"

const cardHuman: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.photo}>Photo</div>
                <div className={styles.about}>
                    <div className={styles.title}>Junior</div>
                    <div className={styles.name}>Keldibekov Chingiz, 23 years</div>
                    <div className={styles.skills}>React Redux</div>
                    <div className={styles.note}>Note</div>
                    <div className={styles.characteristics}>attack defence level</div>
                </div>
            </div>
        </div>
    )
}
export default cardHuman;