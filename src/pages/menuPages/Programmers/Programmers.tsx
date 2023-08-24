import styles from './Programmers.module.scss'
import {FC, useEffect, useState} from "react"
import CardHuman from "../../../components/CardHuman/CardHuman";
import SkeletonCardHuman from "../../../components/CardHuman/SkeletonCardHuman";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {userType} from "../../../redux/slices/authUserSlice";
import {getUsersFirestore} from "../../../dataBaseResponse/usersFirestore";


const Programmers: FC = () => {
    const [pageIsLoading, setPageIsLoading] = useState<boolean>(true)
    const [usersCardItems, setUsersCardItems] = useState<userType[]>([])

    const {user} = useSelector((state: RootState) => state.userSlice)
    const {search} = useSelector((state: RootState) => state.searchSlice)

    useEffect(() => {
        //получение пользователей по загрузке страницы
        (async () => {
            setPageIsLoading(true)
            const usersItemsData = await getUsersFirestore()
            const usersWithoutLoginUser = usersItemsData ? usersItemsData.filter((dataUser: userType) => dataUser.login !== user.login) : []

            setUsersCardItems(usersWithoutLoginUser)
            setPageIsLoading(false)
            console.log(usersCardItems)

        })()

    }, [])


    const renderProgrammersItems = () => {
        //фильтрация по поиску
        const searchFilterProgrammersItems = search.programmers.length > 0 ? usersCardItems.filter((user) => {
            //условие сортировки
            return user.name.toLowerCase().includes(search.programmers.toLowerCase()) ||
                user.surname.toLowerCase().includes(search.programmers.toLowerCase()) ||
                user.level.toLowerCase().includes(search.programmers.toLowerCase())
        }) : usersCardItems

        //вывод пользователей
        return pageIsLoading ?
            [...new Array(9)].map((value, index) => <SkeletonCardHuman key={index}/>)
            :
            searchFilterProgrammersItems.map((userCard) =>
                <CardHuman
                    data-testId={'userTestId'}
                    userInfo={userCard}
                    key={userCard.uid}
                    setUsersCardArr={setUsersCardItems}
                />
            )
    }

    return (
        <div className={styles.container}>
            {
                renderProgrammersItems()
            }
        </div>
    )
}
export default Programmers;