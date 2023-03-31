import styles from './Authentication.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";

const Authentication: FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Авторизация</h2>
            <div className={styles.text}>
                Тут будет авторизация
            </div>

            <div className={styles.goToButtons}>
                <Link to={'/'}>
                    <div className={styles.button}>Перейти к Главной</div>
                </Link>
                <Link to={'/menu/profile'}>
                    <div className={styles.button}>Перейти в меню</div>
                </Link>
                <Link to={'/reg'}>
                    <div className={styles.button}>Перейти к регистрации</div>
                </Link>

            </div>
        </div>
    )
}
export default Authentication;