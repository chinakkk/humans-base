import styles from './Profile.module.scss'

import {FC, useEffect} from "react";
import CardHuman from "../../../components/CardHuman/CardHuman";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import PersonInfo from "./PersonInfo/PersonInfo";
import Note from "./Note/Note";
import {toUpperHeadFunc} from "../../../utils/toUpperHeadFunc";
import {userType} from "../../../redux/slices/authUserSlice";



const Profile: FC = () => {
    const {user} = useSelector((state: RootState) => state.userSlice)

    //форматированные данные
    const userInfo: userType = {
        uid: user.uid || '',
        name: toUpperHeadFunc(user.name),
        surname: toUpperHeadFunc(user.surname),
        level: toUpperHeadFunc(user.level),
        birthday: user.birthday || '',
        login:'',
        imageURL:'https://firebasestorage.googleapis.com/v0/b/programmers-chat.appspot.com/o/chin.jpeg?alt=media&token=611d9aeb-dbb3-4920-a01f-9ee0caa7341f'

    }
    //

    return (
        <div className={styles.container}>
            <div className={styles.contentTop}>
                <img
                    className={styles.photo}
                    src={userInfo.imageURL}
                    alt="Human"/>
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