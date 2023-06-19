import styles from './Message.module.scss'
import {FC} from "react"
import {messageType} from "../../../../../types/types";
import {remove, ref} from 'firebase/database'
import {realTimeDB} from "../../../../../firebase";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {useAdminAuth} from "../../../../../hooks/useAdminAuth";
import {transformDateFromUser} from "../../../../../utils/toUpperCaseHead";

type MessageProps = {
    messageObj: messageType;
}

const Message: FC<MessageProps> = ({messageObj}) => {
    const {adminUser, user} = useSelector((state: RootState) => state.userSlice)
    const isAdmin=useAdminAuth()
    const onClickRemoveMessage = () => {
        remove(ref(realTimeDB, `/${messageObj.uuid}`)).then().catch()
    }
    const userDate = transformDateFromUser(messageObj.date)
    const date = `${userDate.slice(6, 8)}.${userDate.slice(4, 6)}`
    const time = `${userDate.slice(8, 10)}:${userDate.slice(10, 12)}`

    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>
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
                <div className={styles.time}> {time}</div>


            </span>
                <div className={styles.date}> {date}</div>


                {
                    isAdmin&&
                    <button className={styles.removeButton} onClick={onClickRemoveMessage}>
                      <svg className={styles.buttonSVG} width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6L18 18" stroke="#9BD0D0" strokeLinecap="round"/>
                        <path d="M18 6L6.00001 18" stroke="#9BD0D0" strokeLinecap="round"/>
                      </svg>
                    </button>
                }
            </div>


        </div>
    )
}
export default Message;