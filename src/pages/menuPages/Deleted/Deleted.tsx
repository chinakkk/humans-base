import styles from './Deleted.module.scss'
import pagesStyle from '../pagesWithCard.module.scss'
import {FC} from "react"
import CardHuman from "../../../components/cardHuman/CardHuman";

const Deleted: FC = () => {
    const studentsArr=[1,2,3,4,5]
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
export default Deleted;