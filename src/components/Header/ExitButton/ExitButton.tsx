import styles from './ExitButton.module.scss'
import {FC} from "react"
import {removeUser} from "../../../redux/slices/authUserSlice";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../redux/store";
import {clearRegistrationData} from "../../../redux/slices/registrationSlice";

const ExitButton: FC = () => {
    const dispatch = useAppDispatch()
    const onClickExitButton = () => {
        dispatch(removeUser())
        dispatch(clearRegistrationData())
    }
    return (
        <div className={styles.container}>
            <Link to={'/authentication'}>
                <div onClick={onClickExitButton} title={'Logout'} className={styles.exitButton}>
                    <svg width="15" height="15" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 6.45454V1.75C16 1.33579 15.6642 1 15.25 1H1.75C1.33579 1 1 1.33579 1 1.75V24.25C1 24.6642 1.33579 25 1.75 25H15.25C15.6642 25 16 24.6642 16 24.25V19.5454"
                            stroke="#FFF6F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 13H26M26 13L21.6369 8M26 13L21.6364 18" stroke="#FFF6F6" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </Link>
        </div>
    )
}
export default ExitButton;