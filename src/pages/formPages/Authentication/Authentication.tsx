import commonStyles from '../commonForm.module.scss'
import {FC, useEffect, useState} from "react"
import InputBlocks from "../Components/InputBlocks/InputBlocks";
import ButtonOutsideForm from "../Components/ButtonOutsideForm/ButtonOutsideForm";
import ShowPasswordSVG from "../Components/ShowPasswordSVG/ShowPasswordSVG";

import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import LogInButton from "./LogInButton";


const Authentication: FC = () => {
    //useState
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loginInputValue, setLoginInputValue] = useState<string>('')
    const [passwordInputValue, setPasswordInputValue] = useState<string>('')
    const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const loginIsActive: boolean = (
        loginInputValue.length > 0 &&
        passwordInputValue.length > 0 &&
        !buttonIsLoading &&
        !errorMessage
    )
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


    useEffect(() => {
        //очищение сообщения об ошибке, если пользователь отредактировал пароль или логин
        setErrorMessage('')
    }, [loginInputValue, passwordInputValue])


    return (
        <div>
            <div className={commonStyles.window}>

                <form>
                    {<InputBlocks
                        showPassword={showPassword}
                        inputBlockArr={inputBlockArr}
                        buttonIsLoading={buttonIsLoading}
                    />}

                    <ShowPasswordSVG showIf={passwordInputValue.length > 0}
                                     showPassword={showPassword}
                                     setShowPassword={setShowPassword}/>
                    <ErrorMessage errorMessage={errorMessage}/>

                    <LogInButton
                        setButtonIsLoading={setButtonIsLoading}
                        loginInputValue={loginInputValue}
                        passwordInputValue={passwordInputValue}
                        setErrorMessage={setErrorMessage}
                        loginIsActive={loginIsActive}
                        buttonIsLoading={buttonIsLoading}
                    />
                </form>

            </div>

            <ButtonOutsideForm title={'Sigh up'}
                               linkTo={'/registration/about'}/>


        </div>
    )
}
export default Authentication;