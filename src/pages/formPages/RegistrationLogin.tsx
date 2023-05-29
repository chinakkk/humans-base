import React, {FC, useEffect, useState} from "react"
import commonStyles from "./commonForm.module.scss";
import InputBlocks from "./Components/InputBlocks/InputBlocks";
import ButtonInForm from "./Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "./Components/ButtonOutsideForm/ButtonOutsideForm";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {clearRegistrationData, setRegistrationLogPass} from "../../redux/slices/registrationSlice";
import {setUser, userType} from "../../redux/slices/authUserSlice";
import {useNavigate} from "react-router-dom";
import ShowPasswordSVG from "./Components/ShowPasswordSVG/ShowPasswordSVG";
import ErrorMessage from "./Components/ErrorMessage/ErrorMessage";
import {
    postUserFirestore,
    usernameIsExistsFirestore
} from "../../dataBaseResponse/usersFirestore";

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

    const onClickBack = () => {
        dispatch(setRegistrationLogPass({
            login: loginInputValue,
            password: passwordInputValue,
            repeatPassword: repeatPasswordInputValue
        }))
    }

    const onClickSignUp = async () => {
        setButtonIsLoading(true)

        await dispatch(setRegistrationLogPass({
            login: loginInputValue,
            password: passwordInputValue,
            repeatPassword: repeatPasswordInputValue
        }))
        const userIsExists = await usernameIsExistsFirestore(loginInputValue)

        if (passwordInputValue === repeatPasswordInputValue && !userIsExists) {
            const newCurrentUser = {
                login: loginInputValue || '',
                password: passwordInputValue || '',
                name: registrationUser.name || '',
                surname: registrationUser.surname || '',
                level: registrationUser.level || '',
                birthday: registrationUser.birthday || '',
                uid:'',
                imageURL:''
            }
            const uid = await postUserFirestore(newCurrentUser)
            newCurrentUser.uid=uid||''
            await dispatch(setUser(newCurrentUser))
            await navigate('/menu/profile')
            const currentUser=JSON.parse(localStorage.getItem('user')||'{}')
            localStorage.setItem('user',JSON.stringify({uid,...currentUser}))
            setTimeout(() => dispatch(clearRegistrationData()), 1000)//удаление регистрационных данных после регистрации

        } else {
            const errorMessage = userIsExists ? 'This username already exists.' : 'Passwords don\'t match, please try again.'
            setErrorMessage(errorMessage)
        }
        setButtonIsLoading(false)

    }

    useEffect(() => {
        //очищение сообщения об ошибке, если пользователь отредактировал пароль
        setErrorMessage('')
    }, [repeatPasswordInputValue, passwordInputValue, loginInputValue])

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
            <ButtonOutsideForm title={'Go back'} linkTo={'/registration/about'} onClickProps={onClickBack}/>

        </div>
    )
}
export default RegistrationLogin;