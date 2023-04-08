import {FC} from "react"
import styles from './InputBlocks.module.scss'
import InputBlock from "./InputBlock/InputBlock";

type inputBlockType = {
    title: string;
    inputValue: string,
    inputOnChange: (value: string) => void;
}

type inputBlockNames = {
    inputBlockArr: inputBlockType[];
    showPassword?: boolean;
}

const InputBlocks: FC<inputBlockNames> = ({inputBlockArr, showPassword = true}) => {

    return (
        <div className={styles.container}>
            {
                inputBlockArr.map((inputBlock) => {
                    return (
                        <div className={styles.block} key={inputBlock.title}
                        >
                            <InputBlock showPassword={showPassword}
                                        {...inputBlock}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default InputBlocks;