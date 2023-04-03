import styles from './RegistrationLogin.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";
import commonStyles from "../../commonForm.module.scss";
import InputBlocks from "../InputBlocks/InputBlocks";

const RegistrationLogin: FC = () => {

    const inputBlockTitles=['Enter a new login', 'Enter a new password', 'Repeat new password']

    return (
        <div className={styles.container}>
            <div className={commonStyles.window}>

                <InputBlocks inputBlockTitles={inputBlockTitles}/>

                {/*Кнопка завершения регистрации*/}
                <Link style={{pointerEvents: 'none'}} to={'/menu/profile'}>
                    <button
                        className={commonStyles.continueButton}>
                        Sign up
                    </button>
                </Link>

            </div>

            {/*Кнопка назад*/}
            <Link to={'/registration/about'}>
                <button className={commonStyles.buttonUnderWindow}>
                    Go back
                </button>
            </Link>

        </div>
    )
}
export default RegistrationLogin;