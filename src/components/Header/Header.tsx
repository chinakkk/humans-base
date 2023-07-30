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

    const dispatch = useAppDispatch()
    const [openedPage, setOpenedPage] = useState<string>('')

    const onClickExitButton = () => {
        dispatch(removeUser())
        dispatch(clearRegistrationData())
        dispatch(clearAllSearch())
    }



    return (
        <div className={styles.container}>


            {/*кнопки в бургер меню*/}
            <div className={styles.burgerMenuButtons}>

                <BurgerMenuButtons
                    onClickExitButton={onClickExitButton}
                    openedPage={openedPage}
                    titlePagesArr={titlePagesArr}
                />
            </div>

            {/*кнопки в компьютерной версии*/}
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