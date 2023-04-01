import styles from './RegistrationBasic.module.scss'
import commonStyles from '../../commonForm.module.scss'
import { FC} from "react"
import {Link} from "react-router-dom";

const RegistrationBasic: FC = () => {


    return (
        <div className={styles.container}>
            <div className={styles.regWindow}>

                <div className={styles.block}>
                    <div className={styles.titleFromBlocks}>Name</div>
                    <input className={styles.regInput}/>
                </div>

                <div className={styles.block}>
                    <div className={styles.titleFromBlocks}>Surname</div>
                    <input className={styles.regInput}/>
                </div>
                <div className={styles.block}>
                    <div className={styles.titleFromBlocks}>Group number</div>
                    <input className={styles.regInput}/>
                </div>
                <div className={styles.birthdayBlock}>
                    <div className={styles.titleFromBlocks}>Birth Day</div>
                    <input className={styles.regInput}/>
                </div>
                <div className={styles.toggleBlock}>
                    <div className={styles.toggleRoleButton}>Student</div>
                    <div className={styles.toggleRoleButton}>Professor</div>
                </div>

                {/*Кнопка завершения регистрации*/}
                <Link style={{pointerEvents: 'none'}} to={'/menu/profile'}>
                    <button
                        className={styles.continueButton}>
                        Continue
                    </button>
                </Link>

            </div>

            {/*Кнопка назад*/}
            <Link to={'/authentication'}>
                <button className={commonStyles.buttonUnderWindow}>
                    Go back
                </button>
            </Link>

        </div>
    )
}
export default RegistrationBasic;