import styles from './CardHuman.module.scss'
import React, {FC, useState} from "react"
import {toUpperHeadString} from "../../functions/toUpperHeadString";
import OpenedCardHuman from "../OpededCardHuman/OpenedCardHuman";
import {userType} from "../../redux/slices/userSlice";

type CardHumanProps = {
    userInfo: userType;
    setUsersCardArr?: React.Dispatch<React.SetStateAction<userType[]>>;
    openOnClick?: boolean
}

const CardHuman: FC<CardHumanProps> = ({
                                           userInfo,
                                           setUsersCardArr = () => {
                                           },
                                           openOnClick = true
                                       }) => {
    const [cardIsOpen, setCardIsOpen] = useState<boolean>(false)
    return (

        <div className={styles.container}>
            {
                (cardIsOpen && openOnClick) && <OpenedCardHuman
                    setCardIsOpen={setCardIsOpen}
                    userInfo={userInfo}
                    setUsersCardArr={setUsersCardArr}
                />
            }
            <div
                onClick={() => setCardIsOpen(true)}
                className={styles.wrapper}>

                <div className={styles.photo}>Photo</div>
                <div className={styles.about}>
                    <div className={styles.level}>{toUpperHeadString(userInfo.level)}</div>
                    <div
                        className={styles.name}>{toUpperHeadString(userInfo.name)} {toUpperHeadString(userInfo.surname)}</div>
                </div>
            </div>

        </div>
    )
}
export default CardHuman;