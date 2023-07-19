import styles from './ChatProgrammers.module.scss'
import {FC, useEffect, useState} from "react"
import ChatProgrammer from "./ChatProgrammer/ChatProgrammer";
import {userType} from "../../../../redux/slices/authUserSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {getUsersFirestore} from "../../../../dataBaseResponse/usersFirestore";

type ChatProgrammersProps = {

}

const ChatProgrammers: FC = () => {
    const [chatUsersCardItems, setChatUsersCardItems] = useState<userType[]>([])

    const {user} = useSelector((state: RootState) => state.userSlice)

    useEffect(() => {
        //получение пользователей по загрузке страницы
        (async () => {
            const usersItemsData = await getUsersFirestore()
            const usersWithoutLoginUser = usersItemsData ? usersItemsData.filter((dataUser: userType) => dataUser.login !== user.login) : []
            setChatUsersCardItems(usersWithoutLoginUser)
        })()

    }, [])





    return (
        <div className={styles.container}>

            {
                chatUsersCardItems.map((user) => {
                    return(
                        <ChatProgrammer
                            key={user.uid}
                            user={user}
                        />
                        )
                })
            }
        </div>
    )
}
export default ChatProgrammers;