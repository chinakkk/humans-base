import {FC} from "react"
import styles from './InputBlocks.module.scss'
import InputBlock from "./InputBlock/InputBlock";

type inputBlockType = {
    title: string;
    inputValue: string,
    inputOnChange: (value: string) => void;
}

type inputBlocksProps = {
    inputBlockArr: inputBlockType[];
    showPassword?: boolean;
    buttonIsLoading?:boolean;
}

const InputBlocks: FC<inputBlocksProps> = ({inputBlockArr, showPassword = true,buttonIsLoading=false}) => {

    return (
        <div className={styles.container}>
            {
                inputBlockArr.map((inputBlock) => {
                    return (
                        <div className={styles.block} key={inputBlock.title}
                        >
                            <InputBlock showPassword={showPassword}
                                        buttonIsLoading={buttonIsLoading}
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