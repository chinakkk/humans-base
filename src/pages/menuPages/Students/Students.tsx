import styles from './Students.module.scss'
import pagesStyle from '../pagesWithCard.module.scss'
import {FC} from "react"
import CardHuman from "../../../components/CardHuman/CardHuman";

const Students: FC = () => {
    const studentsArr=[1,2,3,4,5,6,7,8,9]
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
export default Students;