import styles from './Search.module.scss'
import React, {FC, useRef, useState} from "react"
import {useLocation} from "react-router-dom";

type SearchProps = {
    searchInput: string;
    setSearchInput: (value:string) => void
}

const Search: FC <SearchProps>= ({searchInput, setSearchInput}) => {
    const location = useLocation()
    const inputRef = useRef<HTMLInputElement>(null)
    const pageIsProfile = location.pathname === '/menu/profile'

    const onClickClearSearch = () => {
        setSearchInput('')
    }
    return (
        <div className={styles.container + ' ' + (pageIsProfile ? styles.hidden : '')}>
            <div className={styles.searchWrapper}>
                <input
                    ref={inputRef}
                    className={styles.search}
                    type="text"
                    placeholder={'Search...'}
                    value={searchInput}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchInput(event.target.value)}

                />
            </div>

            {
                searchInput.length && <svg
                    onClick={onClickClearSearch}
                    fill="#000000" width="16px" height="16px" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg"
                    className={styles.clearButton}>
                  <path
                      d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"/>
                </svg>
            }{/*крестик для удаления текста*/}


        </div>
    )
}
export default Search;