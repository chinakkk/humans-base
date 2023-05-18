import styles from './OpenedCardHuman.module.scss'
import React, {FC, useState} from "react"
import {toUpperHeadFunc} from "../../utils/toUpperHeadFunc";
import DeleteHumanButton from "./DeleteHumanButton/DeleteHumanButton";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import ToggleTaskModeButton from "./ToggleTaskModeButton/ToggleTaskModeButton";
import {userType} from "../../redux/slices/authUserSlice";
import {useAdminAuth} from "../../hooks/useAdminAuth";
import OpenedCardHumanBot from "./OpenedCardHumanBot/OpenedCardHumanBot";

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
    const [addTaskMode,setAddTaskMode]=useState<boolean>(false)
    const isAdmin=useAdminAuth()
    return (
        <div className={styles.container}>
            <div onClick={() => setCardIsOpen(false)} className={styles.overlay}></div>
            <div className={styles.window}>
                <div className={styles.topWindow}>
                    {
                        //если юзер это админ
                        isAdmin && (
                            <>
                                <DeleteHumanButton userInfo={userInfo}
                                                   setUsersCardArr={setUsersCardArr}/>
                                <ToggleTaskModeButton user={userInfo}
                                                      setAddTaskMode={setAddTaskMode}
                                                      addTaskMode={addTaskMode}
                                />
                            </>
                        )
                    }
                    <div className={styles.photo}> Photo</div>
                    <div className={styles.about}>
                        <div className={styles.level}>{toUpperHeadFunc(userInfo.level)}</div>
                        <div
                            className={styles.name}>{toUpperHeadFunc(userInfo.name)} {toUpperHeadFunc(userInfo.surname)}</div>
                        <div className={styles.birthday}>{userInfo.birthday}</div>
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