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


    const [chet, setChet] = useState<number>(0)
    const [nechet, setNechet] = useState<number>(0)
    const [count, setCount] = useState<string>('')

    const [firstFinger,setFirstFinger]=useState<string>('')
    const [secondFinger,setSecondFinger]=useState<string>('')

    const onClickTestButton = () => {
        let chetn = 0
        let nechetn = 0
        for (let i = 0; i < Number(count); i++) {
            const firstMan: number = Math.floor(Math.random() * Number( firstFinger))
            const secondMan: number = Math.floor(Math.random() * Number(secondFinger))
            if ((firstMan + secondMan) % 2) nechetn = nechetn + 1
            else chetn = chetn + 1
        }
        setChet(chetn)
        setNechet(nechetn)
    }













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


        </div>
    )
}
export default FormTest;