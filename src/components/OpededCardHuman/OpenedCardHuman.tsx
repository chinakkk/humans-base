import styles from './OpenedCardHuman.module.scss'
import React, {FC} from "react"
import {userInfoType} from "../../types/types";
import {toUpperHeadString} from "../../functions/toUpperHeadString";
import DeleteHumanButton from "../DeleteHumanButton/DeleteHumanButton";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

type OpenedCardHuman = {
    cardIsOpen: boolean;
    setCardIsOpen: (value: boolean) => void;
    setUsersCardArr: React.Dispatch<React.SetStateAction<userInfoType[]>>;
    userInfo: userInfoType;
}

const OpenedCardHuman: FC<OpenedCardHuman> = ({
                                                  cardIsOpen,
                                                  setCardIsOpen,
                                                  userInfo,
                                                  setUsersCardArr,
                                              }) => {
    const {user} = useSelector((state:RootState) => state.userSlice)
    return (
        <div className={styles.container}>
            <div onClick={() => setCardIsOpen(!cardIsOpen)} className={styles.overlay}>

            </div>
            <div className={styles.window}>
                <div className={styles.topWindow}>
                    {
                        user.login==='a' &&
                        <DeleteHumanButton userInfo={userInfo} setUsersCardArr={setUsersCardArr}/>
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
                    <button className={styles.editButton}>Редактировать</button>
                </div>
            </div>
        </div>
    )
}
export default OpenedCardHuman;