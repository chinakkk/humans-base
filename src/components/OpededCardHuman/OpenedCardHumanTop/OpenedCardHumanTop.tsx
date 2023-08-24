import styles from './OpenedCardHumanTop.module.scss'
import React, {FC, useState} from "react"
import DeleteHumanButton from "../DeleteHumanButton/DeleteHumanButton";
import ToggleTaskModeButton from "../ToggleTaskModeButton/ToggleTaskModeButton";
import ToggleEditModeButton from "../ToggleTaskModeButton/ToggleEditModeButton";
import noPhotoSrc from "../../../assets/noPhoto.png";
import EditUserInfo from "../EditUserInfo/EditUserInfo";
import {toUpperCaseHead} from "../../../utils/toUpperCaseHead";
import {useAdminAuth} from "../../../hooks/useAdminAuth";
import {updateImgByUidFirestore} from "../../../dataBaseResponse/usersFirestore";
import {userType} from "../../../redux/slices/authUserSlice";
import UserImage from "./UserImage/UserImage";

type OpenedCardHumanTopProps = {
    setAddTaskMode:(value: boolean ) => void;
    setEditMode:(value: boolean) => void;
    setUsersCardArr: React.Dispatch<React.SetStateAction<userType[]>>;
    userInfo:userType;
    addTaskMode:boolean;
    editMode:boolean;
    userImageUrl:string;
    setUserImageUrl:(value:string) => void;
}

const OpenedCardHumanTop: FC <OpenedCardHumanTopProps>= ({
                                                             userInfo,
                                                             setUsersCardArr,
                                                             setAddTaskMode,
                                                             addTaskMode,
                                                             setEditMode,
                                                             editMode,
                                                             userImageUrl,
                                                             setUserImageUrl
                                                         }) => {

    const isAdmin = useAdminAuth()


    return (
        <div className={styles.container}>
            <div className={styles.topWindow}>
                {
                    //если юзер это админ
                    isAdmin && (
                        <>
                            {
                                !editMode&&
                                <DeleteHumanButton
                                    userInfo={userInfo}
                                    setUsersCardArr={setUsersCardArr}
                                />
                            }
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
                <UserImage editMode={editMode}
                           userInfo={userInfo}
                           userImageUrl={userImageUrl}
                           setUserImageUrl={setUserImageUrl}
                />

                <div className={styles.about}>
                    {
                        !editMode &&
                            <>
                                <div className={styles.level}>{toUpperCaseHead(userInfo.level)}</div>
                                <div
                                    className={styles.name}>{toUpperCaseHead(userInfo.name)} {toUpperCaseHead(userInfo.surname)}</div>
                                <div className={styles.birthday}>{userInfo.birthday}</div>

                            </>
                    }
                </div>

            </div>
        </div>
    )
}
export default OpenedCardHumanTop;