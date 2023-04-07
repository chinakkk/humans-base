import styles from './RegistrationLogin.module.scss'
import {FC, useState} from "react"
import commonStyles from "../../commonForm.module.scss";
import InputBlocks from "../../Components/InputBlocks/InputBlocks";
import ButtonInForm from "../../Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "../../Components/ButtonOutsideForm/ButtonOutsideForm";

const RegistrationLogin: FC = () => {

    const [loginInputValue,setLoginInputValue]=useState<string>('')
    const [passwordInputValue,setPasswordInputValue]=useState<string>('')
    const [repeatPasswordInputValue,setRepeatPasswordInputValue]=useState<string>('')

    const inputBlockArr = [
        {
            title: 'Enter a new login',
            inputValue: loginInputValue,
            inputOnChange: setLoginInputValue,
        },
        {
            title: 'Enter a new password',
            inputValue: passwordInputValue,
            inputOnChange: setPasswordInputValue,
        },
        {
            title: 'Repeat new password',
            inputValue: repeatPasswordInputValue,
            inputOnChange: setRepeatPasswordInputValue,
        },

    ]
    return (
        <div className={styles.container}>
            <div className={commonStyles.window}>

                <InputBlocks inputBlockArr={inputBlockArr}/>

                {/*Кнопка завершения регистрации*/}
                <ButtonInForm title={'Sign up'} linkTo={'/menu/profile'} activeIf={true}/>

            </div>
            {/*Кнопка назад*/}
            <ButtonOutsideForm title={'Go back'} linkTo={'/registration/about'}/>

        </div>
    )
}
export default RegistrationLogin;