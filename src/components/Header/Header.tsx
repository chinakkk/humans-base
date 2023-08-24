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
import BurgerMenuButtons from "./BurgerMenuButtons/BurgerMenuButtons";

const Header: FC = () => {
    const titlePagesArr: string[] = ['Profile', 'Programmers', 'Tasks', 'Chat']


    const [openedPage, setOpenedPage] = useState<string>('')





    return (
        <div className={styles.container}>
            {/*кнопки в мобильной версии*/}
            <div className={styles.burgerMenuButtons}>

                <BurgerMenuButtons
                    openedPage={openedPage}
                    titlePagesArr={titlePagesArr}
                    setOpenedPage={setOpenedPage}
                />
            </div>

            {/*кнопки в компьютерной версии*/}
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