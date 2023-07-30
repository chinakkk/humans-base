import {FC} from "react";
import Header from "../../components/Header/Header";
import {Outlet, useLocation} from "react-router-dom";
import styles from './MenuLayout.module.scss'

const MenuLayout: FC = () => {
    const location = useLocation()
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.content + ' ' + styles.chatStyles}>
                <Outlet/>
            </div>
        </div>

    )
}
export default MenuLayout;

