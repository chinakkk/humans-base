import styles from './PersonInfo.module.scss'
import {FC} from "react"
import {userType} from "../../../../redux/slices/authUserSlice";

type PersonInfo = {
    userInfo:userType,
    editMode:boolean,
}

const PersonInfo: FC<PersonInfo> = ({userInfo,editMode}) => {

    return (
        <div className={styles.container}>
            <div className={styles.level}>{userInfo.level}</div>

            {
                editMode?
                    <div className={styles.inputs}>
                        <input className={styles.input} type="text"/>
                        <input className={styles.input} type="text"/>
                        <input className={styles.input} type="date"/>
                    </div>
                    :
                    <>
                        <div className={styles.name}>{userInfo.name + ' ' + userInfo.surname}</div>
                        <div className={styles.birthday}>{userInfo.birthday}</div>
                    </>

            }



        </div>
    )
}
export default PersonInfo;