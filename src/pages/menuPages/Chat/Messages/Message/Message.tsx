import styles from './Message.module.scss'
import {FC} from "react"
import {messageObjType} from "../../../../../types/types";
import {remove, ref} from 'firebase/database'
import {realTimeDB} from "../../../../../firebase";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";

type MessageProps = {
    messageObj: messageObjType;
}

const Message: FC<MessageProps> = ({messageObj}) => {
    const {adminUser, user} = useSelector((state: RootState) => state.userSlice)
    const onClickRemoveMessage = () => {
        remove(ref(realTimeDB, `/${messageObj.uuid}`)).then().catch()
    }
    const time = `${messageObj.date.slice(8, 10)}:${messageObj.date.slice(10, 12)}`

    return (
        <div className={styles.container}>
            <span className={styles.message}>
                <div>
                    <span
                        className={styles.login + ' ' + (messageObj.login === user.login ? styles.isUserLogin : '')}
                    >
                        {messageObj.login === adminUser.login ? 'admin' : messageObj.login.slice(0,5)}:
                    </span>
                    <span>
                        {messageObj.inputMessage}
                    </span>
                </div>
                <div className={styles.time}>{time}</div>


            </span>

            <button className={styles.removeButton} onClick={onClickRemoveMessage}>
                <svg className={styles.buttonSVG} width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L18 18" stroke="#9BD0D0" strokeLinecap="round"/>
                    <path d="M18 6L6.00001 18" stroke="#9BD0D0" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
    )
}
export default Message;