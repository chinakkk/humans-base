import styles from './ButtonOutsideForm.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";

type ButtonOutsideFormType = {
    title: string;
    linkTo: string;
    onClickProps?:() => void
}

const ButtonOutsideForm: FC<ButtonOutsideFormType> = ({title, linkTo,onClickProps}) => {
    return (
        <Link to={linkTo}>
            <button
                onClick={onClickProps}
                className={styles.buttonUnderWindow}>
                {title}
            </button>
        </Link>
    )
}
export default ButtonOutsideForm;