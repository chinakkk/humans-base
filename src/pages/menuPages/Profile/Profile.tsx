import styles from './Profile.module.scss'

import {FC, useEffect} from "react";
import CardHuman from "../../../components/CardHuman/CardHuman";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import PersonInfo from "./PersonInfo/PersonInfo";
import Note from "./Note/Note";

const Profile: FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.contentTop}>
                <div className={styles.photo}>Photo</div>
                <PersonInfo/>

                <div className={styles.cardProfile}><CardHuman/></div>

            </div>
            <Note/>


        </div>
    )
}
export default Profile;