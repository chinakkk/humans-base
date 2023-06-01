import styles from './DeleteHumanButton.module.scss'
import {FC} from "react"
import React from "react";
import {setUser, userType} from "../../../redux/slices/authUserSlice";
import {deleteUserFirestore, updateImgByUidFirestore} from "../../../dataBaseResponse/usersFirestore";
import {deleteObject, ref} from "firebase/storage";
import {storage} from "../../../firebase";


type DeleteButtonProps = {
    userInfo: userType;
    setUsersCardArr: React.Dispatch<React.SetStateAction<userType[]>>;

}

const DeleteHumanButton: FC<DeleteButtonProps> = ({userInfo, setUsersCardArr}) => {
    const onClickDeleteButton = async () => {
        // eslint-disable-next-line no-restricted-globals
        const deleteUserBool: boolean = confirm('Удалить пользователя?')
        if (deleteUserBool) {
            try {
                setUsersCardArr((prevState: userType[]) =>
                    prevState.filter((user: userType) => user.uid !== userInfo.uid)
                )
                await deleteUserFirestore(userInfo.uid)

            } catch (error) {
                console.log('Ошибка при удалении с сервера', error)
                alert('Ошибка при удалении с сервера')
            }
        }

    }

    return (
        <div
            title={'Delete'}
            className={styles.container}>
            <svg
                onClick={onClickDeleteButton}

                width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7H20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
                    stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}
export default DeleteHumanButton;