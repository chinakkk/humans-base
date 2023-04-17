import styles from './Programmers.module.scss'
import {FC, useEffect, useState} from "react"
import CardHuman from "../../../components/CardHuman/CardHuman";
import axios from "axios";
import {userInfoType} from "../../../types/types";
import SkeletonCardHuman from "../../../components/CardHuman/SkeletonCardHuman/SkeletonCardHuman";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {userType} from "../../../redux/slices/userSlice";
import {getAxiosUsers} from "../../../functions/axiosFunction";


const Programmers: FC = () => {
    const [pageIsLoading, setPageIsLoading] = useState<boolean>(true)
    const [usersCardArr, setUsersCardArr] = useState<userInfoType[]>([])
    const {user} = useSelector((state: RootState) => state.userSlice)

    useEffect(() => {
        (async () => {
            try {
                setPageIsLoading(true)

                const data = await getAxiosUsers()
                const filteredData = data.filter((dataUser: userType) => dataUser.login !== user.login)
                setUsersCardArr(filteredData)
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
                    usersCardArr.map((user) =>
                        <CardHuman userInfo={user}
                                   key={user.id}
                                   setUsersCardArr={setUsersCardArr}
                        />
                    )

            }
        </div>
    )
}
export default Programmers;