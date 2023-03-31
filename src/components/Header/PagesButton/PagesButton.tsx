import styles from './PagesButton.module.scss'
import {FC, useState} from "react";
import {Link} from "react-router-dom";

type ButtonPagesProps = {
    pagesArr: string[]
}

const PagesButton: FC<ButtonPagesProps> = ({pagesArr}) => {
    const [pageIsOpen, setPageIsOpen] = useState<string>('Profile')


    return (
        <div className={styles.pages}>
            {
                pagesArr.map((page: string) =>
                    <Link to={`/menu/${page.toLowerCase()}`}
                          key={page}
                    >
                        <div
                            onClick={() => setPageIsOpen(page)}
                            className={styles.page + ' ' + (pageIsOpen === page ? styles.opened : '')}
                        >
                            {page}
                        </div>
                    </Link>
                )
            }
        </div>
    )
}
export default PagesButton;