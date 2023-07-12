import styles from './Header.module.scss'
import {FC, useState} from "react";
import PagesButton from "./PagesButton/PagesButton";
import Search from "./Search/Search";
import ExitButton from "./ExitButton/ExitButton";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {removeUser} from "../../redux/slices/authUserSlice";
import {clearRegistrationData} from "../../redux/slices/registrationSlice";
import {clearAllSearch} from "../../redux/slices/searchSlice";

const Header: FC = () => {
    const dispatch = useAppDispatch()

    const titlePagesArr: string[] = ['Profile', 'Programmers', 'Tasks', 'Chat']
    const [burgerPagesIsOpen, setBurgerPagesIsOpen] = useState<boolean>(false)
    const [openedPage, setOpenedPage] = useState<string>('')


    const onClickExitButton = () => {
        dispatch(removeUser())
        dispatch(clearRegistrationData())
        dispatch(clearAllSearch())
    }

    return (
        <div className={styles.container}>


            <div className={styles.burgerPages}>
                <button
                    className={styles.burgerMenuButton + ' ' + (burgerPagesIsOpen ? styles.burgerMenuButtonActive : '')}
                    onClick={() => setBurgerPagesIsOpen(!burgerPagesIsOpen)}
                >
                    <div className={styles.topLine}></div>
                    <div className={styles.middleLine}></div>
                    <div className={styles.middleLineTest}></div>
                    <div className={styles.bottomLine}></div>
                </button>

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

            <div className={styles.pagesButton}>
                <PagesButton
                    pagesArr={titlePagesArr}
                    openedPage={openedPage}
                    setOpenedPage={setOpenedPage}
                />
                <ExitButton onClickExitButton={onClickExitButton}/>


            </div>
        </div>

    )
}
export default Header;