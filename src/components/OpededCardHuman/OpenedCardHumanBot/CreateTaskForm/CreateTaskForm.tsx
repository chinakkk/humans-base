import styles from './CreateTaskForm.module.scss'
import React, {FC, useRef} from "react"
import {useForm} from "react-hook-form";
import {addAxiosTaskAboutLogin} from "../../../../axios/tasksAxios";
import {userType} from "../../../../redux/slices/userSlice";

type CreateTaskFormProps = {
    userInfo: userType;
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({userInfo}) => {
    const textAreaRef=useRef()
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm()

    const onClickSendTask = (data: any) => {
        addAxiosTaskAboutLogin(userInfo.name, data.title, data.text).then().catch()
        reset()
    }
   
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onClickSendTask)}>
                <div className={styles.inputsBlock}>
                    <input className={`${styles.taskInput} ${styles.taskTitleInput}`}
                           placeholder={'Enter title task...'}
                           {...register('title')}
                           required={true}
                           autoFocus={true}
                           autoComplete={'off'}
                    />
                    <textarea
                        className={`${styles.taskInput} ${styles.taskTextArea}`}
                        placeholder={'Enter text task...'}
                        {...register('text')}
                    />
                </div>

                <button
                    className={styles.sendTaskButton}
                >
                    Send task
                </button>
            </form>
        </div>
    )
}
export default CreateTaskForm;