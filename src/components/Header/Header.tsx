import styles from './Header.module.scss'
import {FC} from "react";
import PagesButton from "./PagesButton/PagesButton";
import Search from "./Search/Search";
import ExitButton from "./ExitButton/ExitButton";

const Header: FC = () => {
    const titlePagesArr: string[] = ['Profile', 'Programmers', 'Tasks', 'Chat']

    return (
        <div className={styles.container}>

            <PagesButton
                pagesArr={titlePagesArr}
            />
            <div className={styles.space}></div>
            <ExitButton/>

        </div>
    )
}
export default Header;