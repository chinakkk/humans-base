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
            {
                !editMode &&
                <div className={styles.level}>{userInfo.level}</div>

            }

            {
                editMode ?
                    <div className={styles.inputs}>
                        <input
                            placeholder="Name"
                            className={styles.input}
                            name="firstName"
                            type="text"
                            value={editNameInput}
                            onChange={(event) => setEditNameInput(event.target.value)}
                            maxLength={15}
                            autoComplete={'off'}
                        />
                        <input
                            placeholder="Surname"
                            className={styles.input}
                            name="firstName"
                            type="text"
                            value={editSurnameInput}
                            onChange={(event) => setEditSurnameInput(event.target.value)}
                            maxLength={15}
                            autoComplete={'off'}

                        />
                        <input
                            placeholder="Date"
                            className={styles.input}
                            name="firstName"
                            type="date"
                            value={editDateInput}
                            onChange={(event) => setEditDateInput(event.target.value)}
                            maxLength={15}
                            autoComplete={'off'}

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