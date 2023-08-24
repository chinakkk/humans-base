import styles from './UserImage.module.scss'
import React, {FC, useEffect, useRef, useState} from "react"
import noPhotoSrc from "../../../../assets/noPhoto.png";
import {userType} from "../../../../redux/slices/authUserSlice";
import {updateImgByUidFirestore} from "../../../../dataBaseResponse/usersFirestore";

type UserImageProps = {
    editMode: boolean;
    userInfo: userType;
    userImageUrl: string;
    setUserImageUrl: (value: string) => void;
}

const UserImage: FC<UserImageProps> = ({
                                           editMode,
                                           userInfo,
                                           userImageUrl,
                                           setUserImageUrl
                                       }) => {

    const imageRef = useRef<HTMLDivElement>(null)
    const [editImageMode, setEditImageMode] = useState<boolean>(false)

    const onClickDeleteImg = () => {
        // eslint-disable-next-line no-restricted-globals
        const deleteImg: any = confirm('Вы хотите удалить изображение?')
        if (deleteImg) {
            userInfo.imageURL = ''
            updateImgByUidFirestore(userInfo.uid, '').then()
            setUserImageUrl('')
        }
    }
    useEffect(() => {

        const clickOutsideImage = (event: MouseEvent) => {
            const _event = event as MouseEvent & {
                path: Node[]
            }
            if (imageRef.current && !event.composedPath().includes(imageRef.current))
                setEditImageMode(false)
        }
        document.body.addEventListener('click', clickOutsideImage)

        return () => document.body.removeEventListener('click', clickOutsideImage)

    }, [])


    return (
        <div className={styles.container + ' ' + (editImageMode ? styles.editImageMode : '')}
             ref={imageRef}
             onClick={() => setEditImageMode(true)}
        >
            <div className={styles.photoContainer}>
                {
                    editMode && !!userInfo.imageURL &&
                    <div className={styles.blackout}>
                      <button onClick={onClickDeleteImg} className={styles.deleteImgButton}>
                        Delete image
                      </button>
                    </div>
                }
                <img
                    className={styles.photo + ' ' + (!userImageUrl && styles.noPhoto)}
                    src={userImageUrl || noPhotoSrc}
                    alt="Human"
                />

            </div>
        </div>
    )
}
export default UserImage;