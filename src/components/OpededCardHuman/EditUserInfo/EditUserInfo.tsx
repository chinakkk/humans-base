import styles from './EditUserInfo.module.scss'
import React, {FC} from "react"
import {toUpperCaseHead} from "../../../utils/toUpperCaseHead";
import {userType} from "../../../redux/slices/authUserSlice";
import {useForm} from "react-hook-form";
import {postTaskByLoginFirestore} from "../../../dataBaseResponse/tasksFirestore";
import {updateImgByUidFirestore, updateUserInfoByUidFirestore} from "../../../dataBaseResponse/usersFirestore";

type EditUserInfoProps = {
    userInfo: userType;
    setEditMode: (value: boolean) => void;
    setUserImageUrl: (value: string) => void;
    userImageUrl:string
}

const EditUserInfo: FC<EditUserInfoProps> = ({userInfo,
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
            userInfo.about !== data.about||
            userInfo.imageURL!==userImageUrl
        ) {
            userInfo.imageURL=userImageUrl
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
    const onClickDeleteImg = () => {
        // eslint-disable-next-line no-restricted-globals
        const deleteImg: any = confirm('Вы хотите удалить изображение?')
        if (deleteImg) {
            updateImgByUidFirestore(userInfo.uid, '').then()
            setUserImageUrl('')
        }
    }


    return (
        <div className={styles.container}>

            <form onSubmit={handleSubmit(onClickSave)}>
                <input defaultValue={toUpperCaseHead(userInfo.level)} type="text"
                       className={styles.aboutInputs + ' ' + styles.levelInput}
                       required
                       autoComplete={'off'}
                       placeholder={'Level'}
                       maxLength={15}
                       {...register('level')}

                />
                <input defaultValue={toUpperCaseHead(userInfo.name)} type="text"
                       className={styles.aboutInputs + ' ' + styles.nameInput}
                       required
                       autoComplete={'off'}
                       placeholder={'Name'}
                       maxLength={15}
                       {...register('name')}

                />
                <input defaultValue={toUpperCaseHead(userInfo.surname)} type="text"
                       className={styles.aboutInputs + ' ' + styles.birthdayInput}
                       required
                       autoComplete={'off'}
                       placeholder={'Surname'}
                       {...register('surname')}

                />
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
            {
                !!userInfo.imageURL &&
                <button onClick={onClickDeleteImg} className={styles.deleteImgButton}>
                  <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8L8 16M8.00001 8L16 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"
                          strokeLinejoin="round"/>
                  </svg>
                </button>
            }

        </div>

    )
}
export default EditUserInfo;