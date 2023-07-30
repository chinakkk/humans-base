import styles from './BurgerMenuButtons.module.scss'
import {FC, useState} from "react"
import {Link} from "react-router-dom";
import {removeUser} from "../../../redux/slices/authUserSlice";
import {clearRegistrationData} from "../../../redux/slices/registrationSlice";
import {clearAllSearch} from "../../../redux/slices/searchSlice";
import {useAppDispatch} from "../../../redux/store";

type BurgerMenuButtonsProps = {
    openedPage: string;
    titlePagesArr: string[];
    onClickExitButton: () => void;
}

const BurgerMenuButtons: FC<BurgerMenuButtonsProps> = ({
                                                           openedPage,
                                                           titlePagesArr, onClickExitButton
                                                       }) => {
    const [burgerPagesIsOpen, setBurgerPagesIsOpen] = useState<boolean>(false)



    return (
        <div className={styles.container}>
            <div className={styles.burgerPages}>
                {/*Кнопка бургер меню*/}
                <button
                    className={styles.burgerMenuButton + ' ' + (burgerPagesIsOpen ? styles.burgerMenuButtonActive : '')}
                    onClick={() => setBurgerPagesIsOpen(!burgerPagesIsOpen)}
                >
                    <div className={styles.topLine}></div>
                    <div className={styles.middleLine}></div>
                    <div className={styles.bottomLine}></div>
                </button>

                {/*открытая вкладка в хедере*/}
                <div className={styles.openedBurgerPage}>
                    {openedPage}
                </div>

                <div className={styles.burgerMenu + ' ' + (burgerPagesIsOpen ? styles.active : '')}>
                    <div className={styles.burgerButtons}>
                        {titlePagesArr.map((page) => {
                                return (
                                    <div key={page}>

                                        <Link
                                            className={styles.burgerButton}
                                            to={`/menu/${page.toLowerCase()}`}
                                            key={page}
                                            onClick={() => {
                                                setBurgerPagesIsOpen(false)
                                            }}
                                        >
                                            {page}
                                        </Link>

                                        <span className={styles.line}></span>
                                    </div>)
                            }
                        )}
                        <Link
                            className={styles.burgerButton}
                            to={`/menu/authentication`}
                            onClick={onClickExitButton}
                        >
                            Exit
                        </Link>

                        <span className={styles.line}></span>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default BurgerMenuButtons;