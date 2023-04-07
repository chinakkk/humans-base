import {FC} from "react"
import styles from './InputBlocks.module.scss'
import InputBlock from "./InputBlock/InputBlock";

type inputBlockType = {
    title: string;
    inputValue: string,
    inputOnChange: (value:string) => void;
}

type inputBlockNames = {
    inputBlockArr: inputBlockType[];
    showPassword?: boolean;
}

const InputBlocks: FC<inputBlockNames> = ({inputBlockArr, showPassword = true}) => {

    return (
        <div className={styles.container}>
            {
                inputBlockArr.map((item) => {
                    return (
                        <div className={styles.block}>
                            <InputBlock showPassword={showPassword}
                                        {...item}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default InputBlocks;