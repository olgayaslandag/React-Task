import { useDispatch } from "react-redux";
import { logout } from "../store/auth";

const Logout = () => {
    const dispatch = useDispatch();


    
    dispatch(logout());
    window.location.replace("/");
}

export default Logout;