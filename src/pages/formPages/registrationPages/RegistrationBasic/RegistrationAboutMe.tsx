import styles from './RegistrationAboutMe.module.scss'
import commonStyles from '../../commonForm.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";
import ToggleButton from "./ToggleButton/ToggleButton";
import InputBlocks from "../InputBlocks/InputBlocks";

const RegistrationAboutMe: FC = () => {
    const inputBlockTitles = ['Name', 'Surname', 'Group number', 'Birth Day']


    return (
        <div className={styles.container}>
            <div className={styles.window +' '+commonStyles.window}>
                <InputBlocks inputBlockTitles={inputBlockTitles}/>
                <ToggleButton/>

                {/*Кнопка завершения регистрации*/}
                <Link to={'/registration/login'}>
                    <button className={commonStyles.continueButton}>
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
export default RegistrationAboutMe;