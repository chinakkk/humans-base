import styles from './CardHuman.module.scss'
import borderStyles from './BorderCardHuman.module.scss'
import React, {FC, useEffect, useState} from "react"
import {toUpperCaseHead} from "../../utils/toUpperCaseHead";
import OpenedCardHuman from "../OpededCardHuman/OpenedCardHuman";
import {userType} from "../../redux/slices/authUserSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import noPhotoSrc from '../../assets/noPhoto.png'

type CardHumanProps = {
    userInfo: userType;
    setUsersCardArr?: React.Dispatch<React.SetStateAction<userType[]>>;
    openOnClick?: boolean;
    userImageUrl?:string;
}

const CardHuman: FC<CardHumanProps> = ({
                                           userInfo,
                                           setUsersCardArr = () => {
                                           },
                                           openOnClick = true,
                                           userImageUrl=undefined
                                       }) => {
    const [cardIsOpen, setCardIsOpen] = useState<boolean>(false)
    const {adminUser} = useSelector((state: RootState) => state.userSlice)
    const onClickCard = async () => {
        setCardIsOpen(true)
    }
    return (
        <>
            {
                (cardIsOpen && openOnClick) &&
                <OpenedCardHuman
                    setCardIsOpen={setCardIsOpen}
                    setUsersCardArr={setUsersCardArr}
                    userInfo={userInfo}
                />
            }
            <div
                onClick={onClickCard}
                className={`${styles.container} ${borderStyles.border}`}>
                <div className={styles.photoContainer}>
                <img
                    className={styles.photo + ' ' + (!userInfo.imageURL&& (userImageUrl===undefined || !userImageUrl) && styles.noPhoto)}
                    src={userImageUrl || userInfo.imageURL || noPhotoSrc}
                    alt="Human"
                />

                </div>
                <div className={styles.about}>
                    <div
                        className={styles.level}>{userInfo.login === adminUser.login ? 'Admin' : toUpperCaseHead(userInfo.level)}</div>
                    <div
                        className={styles.name}>{toUpperCaseHead(userInfo.name)} {toUpperCaseHead(userInfo.surname)}</div>
                </div>
            </div>

        </>
    )
}
export default CardHuman;