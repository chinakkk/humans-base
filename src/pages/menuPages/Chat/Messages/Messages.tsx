import styles from './Messages.module.scss'
import {FC, useEffect, useRef, useState} from "react"
import Message from "./Message/Message";
import {ref, onValue} from 'firebase/database'
import {realTimeDB} from "../../../../firebase";
import {messageObjType} from "../../../../types/types";
import SkeletonMessage from "./Message/SkeletonMessage";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

type MessagesProps = {}


const Messages: FC = () => {
    const [messagesItems, setMessagesItems] = useState<messageObjType[]>([])
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
                const masData: messageObjType[] = Object.values(data)

                const filteredMessage: messageObjType[] = masData.sort(function (a: any, b: any) {
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
            return message.inputMessage.includes(search.chat) ||
                message.login.includes((search.chat)) ||
                formatDate(message.date).includes(search.chat)

        }) : messagesItems

        let day: number = 99
        let month: number = 99
        let createSpace: boolean = false
        //вывод пользователей
        return !messagesItems.length ? [...new Array(15)].map((value, index) => <SkeletonMessage key={index}/>) :
            searchFilterMessageItems.map((messageObj, index) => {

                    createSpace = false
                    if (Number(messageObj.date.slice(4, 6)) > month ||
                        Number(messageObj.date.slice(6, 8)) > day) createSpace = true
                    day = Number(messageObj.date.slice(6, 8))
                    month = Number(messageObj.date.slice(4, 6))
                    const stringDay = day<10?('0'+day):day
                    const stringMonth = month<10?('0'+month):day
                    return (
                        <>
                            {
                                createSpace &&
                                <div className={styles.space}>
                                    {`${stringDay}.${stringMonth}.2023`}
                                </div>
                            }
                            <Message
                                key={index}//переделать
                                messageObj={messageObj}
                            />
                        </>

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