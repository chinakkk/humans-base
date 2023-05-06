import styles from './Programmers.module.scss'
import {FC, useEffect, useState} from "react"
import CardHuman from "../../../components/CardHuman/CardHuman";
import SkeletonCardHuman from "../../../components/CardHuman/SkeletonCardHuman";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {userType} from "../../../redux/slices/userSlice";
import {getAxiosUsers} from "../../../axios/usersAxios";


const Programmers: FC = () => {
    const [pageIsLoading, setPageIsLoading] = useState<boolean>(true)
    const [usersCardItems, setUsersCardItems] = useState<userType[]>([])
    const {user} = useSelector((state: RootState) => state.userSlice)

    useEffect(() => {
        (async () => {
            try {
                setPageIsLoading(true)

                const data = await getAxiosUsers()
                const filteredData = data.filter((dataUser: userType) => dataUser.login !== user.login)
                setUsersCardItems(filteredData)
                setPageIsLoading(false)//спросить у Адиля когда надо использовать await
            } catch (error) {
                console.log('Ошибка при запросе программистов', error)
            }

        })()

    }, [])

    return (
        <div className={styles.container}>
            {
                pageIsLoading ?
                    [...new Array(9)].map((value, index) => <SkeletonCardHuman key={index}/>)
                    :
                    usersCardItems.map((user) =>
                        <CardHuman userInfo={user}
                                   key={user.id}
                                   setUsersCardArr={setUsersCardItems}
                        />
                    )

            }
        </div>
    )
}
export default Programmers;