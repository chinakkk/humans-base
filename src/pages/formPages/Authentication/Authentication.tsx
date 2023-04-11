import styles from './Authentication.module.scss'
import commonStyles from '../commonForm.module.scss'
import {FC, useEffect, useRef, useState} from "react"
import InputBlocks from "../Components/InputBlocks/InputBlocks";
import ButtonInForm from "../Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "../Components/ButtonOutsideForm/ButtonOutsideForm";
import ShowPasswordSVG from "./ShowPasswordSVG/ShowPasswordSVG";
import axios from "axios";

import {useAppDispatch} from "../../../redux/store";
import {setUser, userType} from "../../../redux/slices/userSlice";
import {Link, useNavigate} from "react-router-dom";


const Authentication: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    //useState
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loginInputValue, setLoginInputValue] = useState<string>('')
    const [passwordInputValue, setPasswordInputValue] = useState<string>('')

    const inputIsFilled: boolean = (loginInputValue.length > 0 && passwordInputValue.length > 0)
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

    const onClickAuthentication = async () => {
        try {
            const {data} = await axios.get('https://64303a35b289b1dec4c4281e.mockapi.io/users')
            const currentUser:userType| undefined= (data.filter((user: userType) => {
                return user.login === loginInputValue && user.password === passwordInputValue
            }))[0]

            if (currentUser) {
                navigate('/menu/profile')
                dispatch(setUser(currentUser))

                console.log('Логин и пароль верны')
            } else {
                setPasswordInputValue('')

                console.log('Логин или пароль не верны')
            }

        } catch (error) {
            console.log('Ошибка при авторизации ', error)
        }

    }

    //комменты для артема
    //побочный чел
    //login chin
    //password chin

    //главный чел
    //login gaf
    //password gaf

    useEffect(() => {
        const onKeypress = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && inputIsFilled) {
                onClickAuthentication().then()
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

                <ButtonInForm title={'Log in'}
                              activeIf={inputIsFilled}
                              onClickProps={onClickAuthentication}
                />
            </div>

            <ButtonOutsideForm title={'Sigh up'}
                               linkTo={'/registration/about'}/>

        </div>
    )
}
export default Authentication;