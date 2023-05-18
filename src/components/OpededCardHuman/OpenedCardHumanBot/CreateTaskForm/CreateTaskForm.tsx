import styles from './CreateTaskForm.module.scss'
import React, {FC} from "react"
import {useForm} from "react-hook-form";
import {userType} from "../../../../redux/slices/authUserSlice";
import {postTaskByLoginFirestore} from "../../../../dataBaseResponse/tasksFirestore";

type CreateTaskFormProps = {
    userInfo: userType;
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({userInfo}) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm()

    const onClickSendTask = (data: any) => {
        postTaskByLoginFirestore(userInfo.name, data.title, data.text,userInfo.uid).then().catch()
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