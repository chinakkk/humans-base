import styles from './BurgerMenuButtons.module.scss'
import React, {FC, useState} from "react"
import BurgerContextMenu from "./BurgerContextMenu/BurgerContextMenu";

type BurgerMenuButtonsProps = {
    openedPage: string;
    titlePagesArr: string[];
    setOpenedPage:(value:string) => void;
}

const BurgerMenuButtons: FC<BurgerMenuButtonsProps> = ({
                                                           openedPage,
                                                           titlePagesArr,
                                                           setOpenedPage
                                                       }) => {

    const [burgerPagesIsOpen, setBurgerPagesIsOpen] = useState<boolean>(false)

    return (
            <div className={styles.burgerPages}>


                {/*открытая вкладка в хедере*/}
                <div className={styles.openedBurgerPage}>
                    {openedPage}
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#FFFFFF"/>
                    </svg>


                    {/*Кнопка бургер меню*/}
                    <button
                        className={styles.burgerMenuButton + ' ' + (burgerPagesIsOpen ? styles.burgerMenuButtonActive : '')}
                        onClick={() => setBurgerPagesIsOpen(true)}
                    >
                        {openedPage}
                    </button>
                </div>

                {
                    burgerPagesIsOpen &&
                    <BurgerContextMenu
                        titlePagesArr={titlePagesArr}
                        setBurgerPagesIsOpen={setBurgerPagesIsOpen}
                        setOpenedPage={setOpenedPage}
                    />
                }

            </div>
    )
}
export default BurgerMenuButtons;