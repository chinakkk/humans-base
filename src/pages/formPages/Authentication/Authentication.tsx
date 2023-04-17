import styles from './Authentication.module.scss'
import commonStyles from '../commonForm.module.scss'
import {FC, useEffect, useRef, useState} from "react"
import InputBlocks from "../Components/InputBlocks/InputBlocks";
import ButtonInForm from "../Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "../Components/ButtonOutsideForm/ButtonOutsideForm";
import ShowPasswordSVG from "../Components/ShowPasswordSVG/ShowPasswordSVG";
import axios from "axios";

import {useAppDispatch} from "../../../redux/store";
import {setUser, userType} from "../../../redux/slices/userSlice";
import {Link, useNavigate} from "react-router-dom";
import {getAxiosUsers} from "../../../functions/axiosFunction";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";


const Authentication: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
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

    const onClickLogin = async () => {
        await setButtonIsLoading(true)

        try {
            const data = await getAxiosUsers()
            const currentUser: userType | undefined = (data.filter((user: userType) => {
                return user.login === loginInputValue && user.password === passwordInputValue
            }))[0]

            if (currentUser) {//логин и пароль подошел
                await dispatch(setUser(currentUser))
                await navigate('/menu/profile')
            } else {//не подошел
                // await setPasswordInputValue('')
                await setErrorMessage('Invalid username or password.')

            }

        } catch (error) {
            console.log('Ошибка при авторизации ', error)
        }
        await setButtonIsLoading(false)

    }
    useEffect(() => {
        //очищение сообщения об ошибке, если пользователь отредактировал пароль
        setErrorMessage('')
    }, [loginInputValue, passwordInputValue])


    useEffect(() => {
        const onKeypress = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && loginIsActive) {
                onClickLogin().then((error) => console.log(error))
            }
        }
        document.addEventListener('keypress', onKeypress);

        return () => {
            document.removeEventListener('keypress', onKeypress);
        };
    });


    return (
        <div className={styles.container}>
            <div className={commonStyles.window}>

                {<InputBlocks showPassword={showPassword} inputBlockArr={inputBlockArr}/>}

                <ShowPasswordSVG showIf={passwordInputValue.length > 0}
                                 showPassword={showPassword}
                                 setShowPassword={setShowPassword}/>
                <ErrorMessage errorMessage={errorMessage}/>

                <ButtonInForm title={'Log in'}
                              activeIf={loginIsActive}
                              onClickProps={onClickLogin}
                              buttonIsLoading={buttonIsLoading}
                />
            </div>

            <ButtonOutsideForm title={'Sigh up'}
                               linkTo={'/registration/about'}/>

        </div>
    )
}
export default Authentication;