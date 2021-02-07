import React from "react"
import { Card} from "react-bootstrap"
import Todo from './Todo'
import './Dashboard.css'
import {I18nProvider} from '../i18n/index'
import { FormattedMessage} from 'react-intl'
import Header from './Header'
import Footer from './Footer'
import {useStateValue} from '../contexts/stateprovider'

 const Dashboard =()=> {
    const [{lang},dispatch]=useStateValue()

    return (
    <>
    <I18nProvider locale={lang}>
      <Card>
        <Card.Body>
                
                <Header/>
                
                <h2 className="dashboard__header">todo -       
                <FormattedMessage id='application'/>
                </h2>
            
                <Todo/>
                    <hr/>

                 <Footer/>

             </Card.Body>
            </Card>
        </I18nProvider>
        </>
  )
}

export default Dashboard;
