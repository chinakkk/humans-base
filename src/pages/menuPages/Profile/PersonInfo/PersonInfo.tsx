import styles from './PersonInfo.module.scss'
import {FC, useState} from "react"
import {userType} from "../../../../redux/slices/authUserSlice";

type PersonInfo = {
    userInfo:userType;
    editMode:boolean;
    editNameInput:string;
    editSurnameInput:string;
    setEditNameInput:(value:string) => void;
    setEditSurnameInput:(value:string) => void;
    editDateInput:string;
    setEditDateInput:(value:string) => void;

}

const PersonInfo: FC<PersonInfo> = ({userInfo,
                                        editMode,
                                        editNameInput,
                                        editSurnameInput,
                                        setEditNameInput,
                                        setEditSurnameInput,
                                        editDateInput,
                                        setEditDateInput,

                                    }) => {

    return (
        <div className={styles.container}>
            <div className={styles.level}>{userInfo.level}</div>

            {
                editMode?
                    <div className={styles.inputs}>
                        <input value={editNameInput}
                               onChange={(event) => setEditNameInput(event.target.value)}
                               className={styles.input+ ' '+ styles.nameInput}
                               type="text"
                               maxLength={15}
                        />
                        <input value={editSurnameInput}
                               onChange={(event) => setEditSurnameInput(event.target.value)}
                               className={styles.input+ ' '+ styles.surnameInput}
                               type="text"
                               maxLength={15}

                        />
                        <input className={styles.input+ ' '+ styles.dateInput}
                               type="date"
                               onChange={(event) => setEditDateInput(event.target.value)}
                               value={editDateInput}
                        />
                    </div>
                    :
                    <>
                        <div className={styles.name}>{userInfo.name + ' ' + userInfo.surname}</div>
                        <div className={styles.birthday}>{userInfo.birthday}</div>
                    </>

            }



        </div>
    )
}
export default PersonInfo;