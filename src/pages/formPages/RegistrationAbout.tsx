import commonStyles from './commonForm.module.scss'
import {FC, memo, useEffect, useState} from "react"
import ToggleButton from "./Components/ToggleButton/ToggleButton";
import InputBlocks from "./Components/InputBlocks/InputBlocks";
import ButtonInForm from "./Components/ButtonInForm/ButtonInForm";
import ButtonOutsideForm from "./Components/ButtonOutsideForm/ButtonOutsideForm";
import {RootState, useAppDispatch} from "../../redux/store";
import {clearRegistrationData, setRegistrationAbout} from "../../redux/slices/registrationSlice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const RegistrationAbout: FC = memo(() => {
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
    const {registrationUser} = useSelector((state: RootState) => state.registrationSlice)

    const [nameInputValue, setNameInputValue] = useState<string>(registrationUser.name || '')
    const [surnameInputValue, setSurnameInputValue] = useState<string>(registrationUser.surname || '')
    const [birthDaInputValue, setBirthDayInputValue] = useState<string>(registrationUser.birthday || '')
    const [checkedToggleButton, setCheckedToggleButton] = useState<string>(registrationUser.level || '')


    const inputIsFilled: boolean = (
        nameInputValue.length > 0 &&
        surnameInputValue.length > 0 &&
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
            title: 'Birth Day',
            inputValue: birthDaInputValue,
            inputOnChange: setBirthDayInputValue,
        },

    ]
    const onClickContinue = () => {
        dispatch(setRegistrationAbout({
            name: nameInputValue,
            surname: surnameInputValue,
            birthday: birthDaInputValue,
            level:checkedToggleButton
        }))

        navigate('/registration/login')
    }

    return (
        <div>
            <div className={commonStyles.window}>

                <form>
                    <InputBlocks inputBlockArr={inputBlockArr}/>
                    <ToggleButton checkedToggleButton={checkedToggleButton}
                                  setCheckedToggleButton={setCheckedToggleButton}/>

                    {/*Кнопка завершения регистрации*/}
                    <ButtonInForm title={'Continue'}
                                  activeIf={inputIsFilled}
                                  onClickProps={onClickContinue}
                    />
                </form>
            </div>

            {/*Кнопка назад*/}
            <ButtonOutsideForm title={'Go back'} linkTo={'/authentication'} onClickProps={() => dispatch(clearRegistrationData())}/>


        </div>
    )
})
export default RegistrationAbout;