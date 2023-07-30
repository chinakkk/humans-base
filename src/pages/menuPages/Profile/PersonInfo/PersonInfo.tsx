import styles from './PersonInfo.module.scss'
import {FC, useState} from "react"
import {userType} from "../../../../redux/slices/authUserSlice";

type PersonInfo = {
    userInfo: userType;
    editMode: boolean;
    editNameInput: string;
    editSurnameInput: string;
    setEditNameInput: (value: string) => void;
    setEditSurnameInput: (value: string) => void;
    editDateInput: string;
    setEditDateInput: (value: string) => void;

}

const PersonInfo: FC<PersonInfo> = ({
                                        userInfo,
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
                editMode ?
                    <div className={styles.inputs}>
                        {/*<div className={styles.group}>*/}
                        {/*    <input required className={styles.input}/>*/}
                        {/*    <span className={styles.bar}></span>*/}
                        {/*    <label>Name</label>*/}

                        {/*</div>*/}
                        <input value={editNameInput}
                               onChange={(event) => setEditNameInput(event.target.value)}
                               className={styles.infoInput + ' ' + styles.nameInput}
                               type="text"
                               maxLength={15}
                        />
                        <input value={editSurnameInput}
                               onChange={(event) => setEditSurnameInput(event.target.value)}
                               className={styles.infoInput + ' ' + styles.surnameInput}
                               type="text"
                               maxLength={15}

                        />
                        <input className={styles.infoInput + ' ' + styles.dateInput}
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