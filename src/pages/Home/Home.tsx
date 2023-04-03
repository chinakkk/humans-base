import styles from './Home.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";

const Home: FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Главная страница</h2>
            <div className={styles.text}>
                Это будет приветствующая страница, на которой будет объясняться что за проект
                и на чем он был написан
            </div>

            <div className={styles.goToButtons}>

                <Link to={'/authentication'}>
                    <div className={styles.button}>Перейти к авторизации</div>
                </Link>
                <Link to={'/menu/profile'}>
                    <div className={styles.button}>Перейти в меню</div>
                </Link>
                <Link to={'/registration/about'}>
                    <div className={styles.button}>Перейти к регистрации</div>
                </Link>
            </div>

        </div>
    )
}
export default Home;