import styles from './BottomProfile.module.scss'
import React, {FC, useRef, useState} from "react"
import {storage} from "../../../../firebase";
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {updateImgByUidFirestore} from "../../../../dataBaseResponse/usersFirestore";
import {setUser} from "../../../../redux/slices/authUserSlice";


type BottomProfileType = {
}

const BottomProfile: FC<BottomProfileType> = ({}) => {
    const dispatch = useDispatch()
    const {user} = useSelector((state: RootState) => state.userSlice)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) setImageFile(files[0])
    }
    const onClickPickImg = () => {
        inputFileRef.current?.click();
    }

    const onClickUploadImg = async () => {
        try {

            if (imageFile) {
                const metadata = {
                    contentType: 'image/jpeg'
                };
                const imageRef = ref(storage, 'programmersImg/' + user.uid);
                await uploadBytesResumable(imageRef, imageFile, metadata);

                await getDownloadURL(imageRef)
                    .then((url) => {
                        updateImgByUidFirestore(user.uid, url)
                        dispatch(setUser({...user, imageURL: url}))
                        console.log('img is uploaded')
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

    const onClickDelete = () => {

        const deleteRef = ref(storage, `programmersImg/${user.uid}`);
        deleteObject(deleteRef).then(() => {
            updateImgByUidFirestore(user.uid, '').then()
            dispatch(setUser({...user,imageURL:''}))
            console.log('img is deleted')

        }).catch((error) => {
            alert('Ошибка при удалении картинки.')
            console.log('Ошибка при удалении картинки.')
            console.log(error)
        });

    }

    return (
        <div className={styles.container}>

            <div className={styles.aboutMeInput}></div>

            <input className={styles.inputFile}
                   ref={inputFileRef}
                   onChange={(event) => handleChange(event)}
                   type="file"
                   accept={'.png,.jpg,.jpeg'}
            />

            <button onClick={onClickPickImg} className={styles.uploadButton}>
                Pick img
            </button>
            <button onClick={onClickUploadImg} className={styles.editButton}>
                Upload img
            </button>

            <button onClick={onClickDelete} className={styles.deleteButton}>
                Delete Img
            </button>


        </div>
    )
}
export default BottomProfile;