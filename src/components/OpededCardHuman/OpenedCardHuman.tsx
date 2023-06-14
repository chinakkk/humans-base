import styles from './OpenedCardHuman.module.scss'
import React, {FC, useState} from "react"
import {toUpperCaseHead} from "../../utils/toUpperCaseHead";
import DeleteHumanButton from "./DeleteHumanButton/DeleteHumanButton";
import ToggleTaskModeButton from "./ToggleTaskModeButton/ToggleTaskModeButton";
import {userType} from "../../redux/slices/authUserSlice";
import {useAdminAuth} from "../../hooks/useAdminAuth";
import OpenedCardHumanBot from "./OpenedCardHumanBot/OpenedCardHumanBot";
import noPhotoSrc from "../../assets/noPhoto.png";
import ToggleEditModeButton from "./ToggleTaskModeButton/ToggleEditModeButton";
import EditUserInfo from "./EditUserInfo/EditUserInfo";

type OpenedCardHuman = {
    setCardIsOpen: (value: boolean) => void;
    setUsersCardArr: React.Dispatch<React.SetStateAction<userType[]>>;
    userInfo: userType;
}

const OpenedCardHuman: FC<OpenedCardHuman> = ({
                                                  setCardIsOpen,
                                                  userInfo,
                                                  setUsersCardArr,
                                              }) => {
    const [addTaskMode, setAddTaskMode] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [userImageUrl,setUserImageUrl]=useState<string>(userInfo.imageURL||'')
    const isAdmin = useAdminAuth()

    return (
        <div className={styles.container}>
            <div onClick={() => setCardIsOpen(false)} className={styles.overlay}></div>
            <div className={styles.window}>
                <div className={styles.topWindow}>
                    {
                        //если юзер это админ
                        isAdmin && (
                            <>
                                <DeleteHumanButton
                                    userInfo={userInfo}
                                    setUsersCardArr={setUsersCardArr}/>

                                {
                                    !editMode &&
                                    <ToggleTaskModeButton
                                        setAddTaskMode={setAddTaskMode}
                                        addTaskMode={addTaskMode}
                                    />
                                }
                                {
                                    !addTaskMode &&
                                    <ToggleEditModeButton
                                        setEditMode={setEditMode}
                                        editMode={editMode}
                                        setUserImageUrl={setUserImageUrl}
                                        userInfo={userInfo}

                                    />

                                }


                            </>
                        )
                    }
                    <div className={styles.photoContainer}>
                        <img
                            className={styles.photo + ' ' + (!userImageUrl && styles.noPhoto)}
                            src={userImageUrl || noPhotoSrc}
                            alt="Human"
                        />

                    </div>
                    <div className={styles.about}>
                        {
                            editMode ?
                                <EditUserInfo
                                    userInfo={userInfo}
                                    setEditMode={setEditMode}
                                    setUserImageUrl={setUserImageUrl}
                                    userImageUrl={userImageUrl}
                                />
                                :
                                <>
                                    <div className={styles.level}>{toUpperCaseHead(userInfo.level)}</div>
                                    <div
                                        className={styles.name}>{toUpperCaseHead(userInfo.name)} {toUpperCaseHead(userInfo.surname)}</div>
                                    <div className={styles.birthday}>{userInfo.birthday}</div>

                                </>
                        }


                    </div>

                </div>

                <OpenedCardHumanBot
                    userInfo={userInfo}
                    addTaskMode={addTaskMode}
                />


            </div>
        </div>
    )
}
export default OpenedCardHuman;