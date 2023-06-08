import styles from './SendMessage.module.scss'
import {FC, useState} from "react"
import {realTimeDB} from '../../../../firebase'
import {uid} from "uid";
import {set, ref} from 'firebase/database'
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {currentDate} from "../../../../utils/utilsFunction";


type SendMessageProps = {}

const SendMessage: FC = () => {
    const {user} = useSelector((state: RootState) => state.userSlice)
    const [inputMessage, setInputMessage] = useState<string>('')


    const sendMessageToDatabase = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (!!inputMessage.length) {
            const uuid = uid()
            const newMessageObj =
                {
                    uuid: uuid,
                    inputMessage: inputMessage,
                    login: user.login,
                    date: currentDate(),
                }

            set(ref(realTimeDB, `/${uuid}`), newMessageObj).then().catch()
        }

        setInputMessage('')
    }

    return (
        <form className={styles.container}>
            <input className={styles.sendInput}
                   value={inputMessage}
                   onChange={(event) => setInputMessage(event.target.value)}
            >

            </input>
            <button onClick={sendMessageToDatabase} className={styles.sendButton}>
                <svg className={styles.buttonSVG} width={'13px'} height={'13px'} viewBox="3 3 18 18" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12L4 4L6 12M20 12L4 20L6 12M20 12H6" stroke="#78BBB8" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </form>

    )
}
export default SendMessage;