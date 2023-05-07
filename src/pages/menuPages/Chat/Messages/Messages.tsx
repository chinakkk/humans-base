import styles from './Messages.module.scss'
import {FC} from "react"
import Message from "./Message/Message";

type MessagesProps = {}

const Messages: FC = () => {
    const messageArr=['1','2','3','4','5','6']
    // const socket=new WebSocket('f')
    return (
        <div className={styles.container}>
            {
                messageArr.map((message) => <Message textMessage={message}/>)
            }
        </div>
    )
}
export default Messages;