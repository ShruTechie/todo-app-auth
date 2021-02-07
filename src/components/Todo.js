import React, { useState ,useEffect} from 'react'
import { Button } from 'react-bootstrap';
import './todo.css'
import { FormattedMessage} from 'react-intl'
import {I18nProvider, LOCALES} from '../i18n/index'

const Todo = ({language}) => {
    
    const [namsstore, setnamsstore] = useState('');
    const [display, setdisplay] = useState(true);
    const [status,setStatus]=useState('active')
    const [completed,setCompleted]=useState([])
    const [active,setActive]=useState([])
    const [allData, setAllData] = useState([]);
    const[renderData,setRenderData]=useState([])
    const[theme,setTheme]=useState('')

    useEffect(()=>{
        if(status === 'active'){
            setRenderData([...active])
        }
        if(status === 'completed'){
            setRenderData([...completed])
        }
        if(status === 'all'){
            setRenderData([...allData])
        }

    },[active,completed,allData,status])

    const addData = (event) =>{
        event.preventDefault();
        if(namsstore.length ){
          setActive([...active,{
              id:active.length,
              value:namsstore,
              done:false
          }])
          setnamsstore('')
        }
      }

      const Deletehandler = (id) =>{


            const completedData=active && active.filter((selectedId,index)=> selectedId.id === id)
      
            setCompleted([...completedData])
            let deletdata = [...active]
            deletdata.splice(id,1)
            setActive(deletdata)
            setnamsstore('')
            setdisplay(true)
     }
     
     useEffect(()=>{
         setAllData([...active,...completed])
     },[active,completed])
      
   const clearCompletedData=()=>{
      setCompleted([])
    }

    return (
        <I18nProvider locale={language}>

        <div className="container">
            <div className="row">

                <div className="col s12 ">
                    <div className="card-panel blue-grey lighten-5">
                   
                        <form >
                            <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                    placeholder={language === 'hi-in' ? 'आपके todo में आगे क्या है' :'What is next in your Todo' }
                                    id="first_name"  
                                     class="form-control"
                                    value={namsstore} onChange={(event)=>   setnamsstore(event.target.value)   } type="text" />
                          
                                </div>
                                <div className="input-field col l2 s12">

                                   
                                   
                                    {display?( <button className="btn waves-effect waves-light" onClick={addData} type="submit" name="action">
                                </button>):''}
                                </div>
                            </div>
                        </form>
                        {
                         renderData && renderData.map((item,index)=>{
                                return(
                                    <div className="card__panel-row" key={index}>
                                        <div style={{display:'flex'}}>
                                          

                                        <div class="blue-text text-darken-2 col s8">{item.value.toUpperCase()}</div>
                                        {
status !== 'completed' ?   <div className="col l2 s6" > 
                                                                    <button type="button" class="close" aria-label="Close" onClick={()=>Deletehandler(index)} >
                                    <span aria-hidden="true">&times;</span>
                                    </button>

                            </div> :''
                                        }
                                   
                               </div>
                               <hr/>
                                    </div>

                                )
                            })
                        }
                     
                    </div>
<div>
    
    <div className='todo__leftout'>
    {
        status !== 'completed' && active && active.length > 0  ?  <span> {active.length > 0} items <FormattedMessage id='left'/> </span>
            :  status !== 'completed' ? <span>Ooops,you dont have any active todo's</span> :''
    }
    </div>

    <div>
    <Button 
     type="button" class="btn btn-outline-primary"
     style={{background:theme}}
    onClick={()=>setStatus('all')}>
        <FormattedMessage id='All'/>
    </Button>
            &nbsp;
    <Button 
     type="button" class="btn btn-outline-primary"
    onClick={()=>setStatus('active')}
    style={{background:theme}}
    >
                <FormattedMessage id='Active'/>

        
        </Button>
                &nbsp;

    <Button
     type="button" class="btn btn-outline-primary"
     style={{background:theme}}
    onClick={()=>setStatus('completed')}>
                        <FormattedMessage id='Completed'/>

    </Button>
                &nbsp;

    <Button 
     type="button" class="btn btn-outline-primary"
     style={{background:theme}}
    onClick={clearCompletedData}>
                        <FormattedMessage id='Clear completed'/>

       </Button>
    </div>
    <div style={{marginTop:'3%'}}>
        <div>
            <button>
            <input id="colorPicker" type="color" onChange={(e)=>setTheme(e.target.value)}  />
            <FormattedMessage id='Change theme'/>
             </button>

        </div>

    </div>
    

</div>

                   
                </div>
            </div>
        </div>
        </I18nProvider>
    )
}

export default Todo