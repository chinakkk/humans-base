import styles from './Authentication.module.scss'
import commonStyles from '../commonForm.module.scss'
import {FC, useState, ChangeEvent, useEffect} from "react"
import {Link} from "react-router-dom";

const Authentication: FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [passwordInputValue, setPasswordInputValue] = useState<string>('')
    const [loginInputValue, setLoginInputValue] = useState<string>('')
    const logAndPassEntered = loginInputValue.length > 0 && passwordInputValue.length > 0

    useEffect(() => {

    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.authWindow}>

                <div className={styles.loginBlock}>
                    <div className={styles.title}>Login</div>
                    <input
                        value={loginInputValue}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setLoginInputValue(event.target.value)}
                        className={styles.authInput}
                    />
                </div>

                <div className={styles.passwordBlock}>
                    <div className={styles.title}>Password</div>
                    <input value={passwordInputValue}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setPasswordInputValue(event.target.value)}
                           type={showPassword ? 'text' : 'password'}
                           className={styles.authInput}
                    />


                    {
                        //svg глаза для показа пароля
                        passwordInputValue.length > 0 && <div title={'Show password'} className={styles.showPasswordSvg}>
                            {
                                showPassword ?
                                    <svg onClick={() => setShowPassword(prevState => !prevState)} width="20px" height="20px"
                                         viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
                                            stroke="#000000" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </svg>
                                    :
                                    <svg onClick={() => setShowPassword(prevState => !prevState)} width="20px" height="20px"
                                         viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                                            stroke="#000000" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                        <path
                                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                            stroke="#000000" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </svg>
                            }
                        </div>
                    }


                </div>


                <Link className={logAndPassEntered? '' : styles.authButtonLink} to={'/menu/profile'}>
                    <button
                        className={styles.authButton + ' ' + (logAndPassEntered? styles.authButtonActive : styles.authButtonDisable)}>
                        Log in
                    </button>

                </Link>

            </div>


            <Link to={'/registration'}>
                <button className={commonStyles.buttonUnderWindow}>
                    Sign up
                </button>
            </Link>

        </div>
    )
}
export default Authentication;