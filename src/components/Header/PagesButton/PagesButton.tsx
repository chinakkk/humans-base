import styles from './ButtonPages.module.scss'
import {FC} from "react";

type ButtonPagesProps = {
    pagesArr: string[]
}

const ButtonPages: FC<ButtonPagesProps> = ({pagesArr}) => {
    return (
        <div className={styles.pages}>
            {
                pagesArr.map((page) =>
                    <div className={styles.page}>
                        {page}
                    </div>
                )
            }
        </div>
    )
}
export default ButtonPages;