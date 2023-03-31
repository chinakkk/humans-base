import styles from './Search.module.scss'
import {FC} from "react"

const Search: FC = () => {
    return (
        <div className={styles.container}>
            <input className={styles.search} type="text" placeholder={'Search...'}/>
        </div>
    )
}
export default Search;