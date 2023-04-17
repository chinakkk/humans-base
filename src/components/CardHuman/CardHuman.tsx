import styles from './CardHuman.module.scss'
import React, {FC, useState} from "react"
import {userInfoType} from "../../types/types";
import {toUpperHeadString} from "../../functions/toUpperHeadString";
import DeleteHumanButton from "../DeleteHumanButton/DeleteHumanButton";
import OpenedCardHuman from "../OpededCardHuman/OpenedCardHuman";

type CardHumanProps = {
    userInfo: userInfoType;
    setUsersCardArr?: React.Dispatch<React.SetStateAction<userInfoType[]>>;
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
                    cardIsOpen={cardIsOpen}
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