import { useState, useContext, useEffect } from "react"
import AuthContext from "../../context/authContext"
import axios from "axios"
import { Outlet } from "react-router-dom"
import Loader from "../Loader"

export const PrivateRoute = () => {
    const [ok, setOk] = useState(false)
    const {auth}  = useContext(AuthContext)

    useEffect(() => {
        const authCheck = async () => {
            const {data} = await axios.get("/api/v1/auth/user-auth")
            if(data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    }, [auth?.token])
  

    return ok? <Outlet/> : <Loader/>

}