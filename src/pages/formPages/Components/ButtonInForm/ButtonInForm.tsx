import styles from './ButtonInForm.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";


type ContinueButtonProps = {
    title: string;
    linkTo: string;
    activeIf: boolean;
    disable?: boolean;
}


const ButtonInForm: FC<ContinueButtonProps> = ({title, linkTo, activeIf, disable=false}) => {
    return (
        <Link to={linkTo}
              className={!activeIf || disable  ? styles.linkOff : ''}>
            <button
                className={styles.continueButton + ' ' + (activeIf ? styles.continueButtonActive : '')}>
                {title}
            </button>
        </Link>
    )
}
export default ButtonInForm;