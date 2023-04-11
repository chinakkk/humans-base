import styles from './PersonInfo.module.scss'
import {FC} from "react"
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

const PersonInfo: FC = () => {
    const {user} = useSelector((state: RootState) => state.userSlice)

    //создание заглавных букв
    const name = user.name ? user.name[0].toUpperCase() + user.name.slice(1) : ''
    const surName = user.surname ? user.surname[0].toUpperCase() + user.surname.slice(1) : ''
    const role = user.role ? user.role[0].toUpperCase() + user.role.slice(1) : ''
    //

    return (
        <div className={styles.container}>
            <div>{role}</div>
            <div>{name + ' ' + surName}</div>
            <div>{user?.birthday}</div>
            <div>{user?.group} +</div>
        </div>
    )
}
export default PersonInfo;