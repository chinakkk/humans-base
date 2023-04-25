import styles from './OpenedCardHuman.module.scss'
import React, {FC} from "react"
import {userInfoType} from "../../types/types";
import {toUpperHeadString} from "../../functions/toUpperHeadString";
import DeleteHumanButton from "../DeleteHumanButton/DeleteHumanButton";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import AddNewTaskButton from "../AddNewTaskButton/AddNewTaskButton";
import {userType} from "../../redux/slices/userSlice";

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
    const {user,adminUser} = useSelector((state: RootState) => state.userSlice)
    return (
        <div className={styles.container}>
            <div onClick={() => setCardIsOpen(false)} className={styles.overlay}></div>
            <div className={styles.window}>
                <div className={styles.topWindow}>
                    {
                        //если юзер это админ
                        user.login === adminUser.login && (
                            <>
                                <DeleteHumanButton userInfo={userInfo}
                                                   setUsersCardArr={setUsersCardArr}/>
                                <AddNewTaskButton user={userInfo}/>
                            </>
                        )
                    }
                    <div className={styles.photo}> Photo</div>
                    <div className={styles.about}>
                        <div className={styles.level}>{toUpperHeadString(userInfo.level)}</div>
                        <div
                            className={styles.name}>{toUpperHeadString(userInfo.name)} {toUpperHeadString(userInfo.surname)}</div>
                        <div className={styles.birthday}>{userInfo.birthday}</div>
                    </div>
                </div>
                <div className={styles.botWindow}>
                    <div className={styles.note}>Заметка</div>
                    {/*<button className={styles.editButton}>Редактировать</button>*/}
                </div>
            </div>
        </div>
    )
}
export default OpenedCardHuman;