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
import {convertDate, getCurrentDate, resetConvertDate} from "../../utils/toUpperCaseHead";
import ErrorMessage from "./Components/ErrorMessage/ErrorMessage";

const RegistrationAbout: FC = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {registrationUser} = useSelector((state: RootState) => state.registrationSlice)

    const [errorMessage, setErrorMessage] = useState<string>('')
    const [nameInputValue, setNameInputValue] = useState<string>(registrationUser.name || '')
    const [surnameInputValue, setSurnameInputValue] = useState<string>(registrationUser.surname || '')
    const [birthdayInputValue, setBirthDayInputValue] = useState<string>(resetConvertDate(registrationUser.birthday) || '')
    const [checkedToggleButton, setCheckedToggleButton] = useState<string>(registrationUser.level || '')


    const inputIsFilled: boolean = (
        nameInputValue.length > 0 &&
        surnameInputValue.length > 0 &&
        birthdayInputValue.length > 0 &&
        checkedToggleButton.length > 0
    )

    const inputBlockArr = [
        {
            title: 'Name',
            inputValue: nameInputValue,
            inputOnChange: setNameInputValue,
            maxLength: 15
        },
        {
            title: 'Surname',
            inputValue: surnameInputValue,
            inputOnChange: setSurnameInputValue,
            maxLength: 15
        },
        {
            title: 'Birth Day',
            inputValue: birthdayInputValue,
            inputOnChange: setBirthDayInputValue,
            inputType: 'date',
        },
    ]

    const nameIsValid = (name: string, surname: string) => {


        if (name.length < 2) {
            setErrorMessage('Name must contain more than 2 letters.')
            return false
        }
        if (name.length > 15) {
            setErrorMessage('Name must be less than 15 characters.')
            return false
        }
        if (surname.length < 2) {
            setErrorMessage('Surname must contain more than 2 letters.')
            return false
        }
        if (surname.length > 15) {
            setErrorMessage('Surname must be less than 15 characters.')
            return false
        }
        const rusLetters = /^[А-Яа-я]+$/
        const enLetters = /^[A-Za-z]+$/

        if (!((name.match(rusLetters) && surname.match(rusLetters)) ||
            (name.match(enLetters) && surname.match(enLetters)))) {
            setErrorMessage('Name must have alpha bet characters only.')
            return false

        }

        console.log(name.match(rusLetters))
        return true

    }
    const birthdayIsValid = (birthday: string) => {
        //валидация дня рожадения относительно текущей даты
        const birthdayArr = birthday.split('-')
        const currentYear = Number(getCurrentDate().slice(0, 4))
        const currentMonth = Number(getCurrentDate().slice(4, 6))
        const currentDay = Number(getCurrentDate().slice(6, 8))


        if (currentYear < Number(birthdayArr[0])) {
            return false
        }
        if (currentYear === Number(birthdayArr[0])) {

            if (currentMonth === Number(birthdayArr[1]) &&
                (currentDay < Number(birthdayArr[2]))) {
                return false
            }
            if (currentMonth < Number(birthdayArr[1])) {
                return false
            }
        }
        return true
    }

    const isValid = () => {

        // валидация имени

        if (!nameIsValid(nameInputValue, surnameInputValue)) {
            return false
        }

        //валидация дня рождения
        if (!birthdayIsValid(birthdayInputValue)) {
            setErrorMessage('Incorrect date.')
            return false
        }

        return true
    }
    const onClickContinue = () => {
        if (!isValid()) return
        dispatch(setRegistrationAbout({
            name: nameInputValue,
            surname: surnameInputValue,
            birthday: convertDate(birthdayInputValue),
            level: checkedToggleButton
        }))
        navigate('/registration/login')
    }

    useEffect(() => {
        //очищение сообщения об ошибке, если пользователь отредактировал пароль или логин
        setErrorMessage('')
    }, [nameInputValue, surnameInputValue, birthdayInputValue])


    return (
        <div>
            <div className={commonStyles.window}>

                <form>
                    <InputBlocks inputBlockArr={inputBlockArr}/>
                    <ToggleButton checkedToggleButton={checkedToggleButton}
                                  setCheckedToggleButton={setCheckedToggleButton}/>
                    <ErrorMessage errorMessage={errorMessage}/>
                    {/*Кнопка завершения регистрации*/}
                    <ButtonInForm title={'Continue'}
                                  activeIf={inputIsFilled}
                                  onClickProps={onClickContinue}
                    />
                </form>
            </div>

            {/*Кнопка назад*/}
            <ButtonOutsideForm title={'Log in'} linkTo={'/authentication'}
                               onClickProps={() => dispatch(clearRegistrationData())}/>


        </div>
    )
})
export default RegistrationAbout;