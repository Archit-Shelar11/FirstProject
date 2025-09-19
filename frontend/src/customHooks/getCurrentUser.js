import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData} from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {            
       // ⬅️ loading starts
      try {
        const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
          withCredentials: true,
        });
        console.log(result.data)
        dispatch(setUserData(result.data)); // ⬅️ sets data + isLoading=false
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null)); // ⬅️ still mark loading done
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
