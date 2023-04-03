import {FC} from "react"
import styles from './InputBlocks.module.scss'
import InputBlock from "./InputBlock/InputBlock";

type inputBlockNames = {
    inputBlockTitles: string[];
}

const InputBlocks: FC<inputBlockNames> = ({inputBlockTitles}) => {
    return (
        <div className={styles.container}>
            {
                inputBlockTitles.map((title) => {
                    return (
                        <div className={styles.block}>
                            <InputBlock title={title}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default InputBlocks;