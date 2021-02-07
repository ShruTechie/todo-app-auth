import React, { useState} from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import Todo from './Todo'
import './Dashboard.css'
import {I18nProvider, LOCALES} from '../i18n/index'
import { FormattedMessage} from 'react-intl'

 function Dashboard() {
  const [error, setError] = useState("")
  const [language, setlanguage] = useState(LOCALES.ENGLISH);

  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

 const handleChangeLang=(val)=>{
    if(val === 'hi'){
        setlanguage(LOCALES.HINDI)
    }else{
        setlanguage(LOCALES.ENGLISH)
    }
        
 }

  return (
    <>
    <I18nProvider locale={language}>

      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
        
          <FormattedMessage id='Welcome'/>
        <span>&nbsp; ,</span>
          {currentUser.email}
          <Button variant="link" onClick={handleLogout} className='dashboard__logout'>
          <FormattedMessage id='logout'/>
        </Button>
         
        <h2 className="dashboard__header">todo -              <FormattedMessage id='application'/>
</h2>

          <Todo language={language}/>
             <span> 
             <FormattedMessage id='Change langauage'/>

             </span>
          <div  style={{marginTop:'3%'}}>
                <select id="items" onClick={(e)=>handleChangeLang(e.target.value)}>
                     <option value="en">English</option>
                    <option value="hi">Hindi</option>
                  </select>
        </div>

        </Card.Body>
      </Card>
      </I18nProvider>
        </>
  )
}

export default Dashboard;
