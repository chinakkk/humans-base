import styles from './InputBlock.module.scss'
import {FC} from "react"

type inputBlockProps = {
    showPassword?: boolean;
    title: string;
    inputValue: string;
    inputOnChange: (value: string) => void;
    buttonIsLoading?:boolean;

}

const inputBlock: FC<inputBlockProps> = ({buttonIsLoading=false,showPassword = true, title, inputValue, inputOnChange}) => {
    const stringIncludesPassword = title.toLowerCase().includes('password')
    const isPasswordMode = (stringIncludesPassword && !showPassword)
    return (
        <div className={styles.container}>
            <label className={styles.titleFromBlocks}>
                {title}
                <input
                    disabled={buttonIsLoading}
                    type={isPasswordMode ? 'password' : 'text'}
                    className={`${styles.regInput} ${isPasswordMode && styles.passwordMode}`}
                    onChange={event => inputOnChange(event.target.value)}
                    value={inputValue}
                />
            </label>


        </div>
    )
}
export default inputBlock;