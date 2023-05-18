import styles from './Header.module.scss'
import {FC, useState} from "react";
import PagesButton from "./PagesButton/PagesButton";
import Search from "./Search/Search";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {removeUser} from "../../redux/slices/authUserSlice";
import ExitButton from "./ExitButton/ExitButton";

const Header: FC = () => {
    const titlePagesArr: string[] = ['Profile', 'Programmers', 'Tasks', 'Chat']
    const [searchInput, setSearchInput] = useState<string>('')

    const dispatch=useAppDispatch()
    return (
        <div className={styles.container}>

            <PagesButton
                pagesArr={titlePagesArr}
                clearInput={() => {setSearchInput('')}}
            />
            <Search searchInput={searchInput} setSearchInput={setSearchInput}/>

            <ExitButton/>


        </div>
    )
}
export default Header;