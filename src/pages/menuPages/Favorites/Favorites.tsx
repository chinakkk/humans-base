import styles from './Favorites.module.scss'
import pagesStyle from '../pagesWithCard.module.scss'

import {FC} from "react"
import CardHuman from "../../../components/CardHuman/CardHuman";

const Favorites: FC = () => {
    const studentsArr=[1,2,3]
    return (
        <div className={pagesStyle.container}>
            {
                studentsArr.map((student) =>
                    <CardHuman
                        key={student}
                    />)
            }
        </div>
    )
}
export default Favorites;