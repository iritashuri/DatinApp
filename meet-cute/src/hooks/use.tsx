import { useSelector } from "react-redux";
import { RootState } from "../store";

const useUserData = ()=>{
    const userData = useSelector((state: RootState)=> {
        return state.meetCute.userData;
      })
    return userData;
}

export default useUserData;