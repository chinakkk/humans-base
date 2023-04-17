import styles from './ErrorMessage.module.scss'
import {FC} from "react"

type ErrorMessageProps={
    errorMessage:string;
}

const ErrorMessage: FC <ErrorMessageProps>= ({errorMessage=''}) => {
    return (
        <div className={styles.container}>
            {errorMessage}
        </div>
    )
}
export default ErrorMessage;