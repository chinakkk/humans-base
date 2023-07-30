import styles from './SendMessage.module.scss'
import {FC, useState} from "react"
import {realTimeDB} from '../../../../firebase'
import {uid} from "uid";
import {set, ref} from 'firebase/database'
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {getCurrentDate, getCurrentDateUTC, transformDateFromUser} from "../../../../utils/toUpperCaseHead";


type SendMessageProps = {
    scrollToBottom:() =>void ;
    inputMessage:string;
    setInputMessage:(value:string) => void;
}

const SendMessage: FC <SendMessageProps>= ({scrollToBottom,inputMessage,
                                               setInputMessage}) => {
    const {user} = useSelector((state: RootState) => state.userSlice)


    const sendMessageToDatabase = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (!!inputMessage.length) {
            const uuid = uid()
            const newMessageObj =
                {
                    uuid: uuid,
                    inputMessage: inputMessage,
                    login: user.login,
                    date: getCurrentDateUTC(),
                }

            set(ref(realTimeDB, `/${uuid}`), newMessageObj).then( ).catch()
        }
        console.log(transformDateFromUser(getCurrentDateUTC()))

        setTimeout(() => scrollToBottom(),0)

        setInputMessage('')
    }

    return (
        <form className={styles.container}>
            <input className={styles.sendInput}
                   value={inputMessage}
                   onChange={(event) => setInputMessage(event.target.value)}
            >

            </input>
            <button onClick={sendMessageToDatabase} className={styles.sendButton + ' ' + (!!inputMessage.length ? styles.sendButtonActive : '')}>
                <svg className={styles.buttonSVG}
                     width={'13px'} height={'13px'} viewBox="3 3 18 18" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12L4 4L6 12M20 12L4 20L6 12M20 12H6" stroke="#67AEA9" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </form>

    )
}
export default SendMessage;