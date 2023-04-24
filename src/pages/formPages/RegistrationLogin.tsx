import React, {FC, useEffect, useState} from "react"
import commonStyles from "./commonForm.module.scss";
import InputBlocks from "./Components/InputBlocks/InputBlocks";
import ButtonInForm from "./Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "./Components/ButtonOutsideForm/ButtonOutsideForm";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {clearRegistrationData, setRegistrationLogPass} from "../../redux/slices/registrationSlice";
import {setUser} from "../../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";
import ShowPasswordSVG from "./Components/ShowPasswordSVG/ShowPasswordSVG";
import ErrorMessage from "./Components/ErrorMessage/ErrorMessage";
import {userIsExistsAxios} from "../../functions/usersAxios";

const RegistrationLogin: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {registrationUser} = useSelector((state: RootState) => state.registrationSlice)

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loginInputValue, setLoginInputValue] = useState<string>(registrationUser.login || '')
    const [passwordInputValue, setPasswordInputValue] = useState<string>(registrationUser.password || '')
    const [repeatPasswordInputValue, setRepeatPasswordInputValue] = useState<string>(registrationUser.repeatPassword || '')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false)

    const signupIsActive: boolean = (
        loginInputValue.length > 0 &&
        passwordInputValue.length > 0 &&
        repeatPasswordInputValue.length > 0 &&
        !buttonIsLoading &&
        !errorMessage

    )

    useEffect(() => {
        //очищение сообщения об ошибке, если пользователь отредактировал пароль
        setErrorMessage('')
    }, [repeatPasswordInputValue, passwordInputValue, loginInputValue])

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
    const saveRegistrationData = () => {
        dispatch(setRegistrationLogPass({
            login: loginInputValue,
            password: passwordInputValue,
            repeatPassword: repeatPasswordInputValue
        }))
    }

    const onClickSignUp = async () => {
        setButtonIsLoading(true)
        const userIsExists = await userIsExistsAxios(loginInputValue)

        if (passwordInputValue === repeatPasswordInputValue && !userIsExists) {
            const newCurrentUser = {
                login: loginInputValue,
                password: passwordInputValue,
                name: registrationUser.name || '',
                surname: registrationUser.surname || '',
                level: registrationUser.level || '',
                birthday: registrationUser.birthday || '',
            }
            await axios.post(`https://64303a35b289b1dec4c4281e.mockapi.io/users`, newCurrentUser)
            await dispatch(setUser(newCurrentUser))
            await navigate('/menu/profile')
            await setTimeout(() => dispatch(clearRegistrationData()), 3000)//удаление регистрационных данных после регистрации
        } else {
            // clearTimeout() сделать обнуление таймаута при повторном нажатии
            const errorMessage = userIsExists ? 'This username already exists.' : 'Passwords don\'t match, please try again.'
            setErrorMessage(errorMessage)
        }
        setButtonIsLoading(false)

    }

    return (
        <div>
            <div className={commonStyles.window}>

                <form>
                    <InputBlocks inputBlockArr={inputBlockArr} showPassword={showPassword}/>

                    <ShowPasswordSVG showIf={passwordInputValue.length > 0} showPassword={showPassword}
                                     setShowPassword={setShowPassword}/>

                    <ErrorMessage errorMessage={errorMessage}/>

                    {/*Кнопка завершения регистрации*/}
                    <ButtonInForm title={'Sign up'}
                                  activeIf={signupIsActive}
                                  onClickProps={onClickSignUp}
                                  buttonIsLoading={buttonIsLoading}
                    />
                </form>

            </div>
            {/*Кнопка назад*/}
            <ButtonOutsideForm title={'Go back'} linkTo={'/registration/about'} onClickProps={saveRegistrationData}/>

        </div>
    )
}
export default RegistrationLogin;