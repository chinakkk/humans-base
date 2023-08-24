import styles from './EditUserInfo.module.scss'
import React, {FC} from "react"
import {toUpperCaseHead} from "../../../utils/toUpperCaseHead";
import {userType} from "../../../redux/slices/authUserSlice";
import {useForm} from "react-hook-form";
import {postTaskByLoginFirestore} from "../../../dataBaseResponse/tasksFirestore";
import { updateUserInfoByUidFirestore} from "../../../dataBaseResponse/usersFirestore";

type EditUserInfoProps = {
    userInfo: userType;
    setEditMode: (value: boolean) => void;
    setUserImageUrl: (value: string) => void;
    userImageUrl: string;
}

const EditUserInfo: FC<EditUserInfoProps> = ({
                                                 userInfo,
                                                 setEditMode,
                                                 setUserImageUrl,
                                                 userImageUrl
                                             }) => {

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm()


    const onClickSave = (data: any) => {
        if (userInfo.name !== data.name ||
            userInfo.surname !== data.surname ||
            userInfo.level !== data.level ||
            userInfo.about !== data.about ||
            userInfo.imageURL !== userImageUrl
        ) {
            userInfo.imageURL = userImageUrl
            userInfo.name = data.name
            userInfo.surname = data.surname
            userInfo.level = data.level
            userInfo.about = data.about
            updateUserInfoByUidFirestore(userInfo.uid, data).then()
            console.log('User info is upd')
            reset()
        }
        setEditMode(false)

    }


    return (

        <form
            className={styles.container}
            onSubmit={handleSubmit(onClickSave)}>

            <div className={styles.editInfoInputs}>

                <input defaultValue={toUpperCaseHead(userInfo.level)} type="text"
                       className={styles.aboutInput + ' ' + styles.levelInput}
                       required
                       autoComplete={'off'}
                       placeholder={'Level'}
                       maxLength={15}
                       {...register('level')}

                />
                <input defaultValue={toUpperCaseHead(userInfo.name)} type="text"
                       className={styles.aboutInput + ' ' + styles.nameInput}
                       required
                       autoComplete={'off'}
                       placeholder={'Name'}
                       maxLength={15}
                       {...register('name')}

                />
                <input defaultValue={toUpperCaseHead(userInfo.surname)} type="text"
                       className={styles.aboutInput + ' ' + styles.birthdayInput}
                       required
                       autoComplete={'off'}
                       placeholder={'Surname'}
                       {...register('surname')}

                />
            </div>
            <textarea
                className={styles.aboutArea}
                defaultValue={userInfo.about}
                autoComplete={'off'}
                placeholder={'About yourself'}
                {...register('about')}

            />
            <button
                className={styles.editButtons + ' ' + styles.saveButton}
            >
                Save
            </button>

        </form>


    )
}
export default EditUserInfo;