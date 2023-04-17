import styles from './Profile.module.scss'

import {FC, useEffect} from "react";
import CardHuman from "../../../components/CardHuman/CardHuman";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import PersonInfo from "./PersonInfo/PersonInfo";
import Note from "./Note/Note";
import {userInfoType} from "../../../types/types";
import {toUpperHeadString} from "../../../functions/toUpperHeadString";



const Profile: FC = () => {
    const {user} = useSelector((state: RootState) => state.userSlice)

    //форматированные данные
    const userInfo: userInfoType = {
        id: user.id || '',
        name: toUpperHeadString(user.name),
        surname: toUpperHeadString(user.surname),
        level: toUpperHeadString(user.level),
        birthday: user.birthday || '',
    }
    //

    return (
        <div className={styles.container}>
            <div className={styles.contentTop}>
                <div className={styles.photo}>Photo</div>
                <PersonInfo userInfo={userInfo}/>

                <div className={styles.cardProfile}>
                    <CardHuman userInfo={userInfo} openOnClick={false}/>
                </div>

            </div>
            <Note/>


        </div>
    )
}
export default Profile;