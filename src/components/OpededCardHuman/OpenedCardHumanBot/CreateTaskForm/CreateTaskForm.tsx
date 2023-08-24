import styles from './CreateTaskForm.module.scss'
import React, {FC, useRef} from "react"
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
            <form
                className={styles.container}
                onSubmit={handleSubmit(onClickSendTask)}>
                <div className={styles.inputsBlock}>
                    <input className={`${styles.taskInput} ${styles.taskTitleInput}`}
                           placeholder={'Enter title task...'}
                           {...register('title')}
                           required={true}
                           autoFocus={true}
                           autoComplete={'off'}
                           maxLength={40}
                           // ref={taskInputRef}
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
    )
}
export default CreateTaskForm;