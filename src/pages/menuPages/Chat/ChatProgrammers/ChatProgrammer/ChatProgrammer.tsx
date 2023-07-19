import styles from './ChatProgrammer.module.scss'
import {FC} from "react"
import noPhotoSrcBackground from '../../../../../assets/noPhotoBackground.png'
import {userType} from "../../../../../redux/slices/authUserSlice";
import {toUpperCaseHead} from "../../../../../utils/toUpperCaseHead";


type ChatProgrammerProps = {
    user:userType;
}

const ChatProgrammer: FC<ChatProgrammerProps> = ({user}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img className={styles.photo} src={user.imageURL||noPhotoSrcBackground} alt="user"/>
                <div>
                    <div className={styles.level}>{toUpperCaseHead(user.level) }</div>
                    <div className={styles.name}>{toUpperCaseHead(user.name)} {toUpperCaseHead(user.surname)}</div>

                </div>
            </div>
        </div>
    )
}
export default ChatProgrammer;