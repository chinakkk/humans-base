import React, {FC} from "react"
import styles from './ModeButtons.module.scss'
import {userType} from "../../../redux/slices/authUserSlice";

type ToggleEditModeButtonProps = {
    setEditMode: (value: boolean) => void;
    editMode: boolean;
    setUserImageUrl:(value:string) => void;
    userInfo:userType;
}

const ToggleEditModeButton: FC<ToggleEditModeButtonProps> = ({
                                                                 setEditMode,
                                                                 editMode,
                                                                 setUserImageUrl,
                                                                 userInfo,
                                                             }) => {
    const onClickEdit = () => {
        setEditMode(!editMode)
        if(editMode){
            setUserImageUrl(userInfo.imageURL||'')
        }
    }
    return (
        <div className={styles.container}>

            <button
                onClick={onClickEdit}
                className={`${styles.toggleModeButton} ${styles.editButton} ${editMode ? styles.goBackButton : ''}`}
            >
                {editMode ? 'Go back' : 'Edit mode'}
            </button>

        </div>
    )
}
export default ToggleEditModeButton;