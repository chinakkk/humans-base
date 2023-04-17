import styles from './PagesButton.module.scss'
import {FC, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

type ButtonPagesProps = {
    pagesArr: string[];
    clearInput: () => void;
}

const PagesButton: FC<ButtonPagesProps> = ({pagesArr, clearInput}) => {
    const location = useLocation()
    const [openedPage, setOpenedPage] = useState<string>()

    const onClickPage = (page: string) => {
        setOpenedPage(page)
        clearInput()
    }

    useEffect(() => {//нужно позже реализовать сохранение открытой вкладки через local storage
        const locationPathArr = location.pathname.split('/')//берем последний путь после '/'
        const pageName = locationPathArr[locationPathArr.length - 1]
        const pageNameCapitalLetter = pageName[0].toUpperCase() + pageName.slice(1)//добавление заглавной буквы
        setOpenedPage(pageNameCapitalLetter)//ставим текущую страницу исходя из пути
    }, [location])


    return (
        <div className={styles.pages}>
            {
                pagesArr.map((page: string) =>
                    <Link className={styles.page + ' ' + (openedPage === page ? styles.opened : '')}
                          to={`/menu/${page.toLowerCase()}`}
                          key={page}
                          onClick={() => {
                              onClickPage(page)
                          }}
                    >
                        {page}
                    </Link>
                )
            }
        </div>
    )
}
export default PagesButton;