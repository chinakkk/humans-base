import styles from './RegistrationAboutMe.module.scss'
import commonStyles from '../../commonForm.module.scss'
import {FC, useState} from "react"
import ToggleButton from "./ToggleButton/ToggleButton";
import InputBlocks from "../../Components/InputBlocks/InputBlocks";
import ButtonInForm from "../../Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "../../Components/ButtonOutsideForm/ButtonOutsideForm";

const RegistrationAboutMe: FC = () => {
    const [nameInputValue,setNameInputValue]=useState<string>('')
    const [surnameInputValue,setSurnameInputValue]=useState<string>('')
    const [groupNumberInputValue,setGroupNumberInputValue]=useState<string>('')
    const [birthDaInputValue,setBirthDayInputValue]=useState<string>('')

    const inputBlockArr = [
        {
            title: 'Name',
            inputValue: nameInputValue,
            inputOnChange: setNameInputValue,
        },
        {
            title: 'Surname',
            inputValue: surnameInputValue,
            inputOnChange: setSurnameInputValue,
        },
{
            title: 'Group number',
            inputValue: groupNumberInputValue,
            inputOnChange: setGroupNumberInputValue,
        },
{
            title: 'Birth Day',
            inputValue: birthDaInputValue,
            inputOnChange: setBirthDayInputValue,
        },

    ]


    return (
        <div className={styles.container}>
            <div className={styles.window +' '+commonStyles.window}>
                <InputBlocks inputBlockArr={inputBlockArr}/>
                <ToggleButton/>

                {/*Кнопка завершения регистрации*/}
                <ButtonInForm title={'Continue'} linkTo={'/registration/login'} activeIf={true}/>
            </div>

            {/*Кнопка назад*/}
            <ButtonOutsideForm title={'Go back'} linkTo={'/authentication'}/>


        </div>
    )
}
export default RegistrationAboutMe;