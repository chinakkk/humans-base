import styles from './Message.module.scss'
import {FC} from "react"

type MessageProps = {
    textMessage:string;
}

const Message: FC <MessageProps>= ({textMessage}) => {
    return (
        <div className={styles.container}>
            <span>{textMessage}</span>
        </div>
    )
}
export default Message;