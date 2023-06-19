import styles from './OpenedCardHumanBot.module.scss'
import React, {FC} from "react"
import {useForm} from "react-hook-form";
import CreateTaskForm from "./CreateTaskForm/CreateTaskForm";
import {userType} from "../../../redux/slices/authUserSlice";

type OpenedCardHumanBotProps = {
    addTaskMode: boolean;
    userInfo: userType;
    editMode: boolean;
}

const OpenedCardHumanBot: FC<OpenedCardHumanBotProps> = ({
                                                             addTaskMode = false,
                                                             userInfo,
                                                             editMode
                                                         }) => {

    return (
        <div className={styles.container}>
            {
                addTaskMode ?
                    <CreateTaskForm
                        userInfo={userInfo}
                    />
                    :
                    <div className={styles.note}>
                        {
                            !editMode &&
                            (userInfo.about || '')
                        }
                    </div>
            }

        </div>
    )
}
export default OpenedCardHumanBot;