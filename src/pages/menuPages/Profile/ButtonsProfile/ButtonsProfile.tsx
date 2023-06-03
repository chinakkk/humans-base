import styles from './ButtonsProfile.module.scss'
import React, {FC, useRef, useState} from "react"
import {storage} from "../../../../firebase";
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from "firebase/storage";
import { useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../../redux/store";
import {updateImgByUidFirestore} from "../../../../dataBaseResponse/usersFirestore";
import {setUser} from "../../../../redux/slices/authUserSlice";


type BottomProfileType = {}

const ButtonsProfile: FC<BottomProfileType> = ({}) => {
    const dispatch = useAppDispatch()
    const {user} = useSelector((state: RootState) => state.userSlice)
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = await event.target.files
        await console.log('Img is pending...')
        if (files && files.length > 0) await uploadImg(files[0])

    }
    const uploadImg = async (file: File) => {
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
                        console.log('new err')
                    });
            }

        } catch (error) {
            alert('Ошибка при загрузке изображения')
            console.log(error)
        }
    }
    const onClickPickImg = () => {
        inputFileRef.current?.click();
    }

    const onClickDelete = () => {
        if (!!user.imageURL) {
            const deleteRef = ref(storage, `programmersImg/${user.uid}`);
            deleteObject(deleteRef).then(() => {
                updateImgByUidFirestore(user.uid, '').then()
                dispatch(setUser({...user, imageURL: ''}))
                console.log('img is deleted')

            }).catch((error) => {
                alert('Ошибка при удалении картинки.')
                console.log('Ошибка при удалении картинки.')
                console.log(error)
            });
        }


    }

    return (
        <div className={styles.container}>


            <input className={styles.inputFile}
                   ref={inputFileRef}
                   onChange={(event) => handleChange(event)}
                   type="file"
                   accept={'.png,.jpg,.jpeg'}
            />

            <button onClick={onClickPickImg} className={styles.uploadButton}>
                Upload image
            </button>

            <button onClick={onClickDelete} className={styles.deleteButton}>
                Delete image
            </button>


        </div>
    )
}
export default ButtonsProfile;