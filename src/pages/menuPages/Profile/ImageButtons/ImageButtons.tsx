import styles from './ImageButtons.module.scss'
import React, {FC, useRef} from "react"
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../../redux/store";
import {setUser} from "../../../../redux/slices/authUserSlice";


type BottomProfileType = {
    setUserImage: (value: File|null) => void;
    setUserImageUrl: (value: string) => void;
    setUserImageLastImageUrl: (value: string) => void;
}

const ImageButtons: FC<BottomProfileType> = ({
                                                 setUserImage,
                                                 setUserImageUrl,
                                                 setUserImageLastImageUrl
                                             }) => {
    const dispatch = useAppDispatch()
    const {user} = useSelector((state: RootState) => state.userSlice)
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();

            reader.onload = () => {
                const url = reader.result;
                if (typeof (url) === "string") setUserImageUrl(url)
            };

            if (files[0]) {
                reader.readAsDataURL(files[0]);
                setUserImage(files[0])
            }
        }
    }


    const onClickPickImg = () => {
        inputFileRef.current?.click();
    }

    const onClickDelete = () => {
        setUserImageUrl('')
        setUserImage(null)
        setUserImageLastImageUrl(user.imageURL||'')
        dispatch(setUser({...user,imageURL:''}))
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
export default ImageButtons;