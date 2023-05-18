import styles from './Messages.module.scss'
import {FC, useEffect, useRef, useState} from "react"
import Message from "./Message/Message";
import {ref, onValue} from 'firebase/database'
import {realTimeDB} from "../../../../firebase";
import {messageObjType} from "../../../../types/types";

type MessagesProps = {}


const Messages: FC = () => {
    const [messages, setMessages] = useState<messageObjType[]>([])
    const messagesRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        if (messagesRef.current) {
            const { scrollHeight, clientHeight } = messagesRef.current;
            messagesRef.current.scrollTop = scrollHeight - clientHeight;
        }
    };
    useEffect(() => {
        onValue(ref(realTimeDB), (snapshot) => {
            setMessages([])
            const data = snapshot.val()
            if (data !== null) {
                const masData: messageObjType[] = Object.values(data)

                const filteredMessage: messageObjType[] = masData.sort(function (a: any, b: any) {
                    return a.date - b.date
                })
                setMessages(filteredMessage)
            }
            setTimeout(() => scrollToBottom(),0)

        })
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.messages}
                 ref={messagesRef}
            >
                {
                    !!messages.length &&
                    messages.map((messageObj, index) =>
                        <Message
                            key={index}//переделать
                            messageObj={messageObj}
                        />
                    )
                }
            </div>
        </div>
    )
}
export default Messages;