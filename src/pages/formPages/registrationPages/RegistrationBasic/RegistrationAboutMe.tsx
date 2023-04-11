import styles from './RegistrationAboutMe.module.scss'
import commonStyles from '../../commonForm.module.scss'
import {FC, memo, useState} from "react"
import ToggleButton from "./ToggleButton/ToggleButton";
import InputBlocks from "../../Components/InputBlocks/InputBlocks";
import ButtonInForm from "../../Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "../../Components/ButtonOutsideForm/ButtonOutsideForm";
import {RootState, useAppDispatch} from "../../../../redux/store";
import {setRegistrationAbout} from "../../../../redux/slices/registrationSlice";
import {useSelector} from "react-redux";

const RegistrationAboutMe: FC = memo(() => {
    const dispatch = useAppDispatch()
    const {registrationUser} = useSelector((state: RootState) => state.registrationSlice)

    const [nameInputValue, setNameInputValue] = useState<string>(registrationUser.name || '')
    const [surnameInputValue, setSurnameInputValue] = useState<string>(registrationUser.surname || '')
    const [groupNumberInputValue, setGroupNumberInputValue] = useState<string>(registrationUser.group || '')
    const [birthDaInputValue, setBirthDayInputValue] = useState<string>(registrationUser.birthday || '')
    const [checkedToggleButton, setCheckedToggleButton] = useState<string>('')


    const inputIsFilled: boolean = (
        nameInputValue.length > 0 &&
        surnameInputValue.length > 0 &&
        groupNumberInputValue.length > 0 &&
        birthDaInputValue.length > 0 &&
        checkedToggleButton.length>0
    )

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
    const onClickContinue = () => {
        dispatch(setRegistrationAbout({
            name: nameInputValue,
            surname: surnameInputValue,
            group: groupNumberInputValue,
            birthday: birthDaInputValue,
            role:checkedToggleButton
        }))
    }


    return (
        <div className={styles.container}>
            <div className={styles.window + ' ' + commonStyles.window}>
                <InputBlocks inputBlockArr={inputBlockArr}/>
                <ToggleButton checkedToggleButton={checkedToggleButton}
                              setCheckedToggleButton={setCheckedToggleButton}/>

                {/*Кнопка завершения регистрации*/}
                <ButtonInForm title={'Continue'}
                              linkTo={'/registration/login'}
                              activeIf={inputIsFilled}
                              onClickProps={onClickContinue}
                />
            </div>

            {/*Кнопка назад*/}
            <ButtonOutsideForm title={'Go back'} linkTo={'/authentication'}/>


        </div>
    )
})
export default RegistrationAboutMe;