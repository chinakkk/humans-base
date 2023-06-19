import styles from './ButtonInForm.module.scss'
import React, {FC} from "react"
import {Link} from "react-router-dom";
import loading from '../../../../assets/gif/loading.gif'


type ContinueButtonProps = {
    title: string;
    activeIf: boolean;
    onClickProps?: () => void;
    buttonIsLoading?: boolean;
}


const ButtonInForm: FC<ContinueButtonProps> = ({
                                                   title,
                                                   activeIf,
                                                   onClickProps = () => {
                                                   },
                                                   buttonIsLoading = false
                                               }) => {
    const onClickPreventDefault = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        onClickProps()
    }
    return (
        <>
            <button
                disabled={!activeIf}
                className={styles.continueButton + ' ' + (activeIf ? styles.continueButtonActive : '')}
                onClick={(event) => onClickPreventDefault(event)}
            >
                {buttonIsLoading ?
                    <img className={styles.loadingGif} src={loading} alt="loading"/> : title
                }

            </button>

        </>


    )
}
export default ButtonInForm;