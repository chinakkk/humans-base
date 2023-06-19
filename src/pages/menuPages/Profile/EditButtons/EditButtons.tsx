import styles from './EditButtons.module.scss'
import React, {FC} from "react"
import {setUser} from "../../../../redux/slices/authUserSlice";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../firebase";
import {updateImgByUidFirestore, updateUserInfoByUidFirestore} from "../../../../dataBaseResponse/usersFirestore";
import {RootState, useAppDispatch} from "../../../../redux/store";
import {useSelector} from "react-redux";
import {convertDate, resetConvertDate} from "../../../../utils/toUpperCaseHead";

type EditButtonsProps = {
    editMode: boolean;
    setEditMode: (value: boolean) => void;
    userImageFile: File | null;
    userImageLastImageUrl: string;
    setUserImageLastImageUrl: (value: string) => void;
    setUserImageUrl: (value: string) => void;
    editNameInput: string;
    editSurnameInput: string;
    setEditNameInput: (value: string) => void;
    setEditSurnameInput: (value: string) => void;
    editAboutTextarea: string;
    editDateInput:string;
    setEditDateInput:(value:string) => void;
}

const EditButtons: FC<EditButtonsProps> = ({
                                               editMode,
                                               setEditMode,
                                               userImageFile,
                                               userImageLastImageUrl,
                                               setUserImageLastImageUrl,
                                               setUserImageUrl,
                                               editNameInput,
                                               editSurnameInput,
                                               setEditNameInput,
                                               setEditSurnameInput,
                                               editAboutTextarea,
                                               editDateInput,
                                               setEditDateInput,
                                           }) => {
    const dispatch = useAppDispatch()
    const {user} = useSelector((state: RootState) => state.userSlice)


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
    const resetEditInputs = () => {
        setEditNameInput(user.name)
        setEditSurnameInput(user.surname)
        setEditDateInput(resetConvertDate(user.birthday))
    }
    const saveEditUserInfo = () => {
        if (user.name !== editNameInput ||
            user.surname !== editSurnameInput ||
            user.about !== editAboutTextarea ||
            resetConvertDate(user.birthday)!==editDateInput
        ) {
            const editedUserDate = {
                name: editNameInput,
                surname: editSurnameInput,
                about: editAboutTextarea,
                birthday:convertDate(editDateInput) ,
            }
            dispatch(setUser(
                {
                    ...user,
                    ...editedUserDate

                }
            ))
            updateUserInfoByUidFirestore(user.uid,
                {
                    ...editedUserDate
                }
            ).then(
                () => {
                    console.log('Данные изменены.')
                }).catch(() => console.log('Ошибка при изменении данных.'))
        }

    }
    const onClickEdit = () => {
        setEditMode(true)
    }

    const onClickSave = () => {
        setEditMode(!editMode)
        uploadImgOnFirebase(userImageFile).then(() => setUserImageUrl(''))
        if (!!userImageLastImageUrl && !user.imageURL) deleteImageFromFirebase()
        saveEditUserInfo()

    }

    const onClickCancel = () => {
        setEditMode(false)
        setUserImageUrl('')
        dispatch(setUser({...user, imageURL: userImageLastImageUrl}))
        resetEditInputs()
    }
    return (
        <div className={styles.container}>
            {
                editMode ?
                    <>
                        <button onClick={onClickSave} className={styles.editButton}>Save</button>
                        <button onClick={onClickCancel} className={styles.cancelButton}>Cancel</button>

                    </>
                    :
                    <button onClick={onClickEdit} className={styles.editButton}>
                        Edit
                    </button>
            }
        </div>
    )
}
export default EditButtons;