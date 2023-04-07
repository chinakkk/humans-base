import styles from './Authentication.module.scss'
import commonStyles from '../commonForm.module.scss'
import {FC, useState} from "react"
import InputBlocks from "../Components/InputBlocks/InputBlocks";
import ButtonInForm from "../Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "../Components/ButtonOutsideForm/ButtonOutsideForm";
import ShowPasswordSVG from "./ShowPasswordSVG/ShowPasswordSVG";

const Authentication: FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [passwordInputValue, setPasswordInputValue] = useState<string>('')
    const [loginInputValue, setLoginInputValue] = useState<string>('')
    const logAndPassEntered = (loginInputValue.length > 0 && passwordInputValue.length > 0)

    const inputBlockArr = [
        {
            title: 'Login',
            inputValue: loginInputValue,
            inputOnChange: setLoginInputValue,
        },
        {
            title: 'Password',
            inputValue: passwordInputValue,
            inputOnChange: setPasswordInputValue,
        },

    ]

    return (
        <div className={styles.container}>
            <div className={commonStyles.window}>

                {<InputBlocks showPassword={showPassword} inputBlockArr={inputBlockArr}/>}

                <ShowPasswordSVG showIf={passwordInputValue.length > 0}
                                 showPassword={showPassword}
                                 setShowPassword={setShowPassword}/>

                <ButtonInForm title={'Log in'}
                              linkTo={'/menu/profile'}
                              activeIf={logAndPassEntered}/>
            </div>

            <ButtonOutsideForm title={'Sigh up'}
                               linkTo={'/registration/about'}/>

        </div>
    )
}
export default Authentication;