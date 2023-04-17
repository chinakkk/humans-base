import styles from './ButtonInForm.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";
import loading from '../../../../assets/gif/loading.gif'


type ContinueButtonProps = {
    title: string;
    linkTo?: string;
    activeIf: boolean;
    disable?: boolean;
    onClickProps?: () => void;
    buttonIsLoading?: boolean;
}


const ButtonInForm: FC<ContinueButtonProps> = ({
                                                   title,
                                                   linkTo = '',
                                                   activeIf,
                                                   disable = false,
                                                   onClickProps = () => {
                                                   },
                                                   buttonIsLoading = false
                                               }) => {
    return (
        <Link to={linkTo}
              className={!activeIf || disable ? styles.linkOff : ''}>
            <button
                className={styles.continueButton + ' ' + (activeIf ? styles.continueButtonActive : '')}
                onClick={onClickProps}
            >
                {buttonIsLoading?
                    <img className={styles.loadingGif} src={loading} alt="loading"/> : title
                }

            </button>
        </Link>
    )
}
export default ButtonInForm;