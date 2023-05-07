import styles from './SendMessage.module.scss'
import {FC} from "react"

type SendMessageProps = {}

const SendMessage: FC = () => {
    return (
        <form className={styles.container}>
            <input className={styles.sendInput}></input>
            <button className={styles.sendButton}></button>
        </form>

    )
}
export default SendMessage;