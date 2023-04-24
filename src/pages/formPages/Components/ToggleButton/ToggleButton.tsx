import styles from './ToggleButton.module.scss'
import {FC, useState} from "react"

type ToggleButtonProps={
    checkedToggleButton:string;
    setCheckedToggleButton: (value:string ) => void;
}

const ToggleButton: FC <ToggleButtonProps>= ({checkedToggleButton, setCheckedToggleButton}) => {
    const toggleTitleArr = ['Junior', 'Middle', 'Senior']
    return (
        <div className={styles.container}>
            {
                toggleTitleArr.map((title) => {
                    return (
                        <button
                            type={"button"}
                            key={title}
                            onClick={() => setCheckedToggleButton(title.toLowerCase())}
                            className={styles.toggleButton + ' ' + ((checkedToggleButton === title.toLowerCase()) ? styles.activeToggleButton : '')}
                        >
                            {title}
                        </button>
                    )
                })
            }
        </div>
    )
}
export default ToggleButton;