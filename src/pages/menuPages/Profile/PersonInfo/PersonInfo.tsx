import styles from './PersonInfo.module.scss'
import {FC} from "react"
import {userInfoType} from "../../../../types/types";

type PersonInfo = {
    userInfo:userInfoType
}

const PersonInfo: FC<PersonInfo> = ({userInfo}) => {

    return (
        <div className={styles.container}>
            <div>{userInfo.level}</div>
            <div>{userInfo.name + ' ' + userInfo.surname}</div>
            <div>{userInfo.birthday}</div>
        </div>
    )
}
export default PersonInfo;