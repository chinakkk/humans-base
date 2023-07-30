import styles from './Chat.module.scss'
import {FC, useRef, useState} from "react"
import Messages from "./Messages/Messages";
import SendMessage from "./SendMessage/SendMessage";
import ChatProgrammers from "./ChatProgrammers/ChatProgrammers";


const Chat: FC = () => {

    const messagesRef = useRef<HTMLDivElement>(null)
    const [inputMessage, setInputMessage] = useState<string>('')


    const scrollToBottom = () => {
        if (messagesRef.current) {
            const {scrollHeight, clientHeight} = messagesRef.current;
            messagesRef.current.scrollTop = scrollHeight - clientHeight;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.programmers}>
                <ChatProgrammers
                    setInputMessage={setInputMessage}
                />
            </div>
            <div className={styles.chat}>
                <Messages messagesRef={messagesRef} scrollToBottom={scrollToBottom}/>
                <SendMessage
                    scrollToBottom={scrollToBottom}
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                />
            </div>


        </div>
    )
}
export default Chat;