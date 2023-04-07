import styles from './InputBlock.module.scss'
import {FC} from "react"

type inputBlockProps={
    showPassword?:boolean;
    title:string;
    inputValue:string;
    inputOnChange: (value:string) => void;

}

const inputBlock: FC <inputBlockProps>= ({showPassword=true,title,inputValue,inputOnChange}) => {
    const isPasswordMode=(title==='Password'&&!showPassword)
    return (
        <div className={styles.container}>
            <div className={styles.titleFromBlocks}>{title}</div>
            <input
                type={isPasswordMode?'password':'text'}
                className={`${styles.regInput} ${isPasswordMode && styles.passwordMode}`}
                onChange={event => inputOnChange(event.target.value)}
                value={inputValue}
            />
        </div>
    )
}
export default inputBlock;