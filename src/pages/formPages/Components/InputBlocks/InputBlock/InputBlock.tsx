import styles from './InputBlock.module.scss'
import {FC} from "react"

type inputBlockProps = {
    showPassword?: boolean;
    title: string;
    inputValue: string;
    inputOnChange: (value: string) => void;
    buttonIsLoading?: boolean;
    inputType?: string;
    maxLength?:number;

}

const inputBlock: FC<inputBlockProps> = ({
                                             buttonIsLoading = false,
                                             showPassword = true,
                                             title,
                                             inputValue,
                                             inputOnChange,
                                             inputType='',
                                             maxLength=30,
                                         }) => {
    const stringIncludesPassword = title.toLowerCase().includes('password')
    const isPasswordMode = (stringIncludesPassword && !showPassword)
    return (
        <div className={styles.container}>
            <label className={styles.titleFromBlocks}>
                {title}
                <input
                    maxLength={maxLength}
                    disabled={buttonIsLoading}
                    type={inputType || (isPasswordMode ? 'password' : 'text')}
                    className={`${styles.regInput} ${!inputType&&styles.regInputPaddingBottom} ${isPasswordMode && styles.passwordMode}`}
                    onChange={event => inputOnChange(event.target.value)}
                    value={inputValue}
                />
            </label>


        </div>
    )
}
export default inputBlock;