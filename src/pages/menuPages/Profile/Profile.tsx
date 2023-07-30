import styles from './Profile.module.scss'

import React, {FC, useEffect, useRef, useState} from "react";
import CardHuman from "../../../components/CardHuman/CardHuman";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../redux/store";
import PersonInfo from "./PersonInfo/PersonInfo";
import {resetConvertDate, toUpperCaseHead} from "../../../utils/toUpperCaseHead";
import {setUser, userType} from "../../../redux/slices/authUserSlice";
import noPhotoSrc from '../../../assets/noPhoto.png'
import ImageButtons from "./ImageButtons/ImageButtons";
import EditButtons from "./EditButtons/EditButtons";
import {getUserByUidFirestore} from "../../../dataBaseResponse/usersFirestore";


const Profile: FC = () => {
    const dispatch = useAppDispatch()

    const {user} = useSelector((state: RootState) => state.userSlice)
    const [editMode, setEditMode] = useState<boolean>(false)

    const [userImageUrl, setUserImageUrl] = useState<string>('')
    const [userImageFile, setUserImageFile] = useState<File | null>(null)
    const [userImageLastImageUrl, setUserImageLastImageUrl] = useState<string>(user.imageURL || '')

    const [editNameInput, setEditNameInput] = useState<string>(user.name || '')
    const [editSurnameInput, setEditSurnameInput] = useState<string>(user.surname || '')
    const [editAboutTextarea, setEditAboutTextarea] = useState<string>(user.about || '')
    const [editDateInput, setEditDateInput] = useState<string>(resetConvertDate(user.birthday) || '')

    useEffect(() => {
        (async () => {
            const documentSnapshot = await getUserByUidFirestore(user.uid) || undefined;
            if (documentSnapshot) {
                const currentUser: userType = documentSnapshot as userType;
                dispatch(setUser(currentUser))
            } else {
                // Обработка, если документ не существует
            }
        })()

    }, [])

    //форматированные данные
    const userInfo: userType = {
        uid: user.uid,
        name: toUpperCaseHead(user.name),
        surname: toUpperCaseHead(user.surname),
        level: toUpperCaseHead(user.level),
        birthday: user.birthday,
        login: '',
        imageURL: user.imageURL,
        about: user.about,

    }


    return (
        <div className={styles.container}>
            <div className={styles.contentTop}>
                <div className={styles.photoContainer}>
                    <img
                        className={styles.photo}
                        src={userImageUrl || user.imageURL || noPhotoSrc}
                        alt="Human"
                    />
                    {
                        editMode &&
                        <ImageButtons
                            setUserImage={setUserImageFile}
                            setUserImageUrl={setUserImageUrl}
                            setUserImageLastImageUrl={setUserImageLastImageUrl}
                        />
                    }
                </div>



                <PersonInfo userInfo={userInfo}
                            editMode={editMode}
                            editNameInput={editNameInput}
                            setEditNameInput={setEditNameInput}
                            editSurnameInput={editSurnameInput}
                            setEditSurnameInput={setEditSurnameInput}
                            editDateInput={editDateInput}
                            setEditDateInput={setEditDateInput}
                />



            </div>
            <div className={styles.contentBot}>
                <div className={styles.aboutMeInput + ' ' + (editMode && styles.aboutMeInputEditMode)}>
                    {
                        editMode ?
                            <textarea
                                className={styles.area}
                                onChange={(event) => setEditAboutTextarea(event.target.value)}
                                value={editAboutTextarea}
                            >
                            </textarea>
                            :
                            user.about

                    }
                </div>
                <EditButtons
                    editMode={editMode}
                    setEditMode={setEditMode}
                    userImageFile={userImageFile}
                    userImageLastImageUrl={userImageLastImageUrl}
                    setUserImageLastImageUrl={setUserImageLastImageUrl}
                    setUserImageUrl={setUserImageUrl}
                    editNameInput={editNameInput}
                    editSurnameInput={editSurnameInput}
                    setEditNameInput={setEditNameInput}
                    setEditSurnameInput={setEditSurnameInput}
                    editAboutTextarea={editAboutTextarea}
                    editDateInput={editDateInput}
                    setEditDateInput={setEditDateInput}

                />
            </div>
        </div>
    )
}
export default Profile;