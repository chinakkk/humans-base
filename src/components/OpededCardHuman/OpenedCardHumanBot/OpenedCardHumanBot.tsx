import styles from './OpenedCardHumanBot.module.scss'
import React, {FC} from "react"
import {useForm} from "react-hook-form";
import CreateTaskForm from "./CreateTaskForm/CreateTaskForm";
import {userType} from "../../../redux/slices/userSlice";

type OpenedCardHumanBotProps = {
    addTaskMode: boolean;
    userInfo: userType;
}

const OpenedCardHumanBot: FC<OpenedCardHumanBotProps> = ({addTaskMode = false,userInfo}) => {

    return (
        <div className={styles.container}>
            {
                addTaskMode ?
                    <CreateTaskForm
                        userInfo={userInfo}
                    />
                    :
                    <div className={styles.note}>Люблю котиков и не люблю утро.</div>
            }

        </div>
    )
}
export default OpenedCardHumanBot;