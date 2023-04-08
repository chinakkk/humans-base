import styles from './Profile.module.scss'

import {FC, useEffect} from "react";
import CardHuman from "../../../components/CardHuman/CardHuman";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const Profile: FC = () => {
    const {user} = useSelector((state: RootState) => state.userSlice)
    useEffect(() => {

    }, [])
    const name = user ? user.name[0].toUpperCase() + user.name.slice(1) : ''
    const surName = user ? user.surname[0].toUpperCase() + user.surname.slice(1) : ''
    const role = user ? user.role[0].toUpperCase() + user.role.slice(1) : ''

    return (
        <div className={styles.container}>
            <div className={styles.contentTop}>
                <div className={styles.photo}>Photo</div>
                <div className={styles.info}>
                    <div>{role}</div>
                    <div>{name + ' ' + surName}</div>
                    <div>{user?.birthday}</div>
                    <div>{user?.group} +</div>
                </div>
                <div className={styles.cardProfile}>
                    <CardHuman/>
                </div>

            </div>
            <div className={styles.contentBot}>
                <input
                    className={styles.aboutMeInput}
                />
                <button className={styles.editButton}>Edit</button>
            </div>


        </div>
    )
}
export default Profile;