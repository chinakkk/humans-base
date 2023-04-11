import styles from './Header.module.scss'
import {FC} from "react";
import PagesButton from "./PagesButton/PagesButton";
import Search from "./Search/Search";
import {Link} from "react-router-dom";
import {RootState, useAppDispatch} from "../../redux/store";
import {removeUser, setUser} from "../../redux/slices/userSlice";
import {useSelector} from "react-redux";

const Header: FC = () => {
    const titlePagesArr: string[] = ['Profile', 'Programmers', 'Tasks', 'Chat']
    const dispatch=useAppDispatch()
    const {user}=useSelector((state:RootState) => state.userSlice)
    const renderTitlePagesArr=user?.role==='student'?titlePagesArr.slice(0,2):titlePagesArr

    return (
        <div className={styles.container}>

            <PagesButton
                pagesArr={renderTitlePagesArr}
            />
            <Search/>

            <Link to={'/authentication'}>
                <div onClick={() => dispatch(removeUser())} title={'Logout'} className={styles.exitButton}>
                    <svg width="15" height="15" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 6.45454V1.75C16 1.33579 15.6642 1 15.25 1H1.75C1.33579 1 1 1.33579 1 1.75V24.25C1 24.6642 1.33579 25 1.75 25H15.25C15.6642 25 16 24.6642 16 24.25V19.5454"
                            stroke="#FFF6F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 13H26M26 13L21.6369 8M26 13L21.6364 18" stroke="#FFF6F6" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </Link>


        </div>
    )
}
export default Header;