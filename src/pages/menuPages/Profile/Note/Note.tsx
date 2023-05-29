import styles from './Note.module.scss'
import React, {FC, useRef, useState} from "react"
import {storage} from "../../../../firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {updateImgByUidFirestore} from "../../../../dataBaseResponse/usersFirestore";
import {setUser} from "../../../../redux/slices/authUserSlice";

const Note: FC = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state: RootState) => state.userSlice)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const onClickPickImg = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) setImageFile(files[0])
    }
    const onClickUploadImg = () => {
        try {

            const formData = new FormData()
            if (imageFile) {

                formData.append('file', imageFile)

                const metadata = {
                    contentType: 'image/jpeg'
                };

                const storageRef = ref(storage, 'programmersImg/' + user.uid);
                const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateImgByUidFirestore(user.uid, downloadURL)
                    dispatch(setUser({...user, imageURL: downloadURL}))
                    console.log('img is uploaded')
                });
            }
        }
        catch (error){
            alert('Ошибка при загрузке изображения')
            console.log(error)
        }
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

        </div>
    )
}
export default Note;