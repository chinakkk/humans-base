import styles from './Profile.module.scss'

import React, {FC, useEffect, useState} from "react";
import CardHuman from "../../../components/CardHuman/CardHuman";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import PersonInfo from "./PersonInfo/PersonInfo";
import ButtonsProfile from "./ButtonsProfile/ButtonsProfile";
import {toUpperHeadFunc} from "../../../utils/toUpperHeadFunc";
import {userType} from "../../../redux/slices/authUserSlice";
import noPhotoSrc from '../../../assets/noPhoto.png'


const Profile: FC = () => {
    const {user} = useSelector((state: RootState) => state.userSlice)


    //форматированные данные
    const userInfo: userType = {
        uid: user.uid || '',
        name: toUpperHeadFunc(user.name),
        surname: toUpperHeadFunc(user.surname),
        level: toUpperHeadFunc(user.level),
        birthday: user.birthday || '',
        login: '',
        imageURL: user.imageURL

    }

    return (
        <div className={styles.container}>
            <div className={styles.contentTop}>
                <img
                    className={styles.photo}
                    src={user.imageURL || noPhotoSrc}
                    alt="Human"/>
                <PersonInfo userInfo={userInfo}/>

                <div className={styles.cardProfile}>
                    <CardHuman userInfo={userInfo} openOnClick={false}/>
                </div>

            </div>
            <div className={styles.contentBot}>
                <div className={styles.aboutMeInput}></div>

                <ButtonsProfile
                />

            </div>


        </div>
    )
}
export default Profile;