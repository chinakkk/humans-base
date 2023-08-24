import styles from './ImageButtons.module.scss'
import React, {FC, useEffect, useRef, useState} from "react"
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../../redux/store";
import {setUser} from "../../../../redux/slices/authUserSlice";


type BottomProfileType = {
    setUserImage: (value: File | null) => void;
    setUserImageUrl: (value: string) => void;
    setUserImageLastImageUrl: (value: string) => void;
    imageIsDeleted: boolean;
}

const ImageButtons: FC<BottomProfileType> = ({
                                                 imageIsDeleted,
                                                 setUserImage,
                                                 setUserImageUrl,
                                                 setUserImageLastImageUrl
                                             }) => {
    const dispatch = useAppDispatch()
    const {user} = useSelector((state: RootState) => state.userSlice)
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const [editImageMode,setEditImageMode]=useState<boolean>(false)
    const editImageRef = useRef<HTMLDivElement>(null)

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
        setEditImageMode(false)
    }

    const onClickDelete = () => {
        setUserImageUrl('')
        setUserImage(null)
        setUserImageLastImageUrl(user.imageURL || '')
        dispatch(setUser({...user, imageURL: ''}))
    }

    useEffect(() => {

        const clickOutsideImage = (event: MouseEvent) => {
            const _event = event as MouseEvent & {
                path: Node[]
            }
            if (editImageRef.current && !event.composedPath().includes(editImageRef.current))
                setEditImageMode(false)
        }
        document.body.addEventListener('click', clickOutsideImage)

        return () => document.body.removeEventListener('click', clickOutsideImage)

    }, [])

    return (
        <div className={styles.container + ' ' + (editImageMode? styles.editImageModeMobile:'')}
             ref={editImageRef}
             onClick={() => setEditImageMode(true)}
        >


            <input className={styles.inputFile}
                   ref={inputFileRef}
                   onChange={(event) => handleChange(event)}
                   type="file"
                   accept={'.png,.jpg,.jpeg'}
            />
            {/*Загрузка фотографии*/}
            <button onClick={onClickPickImg}
                    className={styles.uploadButton + ' ' + (!imageIsDeleted ? styles.imageIsDeleted : '')}>
                Choose image
            </button>
            {/*Удалить фотографию*/}
            {
                imageIsDeleted &&
                <button onClick={onClickDelete} className={styles.deleteButton}>
                  Delete image
                </button>
            }


        </div>
    )
}
export default ImageButtons;