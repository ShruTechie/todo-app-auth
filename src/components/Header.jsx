import React,{useState} from 'react'
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Alert,Button} from "react-bootstrap"
import {FormattedMessage} from 'react-intl'

const Header=()=> {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleLogout = async()=> {
   setError("")
    try {
     await logout()
     history.push("/login")
   } catch(err) {
       if(err.message){
           setError(err.message)
       }else{
           setError("Failed to log out")
       }
    }
 }
    return (
        <div>
               {error && <Alert variant="danger">{error}</Alert>}
                <FormattedMessage id='Welcome ,'/>
                {currentUser.email}
                <Button variant="link" onClick={handleLogout} className='dashboard__logout'>
                <FormattedMessage id='logout'/>
                </Button>
            
        </div>
    )
}

export default Header
