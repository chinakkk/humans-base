import styles from './RegistrationLogin.module.scss'
import {FC, useState} from "react"
import commonStyles from "../../commonForm.module.scss";
import InputBlocks from "../../Components/InputBlocks/InputBlocks";
import ButtonInForm from "../../Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "../../Components/ButtonOutsideForm/ButtonOutsideForm";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../../redux/store";
import {setRegistrationLogPass} from "../../../../redux/slices/registrationSlice";
import {setUser} from "../../../../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";

const RegistrationLogin: FC = () => {
    const dispatch=useAppDispatch()
    const navigate=useNavigate()
    const [loginInputValue, setLoginInputValue] = useState<string>('')
    const [passwordInputValue, setPasswordInputValue] = useState<string>('')
    const [repeatPasswordInputValue, setRepeatPasswordInputValue] = useState<string>('')
    const {registrationUser} = useSelector((state: RootState) => state.registrationSlice)

    const inputIsFilled: boolean = (
        loginInputValue.length > 0 &&
        passwordInputValue.length > 0 &&
        repeatPasswordInputValue.length > 0
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

    const onClickSignUp = async () => {
        dispatch(setRegistrationLogPass({
            login: loginInputValue,
            password: passwordInputValue,
        }))
        const newUser={
            login: loginInputValue,
            password: passwordInputValue,
            name: registrationUser.name||'',
            surname: registrationUser.surname||'',
            role: registrationUser.role||'',
            group: registrationUser.group||'',
            birthday: registrationUser.birthday||'',
        }

        const {data} = await axios.post(`https://64303a35b289b1dec4c4281e.mockapi.io/users`, newUser)
        // await dispatch(clearRegistrationData())
        await dispatch(setUser(newUser))
        await navigate('/menu/profile')

    }
    return (
        <div className={styles.container}>
            <div className={commonStyles.window}>

                <InputBlocks inputBlockArr={inputBlockArr}/>

                {/*Кнопка завершения регистрации*/}
                <ButtonInForm title={'Sign up'} activeIf={inputIsFilled} onClickProps={onClickSignUp}/>

            </div>
            {/*Кнопка назад*/}
            <ButtonOutsideForm title={'Go back'} linkTo={'/registration/about'}/>

        </div>
    )
}
export default RegistrationLogin;