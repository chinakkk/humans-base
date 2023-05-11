import styles from './Messages.module.scss'
import {FC, useEffect, useState} from "react"
import Message from "./Message/Message";
import {ref, onValue} from 'firebase/database'
import {db} from '../../../../firebase'
import {messageObjType} from "../../../../types/types";

type MessagesProps = {}



const Messages: FC = () => {
    const [messages, setMessages] = useState<messageObjType[]>([])


    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setMessages([])
            const data = snapshot.val()
            if (data !== null) {
                const masData:messageObjType[]=Object.values(data)

                const filteredMessage :messageObjType[]= masData.sort(function(a:any, b:any){
                    return a.date-b.date
                })
                setMessages(filteredMessage)
                console.log(filteredMessage)


            }
        })
    }, [])
    return (
        <div className={styles.container}>
            {
                !!messages.length&&
                messages.map((messageObj, index) =>
                    <Message
                        key={index}//переделать
                        messageObj={messageObj}
                    />
                )
            }
        </div>
    )
}
export default Messages;