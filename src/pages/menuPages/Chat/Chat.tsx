import styles from './Chat.module.scss'
import {FC, useRef} from "react"
import Messages from "./Messages/Messages";
import SendMessage from "./SendMessage/SendMessage";
import ChatProgrammers from "./ChatProgrammers/ChatProgrammers";


const Chat: FC = () => {

    const messagesRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        if (messagesRef.current) {
            const {scrollHeight, clientHeight} = messagesRef.current;
            messagesRef.current.scrollTop = scrollHeight - clientHeight;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.programmers}>
                <ChatProgrammers />
            </div>
            <div className={styles.chat}>
                <Messages messagesRef={messagesRef} scrollToBottom={scrollToBottom}/>
                <SendMessage scrollToBottom={scrollToBottom}/>
            </div>


        </div>
    )
}
export default Chat;