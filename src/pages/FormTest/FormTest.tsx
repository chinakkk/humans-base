import styles from './FormTest.module.scss'
import React, {FC, useEffect, useState} from "react"
import commonStyles from "../formPages/commonForm.module.scss";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../redux/store";
import {useNavigate} from "react-router-dom";
import {getUsersFirestore} from "../../dataBaseResponse/usersFirestore";
import {setUser, userType} from "../../redux/slices/authUserSlice";
import ErrorMessage from "../formPages/Components/ErrorMessage/ErrorMessage";

type testFormProps = {}

const FormTest: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [inputLogin, setInputLogin] = useState<string>('')
    const [inputPassword, setInputPassword] = useState<string>('')


    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm()

    const onClickSubmit = async (data: any) => {
        try {
            await setButtonIsLoading(true)
            setErrorMessage('')
            const users = await getUsersFirestore()
            const currentUser: userType | undefined = users ?
                (users.filter((user: userType) => {
                    return user.login === data.login && user.password === data.password
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
    useEffect(() => {

    }, [])





    return (
        <div className={styles.container}>
            <div className={commonStyles.window}>
                <form onSubmit={handleSubmit(onClickSubmit)}>
                    <div className={styles.inputs}>
                        <label className={styles.titleFromBlocks}>
                            Login
                            <input

                                className={`${styles.regInput}`}
                                autoFocus={true}
                                autoComplete={'off'}
                                maxLength={15}
                                {...register('login')}

                            />
                        </label>
                        <label className={styles.titleFromBlocks}>
                            Password
                            <input
                                className={`${styles.regInput}`}
                                autoComplete={'off'}
                                maxLength={15}

                                {...register('password')}
                            />
                        </label>
                    </div>
                    <ErrorMessage errorMessage={errorMessage}/>
                    <button
                        className={styles.continueButton}
                    >
                        click
                    </button>

                </form>

            </div>
        </div>
    )
}
export default FormTest;