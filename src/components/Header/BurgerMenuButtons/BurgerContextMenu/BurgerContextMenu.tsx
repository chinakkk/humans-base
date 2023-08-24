import styles from './BurgerContextMenu.module.scss'
import {FC, useEffect, useState} from "react"
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../../redux/store";
import {removeUser} from "../../../../redux/slices/authUserSlice";
import {clearRegistrationData} from "../../../../redux/slices/registrationSlice";
import {clearAllSearch} from "../../../../redux/slices/searchSlice";

type BurgerContextMenuProps = {
    titlePagesArr: string[];
    setBurgerPagesIsOpen: (value: boolean) => void;
    setOpenedPage: (value: string) => void;


}

const BurgerContextMenu: FC<BurgerContextMenuProps> = ({
                                                           titlePagesArr,
                                                           setBurgerPagesIsOpen,
                                                           setOpenedPage
                                                       }) => {
    const [runAnimation, setRunAnimation] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const onClickExitButton = () => {
        dispatch(removeUser())
        dispatch(clearRegistrationData())
        dispatch(clearAllSearch())
    }
    useEffect(() => {
        setRunAnimation(true)
    }, [])

    const onClickLinkButton = (page: string) => {
        setOpenedPage(page)
        setBurgerPagesIsOpen(false)
    }

    return (
        <div>
            <div className={styles.overlay}
                 onClick={() => setBurgerPagesIsOpen(false)}
            />
            <div className={styles.container + ' ' + (runAnimation ? styles.showContainer : '')}>
                {
                    titlePagesArr.map((page) => {
                        return (
                            <Link
                                key={page}
                                className={styles.linkButton}
                                to={`/menu/${page.toLowerCase()}`}
                                onClick={() => onClickLinkButton(page)}
                            >
                                {page}
                            </Link>
                        )
                    })
                }
                <Link
                    key={'Exit'}
                    className={styles.linkButton}
                    to={'/authentication'}
                    onClick={onClickExitButton}
                >
                    Exit
                </Link>


            </div>

        </div>
    )
}
export default BurgerContextMenu;