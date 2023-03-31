import styles from './Registration.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";

const Registration: FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Регистрация</h2>
            <div className={styles.text}>
                Тут будет регистрация
            </div>

            <div className={styles.goToButtons}>
                <Link to={'/'}>
                    <div className={styles.button}>Перейти к Главной</div>
                </Link>
                <Link to={'/menu/profile'}>
                    <div className={styles.button}>Перейти в меню</div>
                </Link>
                <Link to={'/auth'}>
                    <div className={styles.button}>Перейти к авторизации</div>
                </Link>

            </div>
        </div>
    )
}
export default Registration;