import styles from './OpenedCardHumanBot.module.scss'
import React, {FC} from "react"
import {useForm} from "react-hook-form";
import CreateTaskForm from "./CreateTaskForm/CreateTaskForm";
import {userType} from "../../../redux/slices/authUserSlice";
import EditUserInfo from "../EditUserInfo/EditUserInfo";

type OpenedCardHumanBotProps = {
    addTaskMode: boolean;
    userInfo: userType;
    editMode: boolean;
    setEditMode:(value:boolean) => void;
    setUserImageUrl:(value:string) => void;
    userImageUrl:string;
}

const OpenedCardHumanBot: FC<OpenedCardHumanBotProps> = ({
                                                             addTaskMode = false,
                                                             userInfo,
                                                             editMode,
                                                             setEditMode,
                                                             setUserImageUrl,
                                                             userImageUrl
                                                         }) => {

    return (
        <div className={styles.container}>
            {
                addTaskMode ?
                    <CreateTaskForm
                        userInfo={userInfo}
                    />
                    :
                    <>
                        {
                            editMode ?
                                <EditUserInfo
                                    userInfo={userInfo}
                                    setEditMode={setEditMode}
                                    setUserImageUrl={setUserImageUrl}
                                    userImageUrl={userImageUrl}
                                />
                                :
                                <div className={styles.note}>
                                    {userInfo.about || ''}
                                </div>
                        }
                    </>


            }

        </div>
    )
}
export default OpenedCardHumanBot;