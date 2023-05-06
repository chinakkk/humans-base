import {useSelector} from "react-redux";

export const useAdminAuth = () => {
  const {user,adminUser} = useSelector((state) => state.userSlice)
  return user.login===adminUser.login
}