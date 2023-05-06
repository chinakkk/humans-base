import styles from './CardHuman.module.scss'
import borderStyles from './BorderCardHuman.module.scss'
import React, {FC, useState} from "react"
import {toUpperHeadFunc} from "../../utils/toUpperHeadFunc";
import OpenedCardHuman from "../OpededCardHuman/OpenedCardHuman";
import {userType} from "../../redux/slices/userSlice";

type CardHumanProps = {
    userInfo: userType;
    setUsersCardArr?: React.Dispatch<React.SetStateAction<userType[]>>;
    openOnClick?: boolean;
}

const CardHuman: FC<CardHumanProps> = ({
                                           userInfo,
                                           setUsersCardArr = () => {
                                           },
                                           openOnClick = true,
                                       }) => {
    const [cardIsOpen, setCardIsOpen] = useState<boolean>(false)
    return (

        <div>
            {
                (cardIsOpen && openOnClick) && <OpenedCardHuman
                    setCardIsOpen={setCardIsOpen}
                    setUsersCardArr={setUsersCardArr}
                    userInfo={userInfo}


                />
            }
            <div
                onClick={() => setCardIsOpen(true)}
                className={`${styles.container} ${borderStyles.border}`}>

                <div className={styles.photo}>Photo</div>
                <div className={styles.about}>
                    <div className={styles.level}>{toUpperHeadFunc(userInfo.level)}</div>
                    <div
                        className={styles.name}>{toUpperHeadFunc(userInfo.name)} {toUpperHeadFunc(userInfo.surname)}</div>
                </div>
            </div>

        </div>
    )
}
export default CardHuman;