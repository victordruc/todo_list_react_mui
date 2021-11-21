import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { actionLogoutUser } from "../../store/user_reducer"
import {useNavigate} from "react-router-dom"

function Logout() {
    const isAuth = useSelector((state)=>state.userReducer.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch(actionLogoutUser())
        navigate("/signin")
    }
    if(!isAuth) {
        return null
    }
    return (
        <Button onClick={handleClick} color="inherit">Logout</Button>
    )
}

export default Logout