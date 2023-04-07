import styles from './ButtonOutsideForm.module.scss'
import {FC} from "react"
import {Link} from "react-router-dom";

type ButtonOutsideForm = {
    title: string;
    linkTo: string;
}

const ButtonOutsideForm: FC<ButtonOutsideForm> = ({title, linkTo}) => {
    return (
        <Link to={linkTo}>
            <button className={styles.buttonUnderWindow}>
                {title}
            </button>
        </Link>
    )
}
export default ButtonOutsideForm;