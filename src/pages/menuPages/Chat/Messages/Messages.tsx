import styles from './Messages.module.scss'
import {FC, useEffect, useRef, useState} from "react"
import Message from "./Message/Message";
import {ref, onValue} from 'firebase/database'
import {realTimeDB} from "../../../../firebase";
import {messageType} from "../../../../types/types";
import SkeletonMessage from "./Message/SkeletonMessage";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

type MessagesProps = {}


const Messages: FC = () => {
    const [messagesItems, setMessagesItems] = useState<messageType[]>([])
    const [stopScroll, setStopScroll] = useState<boolean>(false)
    const messagesRef = useRef<HTMLDivElement>(null)
    const {search} = useSelector((state: RootState) => state.searchSlice)


    const formatDate = (date: string) => {
        const day = `${date.slice(6, 8)}.${date.slice(4, 6)}`
        const time = `${date.slice(8, 10)}:${date.slice(10, 12)}`
        return `${day} ${time}`
    }
    const scrollToBottom = () => {
        if (messagesRef.current) {
            const {scrollHeight, clientHeight} = messagesRef.current;
            messagesRef.current.scrollTop = scrollHeight - clientHeight;
        }
    };
    useEffect(() => {
        onValue(ref(realTimeDB), (snapshot) => {
            setMessagesItems([])
            const data = snapshot.val()
            if (data !== null) {
                const masData: messageType[] = Object.values(data)

                const filteredMessage: messageType[] = masData.sort(function (a: any, b: any) {
                    return a.date - b.date
                })
                setMessagesItems(filteredMessage)
            }
            setTimeout(() => scrollToBottom(), 0)

        })


    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [search.chat])


    const renderMessageItems = () => {
        //фильтрация по поиску
        const searchFilterMessageItems = search.chat.length > 0 ? messagesItems.filter((message) => {
            //условие сортировки
            return message.inputMessage.toLowerCase().includes(search.chat.toLowerCase()) ||
                message.login.toLowerCase().includes((search.chat.toLowerCase())) ||
                formatDate(message.date).includes(search.chat)

        }) : messagesItems

        let day: number = 99
        let month: number = 99
        let createSpace: boolean = false
        //вывод пользователей
        return !messagesItems.length ? [...new Array(15)].map((value, index) => <SkeletonMessage key={index}/>) :
            searchFilterMessageItems.map((messageObj) => {


                    createSpace = Number(messageObj.date.slice(4, 6)) > month || Number(messageObj.date.slice(6, 8)) > day;
                    day = Number(messageObj.date.slice(6, 8))
                    month = Number(messageObj.date.slice(4, 6))
                    return (
                        <div
                            key={messageObj.uuid}
                        >
                            {
                                createSpace &&
                                <div className={styles.space}>
                                  <div className={styles.line}></div>
                                </div>
                            }
                            <Message
                                messageObj={messageObj}
                            />
                        </div>

                    )
                }
            )

    }


    return (
        <div className={styles.container}>
            <div className={styles.messages}
                 ref={messagesRef}
            >
                {
                    renderMessageItems()
                }
            </div>
        </div>
    )
}
export default Messages;