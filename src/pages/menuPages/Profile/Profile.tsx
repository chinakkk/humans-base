import styles from './Profile.module.scss'

import {FC, useEffect} from "react";
import CardHuman from "../../../components/CardHuman/CardHuman";

const Profile: FC = () => {
    useEffect(() => {

    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.contentTop}>
                <div className={styles.photo}>Photo</div>
                <div className={styles.info}>
                    <div>Куратор</div>
                    <div>Фаиль Гафаров</div>
                    <div>25.08.1974</div>
                    <div>09-265 09-861 +</div>
                </div>
                <div className={styles.cardProfile}>
                    <CardHuman/>
                </div>

            </div>
            <div className={styles.contentBot}>
                <input
                    className={styles.aboutMeInput}
                />
                <button className={styles.editButton}>Edit</button>
            </div>


        </div>
    )
}
export default Profile;