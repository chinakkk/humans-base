import styles from './CardHuman.module.scss'
import borderStyles from './BorderCardHuman.module.scss'
import React, {FC, useState} from "react"
import {toUpperHeadFunc} from "../../utils/toUpperHeadFunc";
import OpenedCardHuman from "../OpededCardHuman/OpenedCardHuman";
import {userType} from "../../redux/slices/authUserSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import noPhotoSrc from '../../assets/noPhoto.png'

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
    const {adminUser} = useSelector((state: RootState) => state.userSlice)
    const onClickCard = async () => {
        setCardIsOpen(true)
    }
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
                onClick={onClickCard}
                className={`${styles.container} ${borderStyles.border}`}>
                <img
                    className={styles.photo + ' ' + (!userInfo.imageURL && styles.noPhoto)}
                    src={userInfo.imageURL || noPhotoSrc}
                    alt="Human"/>
                <div className={styles.about}>
                    <div
                        className={styles.level}>{userInfo.login === adminUser.login ? 'Admin' : toUpperHeadFunc(userInfo.level)}</div>
                    <div
                        className={styles.name}>{toUpperHeadFunc(userInfo.name)} {toUpperHeadFunc(userInfo.surname)}</div>
                </div>
            </div>

        </div>
    )
}
export default CardHuman;