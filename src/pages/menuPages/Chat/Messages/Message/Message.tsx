import styles from './Message.module.scss'
import React, {FC, useEffect, useRef, useState} from "react"
import {messageType} from "../../../../../types/types";
import {RootState} from "../../../../../redux/store";
import {useSelector} from "react-redux";
import ContextMenu from "./ContextMenu/ContextMenu";
import {transformDateFromUser} from "../../../../../utils/toUpperCaseHead";

type MessageNewProps = {
    messageObj: messageType;
    contextMenuMessagesState: boolean;
    setContextMenuMessagesIsOpen: (value: boolean) => void;
    setContextMenuMessagesState: (value: boolean) => void;

}

const Message: FC<MessageNewProps> = ({
                                          messageObj,
                                          contextMenuMessagesState,
                                          setContextMenuMessagesIsOpen,
                                          setContextMenuMessagesState,
                                      }) => {
    const [contextMenuIsOpen, setContextMenuIsOpen] = useState<boolean>(false)
    const [mouseX, setMouseX] = useState<number>(0)
    const [mouseY, setMouseY] = useState<number>(0)

    const contentRef = useRef<HTMLDivElement>(null)

    const {user, adminUser} = useSelector((state: RootState) => state.userSlice)
    const isUserMessage = user.login === messageObj.login
    const userDate=transformDateFromUser(messageObj.date)
    const time = `${userDate.slice(8, 10)}:${userDate.slice(10, 12)}`
    const nameInMessage = messageObj.login === user.login ? '' : (messageObj.login === adminUser.login ? 'admin' : messageObj.login)

    const onClickContentBlock = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        setContextMenuMessagesState(!contextMenuMessagesState)
        if (event.button === 2) {
            setTimeout(() => {
                setMouseX(event.clientX)
                setMouseY(event.clientY)
                setContextMenuIsOpen(true)
                setContextMenuMessagesIsOpen(true)

            }, 200)
        }
    }


    useEffect(() => {
        //удаление нажатия правой кнопкой мыши на сообщение
        if (contentRef.current) {
            contentRef.current.addEventListener('contextmenu', (event) => {
                event.preventDefault()
            })

        }

    }, [])
    // useEffect(() => {
    //     setTimeout(() => {
    //         setContextMenuMessagesIsOpen(false)
    //         setContextMenuIsOpen(false)
    //     },200)
    //
    //
    // }, [contextMenuMessagesState])

    return (
        <div className={styles.container + ' ' + (isUserMessage ? styles.userMessage : '')}>
            <div className={styles.content}
                 onMouseDown={(event) => onClickContentBlock(event)}
                 ref={contentRef}
            >
                <div className={styles.name}>{nameInMessage}</div>
                <div>
                    <span className={styles.message}>{messageObj.inputMessage}</span>
                    <span className={styles.timeHidden}>{time}</span>
                    <span className={styles.time}>{time}</span>
                </div>

                {/* 593 321 561 318*/}
            </div>
            {
                contextMenuIsOpen &&
                <ContextMenu
                    messageObj={messageObj}
                    isUserContextMenu={(messageObj.login === user.login)}
                    setContextMenuIsOpen={setContextMenuIsOpen}
                    contextMenuIsOpen={contextMenuIsOpen}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    setContextMenuMessagesIsOpen={setContextMenuMessagesIsOpen}
                />
            }

        </div>
    )
}
export default Message;