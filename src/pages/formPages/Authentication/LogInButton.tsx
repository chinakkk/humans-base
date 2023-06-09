import styles from './LogInButton.module.scss'
import {FC} from "react"
import ButtonInForm from "../Components/ButtonInForm/ButtonInForm";
import {setUser, userType} from "../../../redux/slices/authUserSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUsersFirestore} from "../../../dataBaseResponse/usersFirestore";
import {useAppDispatch} from "../../../redux/store";

type LogInButtonProps = {
    setButtonIsLoading: (value: boolean) => void;
    setErrorMessage: (value: string) => void;
    loginInputValue: string;
    passwordInputValue: string;
    loginIsActive: boolean;
    buttonIsLoading: boolean
}

const LogInButton: FC<LogInButtonProps> = ({
                                               setButtonIsLoading,
                                               loginInputValue,
                                               passwordInputValue,
                                               setErrorMessage,
                                               loginIsActive,
                                               buttonIsLoading
                                           }) => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()


    const onClickLogin = async () => {
        await setButtonIsLoading(true)

        try {
            const data = await getUsersFirestore()
            const currentUser: userType | undefined = data ?
                (data.filter((user: userType) => {
                    return user.login === loginInputValue && user.password === passwordInputValue
                }))[0] : null

            if (currentUser) {//логин и пароль подошли
                await dispatch(setUser(currentUser))
                await navigate('/menu/profile')
            } else {//не подошел
                await setErrorMessage('Invalid username or password.')
            }

        } catch (error) {
            console.log('Ошибка при авторизации ', error)
        }
        await setButtonIsLoading(false)

    }

    return (
        <ButtonInForm title={'Log in'}
                      activeIf={loginIsActive}
                      onClickProps={onClickLogin}
                      buttonIsLoading={buttonIsLoading}
        />
    )
}
export default LogInButton;