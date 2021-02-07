import React from 'react'
import { useStateValue } from '../contexts/stateprovider'
import {LOCALES} from '../i18n/locales'
import {FormattedMessage} from 'react-intl'

const Footer=()=> {
    const [{},dispatch]=useStateValue()

    const handleChangeLang=(val)=>{
        const {HINDI,ENGLISH}=LOCALES
       if(val === 'hi'){
           dispatch({
            type: 'CHANGE_LANG',
            lang:HINDI
        })
       }else{
           dispatch({
            type: 'CHANGE_LANG',
            lang:ENGLISH
        })
       }
   }

   const handleTheme=(val)=>{
    dispatch({
        type: 'CHANGE_THEME',
        theme:val
    })
   }

return (
        <div className='dashboard__footer'>
            <div  className='dashboard__theme'>
                <FormattedMessage id='Change theme'/>
                <input id="colorPicker" type="color" onChange={(e)=>handleTheme(e.target.value)}  />
            </div>
            <div>
            <FormattedMessage id='Change langauage'/>
                <div  className='dashboard__lang'>
                    <select id="items" onClick={(e)=>handleChangeLang(e.target.value)}>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                    </select>
                </div>
            </div>
    </div>
    )
}

export default Footer
