import {FC} from "react";
import Header from "../../components/Header/Header";
import {Outlet} from "react-router-dom";
import styles from './MainLayout.module.scss'

const MainLayout: FC = () => {
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}
export default MainLayout;