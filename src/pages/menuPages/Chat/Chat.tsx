import styles from './Chat.module.scss'
import {FC} from "react"
import Messages from "./Messages/Messages";
import SendMessage from "./SendMessage/SendMessage";


const Chat: FC = () => {

    return (
        <div className={styles.container}>
            <Messages/>
            <SendMessage/>

        </div>
    )
}
export default Chat;