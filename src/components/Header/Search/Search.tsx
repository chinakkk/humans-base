import styles from './Search.module.scss'
import React, {FC, useEffect, useRef, useState} from "react"
import {useLocation} from "react-router-dom";
import { useSelector} from "react-redux";
import {setChatSearch, setProgrammersSearch, setTasksSearch} from "../../../redux/slices/searchSlice";
import {RootState, useAppDispatch} from "../../../redux/store";
import programmers from "../../../pages/menuPages/Programmers/Programmers";

type SearchProps = {}

const Search: FC<SearchProps> = () => {
    const [currentPath,setCurrentPath]=useState<'programmers'|'tasks'|'chat'>('tasks')
    const dispatch = useAppDispatch()
    const {search} = useSelector((state: RootState) => state.searchSlice)
    const location = useLocation()
    const inputRef = useRef<HTMLInputElement>(null)
    const pageIsProfile = location.pathname === '/menu/profile'

    useEffect(() => {
        if(location.pathname==='/menu/programmers')setCurrentPath('programmers')
        else if(location.pathname==='/menu/tasks')setCurrentPath('tasks')
        else if(location.pathname==='/menu/chat')setCurrentPath('chat')

    }, [location])


    const onClickClearSearch = () => {
        if (currentPath==='programmers')dispatch(setProgrammersSearch(''))
        else if (currentPath==='tasks')dispatch(setTasksSearch(''))
        else if (currentPath==='chat')dispatch(setChatSearch(''))
    }
    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (currentPath==='programmers')dispatch(setProgrammersSearch(event.target.value))
        else if (currentPath==='tasks')dispatch(setTasksSearch(event.target.value))
        else if (currentPath==='chat')dispatch(setChatSearch(event.target.value))
      }
    return (
        <div className={styles.container + ' ' + (pageIsProfile ? styles.hidden : '')}>
            <div className={styles.searchWrapper}>
                <input
                    ref={inputRef}
                    className={styles.search}
                    type="text"
                    placeholder={'Search...'}
                    value={search[currentPath]}
                    onChange={(event) => onChangeSearch(event)}

                />
            </div>

            {
                !!search[currentPath].length && <svg
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