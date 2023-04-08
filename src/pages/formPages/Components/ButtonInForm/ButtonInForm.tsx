import styles from './ButtonInForm.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";


type ContinueButtonProps = {
    title: string;
    linkTo?: string;
    activeIf: boolean;
    disable?: boolean;
    onClickProps?: () => void;
}


const ButtonInForm: FC<ContinueButtonProps> = ({
                                                   title,
                                                   linkTo = '',
                                                   activeIf,
                                                   disable = false,
                                                   onClickProps = () => {
                                                   },
                                               }) => {
    return (
        <Link to={linkTo}
              className={!activeIf || disable ? styles.linkOff : ''}>
            <button
                className={styles.continueButton + ' ' + (activeIf ? styles.continueButtonActive : '')}
                onClick={onClickProps}
            >
                {title}
            </button>
        </Link>
    )
}
export default ButtonInForm;