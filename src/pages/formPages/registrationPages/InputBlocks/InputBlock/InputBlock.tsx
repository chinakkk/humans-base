import styles from './InputBlock.module.scss'
import {FC} from "react"

type inputBlockProps={
    title:string;

}

const inputBlock: FC <inputBlockProps>= ({title}) => {
    return (
        <div className={styles.container}>
            <div className={styles.titleFromBlocks}>{title}</div>
            <input className={styles.regInput}/>
        </div>
    )
}
export default inputBlock;