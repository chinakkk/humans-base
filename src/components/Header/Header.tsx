import styles from './Header.module.scss'
import {FC, useState} from "react";
import PagesButton from "./PagesButton/PagesButton";
import Search from "./Search/Search";
import ExitButton from "./ExitButton/ExitButton";
import {Link} from "react-router-dom";

const Header: FC = () => {
    const titlePagesArr: string[] = ['Profile', 'Programmers', 'Tasks', 'Chat']
    const [burgerPagesIsOpen, setBurgerPagesIsOpen] = useState<boolean>(false)
    const [openedPage, setOpenedPage] = useState<string>('')


    return (
        <div className={styles.container}>


            <div className={styles.burgerPages}>
                <button
                    className={styles.testButton}
                    onClick={() => setBurgerPagesIsOpen(!burgerPagesIsOpen)}
                >
                </button>

                <div className={styles.openedBurgerPage}>
                    {openedPage}
                </div>
                <div className={styles.burgerMenu + ' ' + (burgerPagesIsOpen ? styles.active : '')}>
                    <div className={styles.burgerButtons}>
                        {titlePagesArr.map((page) => {
                                return (
                                    <div>

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

                    </div>
                </div>

            </div>

            <div className={styles.pagesButton}>
                <PagesButton
                    pagesArr={titlePagesArr}
                    openedPage={openedPage}
                    setOpenedPage={setOpenedPage}
                />
                <ExitButton/>


            </div>
        </div>

    )
}
export default Header;