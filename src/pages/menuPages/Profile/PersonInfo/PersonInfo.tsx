import styles from './PersonInfo.module.scss'
import {FC} from "react"
import {userType} from "../../../../redux/slices/authUserSlice";

type PersonInfo = {
    userInfo:userType
}

const PersonInfo: FC<PersonInfo> = ({userInfo}) => {

    return (
        <div className={styles.container}>
            <div className={styles.level}>{userInfo.level}</div>
            <div className={styles.name}>{userInfo.name + ' ' + userInfo.surname}</div>
            <div className={styles.birthday}>{userInfo.birthday}</div>
        </div>
    )
}
export default PersonInfo;