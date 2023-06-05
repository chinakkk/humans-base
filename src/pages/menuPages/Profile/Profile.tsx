import styles from './Profile.module.scss'

import React, {FC, useState} from "react";
import CardHuman from "../../../components/CardHuman/CardHuman";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../redux/store";
import PersonInfo from "./PersonInfo/PersonInfo";
import {toUpperHeadFunc} from "../../../utils/toUpperHeadFunc";
import {setUser, userType} from "../../../redux/slices/authUserSlice";
import noPhotoSrc from '../../../assets/noPhoto.png'
import ImageButtons from "./ImageButtons/ImageButtons";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../firebase";
import {updateImgByUidFirestore} from "../../../dataBaseResponse/usersFirestore";


const Profile: FC = () => {
    const {user} = useSelector((state: RootState) => state.userSlice)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [userImageUrl, setUserImageUrl] = useState<string>('')
    const [userImageFile, setUserImageFile] = useState<File | null>(null)
    const [userImageLastImageUrl, setUserImageLastImageUrl] = useState<string>(user.imageURL || '')
    const dispatch = useAppDispatch()


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
    const uploadImgOnFirebase = async (file: File | null) => {
        try {
            if (file) {
                const metadata = {
                    contentType: 'image/jpeg'
                };
                const imageRef = ref(storage, 'programmersImg/' + user.uid);
                await uploadBytesResumable(imageRef, file, metadata);
                await getDownloadURL(imageRef)
                    .then((url) => {
                        updateImgByUidFirestore(user.uid, url)
                        dispatch(setUser({...user, imageURL: url}))
                        console.log('Img is uploaded!')
                    })
                    .catch((error) => {
                        console.log(error)
                        console.log('Ошибка при получении ссылки на фотографию пользователя.')
                    });
            }

        } catch (error) {
            alert('Ошибка при загрузке изображения')
            console.log(error)
        }
    }
    const deleteImageFromFirebase = () => {
        if (!!userImageLastImageUrl) {
            const deleteRef = ref(storage, `programmersImg/${user.uid}`);
            deleteObject(deleteRef).then(() => {
                updateImgByUidFirestore(user.uid, '').then()
                dispatch(setUser({...user, imageURL: ''}))
                console.log('img is deleted')
                setUserImageLastImageUrl('')

            }).catch((error) => {
                alert('Ошибка при удалении картинки.')
                console.log('Ошибка при удалении картинки.')
                console.log(error)
            });
        }
    }
    const onClickSave = () => {
        setEditMode(!editMode)
        uploadImgOnFirebase(userImageFile).then(
            () => {
                setUserImageUrl('')

            }
        )
        if (!!userImageLastImageUrl && !user.imageURL) deleteImageFromFirebase()

    }
    const onClickCancel = () => {
        setEditMode(false)
        setUserImageUrl('')
        dispatch(setUser({...user, imageURL: userImageLastImageUrl}))

    }

    return (
        <div className={styles.container}>
            <div className={styles.contentTop}>
                <img
                    className={styles.photo}
                    src={userImageUrl || user.imageURL || noPhotoSrc}
                    alt="Human"/>
                {
                    editMode && <ImageButtons
                        setUserImage={setUserImageFile}
                        setUserImageUrl={setUserImageUrl}
                        setUserImageLastImageUrl={setUserImageLastImageUrl}
                    />
                }


                <PersonInfo userInfo={userInfo} editMode={editMode}/>

                <div className={styles.cardProfile}>
                    <CardHuman
                        userInfo={userInfo}
                        openOnClick={false}
                        userImageUrl ={userImageUrl}
                    />
                </div>

            </div>
            <div className={styles.contentBot}>
                <div className={styles.aboutMeInput}></div>
                {
                    editMode ?
                        <>
                            <button onClick={onClickSave} className={styles.editButton}>Save</button>
                            <button onClick={onClickCancel} className={styles.cancelButton}>Cancel</button>

                        </>
                        :
                        <button onClick={() => setEditMode(true)} className={styles.editButton}>
                            Edit
                        </button>
                }
            </div>
        </div>
    )
}
export default Profile;