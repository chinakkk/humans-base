import styles from './Messages.module.scss'
import React, {FC, useEffect, useRef, useState} from "react"
import {ref, onValue, get} from 'firebase/database'
import {realTimeDB} from "../../../../firebase";
import {messageType} from "../../../../types/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import Message from "./Message/Message";
import {getFullDate} from "../../../../utils/toUpperCaseHead";

type MessagesProps = {
    messagesRef: React.Ref<HTMLDivElement>;
    scrollToBottom: () => void;
}


const Messages: FC<MessagesProps> = ({messagesRef, scrollToBottom}) => {
    const [firstScroll, setFirstScroll] = useState<boolean>(false)
    const [messagesItems, setMessagesItems] = useState<messageType[]>([])
    const [contextMenuMessagesIsOpen, setContextMenuMessagesIsOpen] = useState<boolean>(false)
    const [contextMenuMessagesState, setContextMenuMessagesState] = useState<boolean>(false)
    const {search} = useSelector((state: RootState) => state.searchSlice)


    const formatDate = (date: string) => {
        const day = `${date.slice(6, 8)}.${date.slice(4, 6)}`
        const time = `${date.slice(8, 10)}:${date.slice(10, 12)}`
        return `${day} ${time}`
    }

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
        })
    }, [])


    //скролл при загрузке бд
    useEffect(() => {
        (async () => {
            await get(ref(realTimeDB));
            setTimeout(() => scrollToBottom(), 0);
        })()

    }, []);

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
        return !messagesItems.length ? [...new Array(15)].map((value, index) => <></>) :
            searchFilterMessageItems.map((messageObj) => {

                    createSpace = Number(messageObj.date.slice(4, 6)) > month || Number(messageObj.date.slice(6, 8)) > day;
                    day = Number(messageObj.date.slice(6, 8))
                    month = Number(messageObj.date.slice(4, 6))
                    return (
                        <div key={messageObj.uuid}>
                            {
                                createSpace &&
                                <div className={styles.newDateWrapper}>
                                  <span className={styles.newDate}>
                                      {getFullDate(Number(month), Number(day))}
                                </span>
                                </div>

                            }
                            <Message
                                messageObj={messageObj}
                                setContextMenuMessagesIsOpen={setContextMenuMessagesIsOpen}
                                contextMenuMessagesState={contextMenuMessagesState}
                                setContextMenuMessagesState={setContextMenuMessagesState}
                            />
                        </div>

                    )
                }
            )

    }


    return (
        <div className={styles.container + ' ' + (contextMenuMessagesIsOpen ? styles.containerOverflowBlock : '')}
             ref={messagesRef}
             onClick={() => setContextMenuMessagesState(!contextMenuMessagesState)}
        >
            {
                renderMessageItems()
            }
        </div>
    )
}
export default Messages;