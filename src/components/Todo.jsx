import React, { useState ,useEffect} from 'react'
import { Button } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl'
import {I18nProvider} from '../i18n/index'
import {useStateValue} from '../contexts/stateprovider'
import './Todo.css'


const Todo = () => {
    
    const [namsstore, setnamsstore] = useState('');
    const [display, setdisplay] = useState(true);
    const [status,setStatus]=useState('active')
    const [completed,setCompleted]=useState([])
    const [active,setActive]=useState([])
    const [allData, setAllData] = useState([]);
    const[renderData,setRenderData]=useState([])
    const [{theme,lang},dispatch]=useStateValue()

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
       if(completed.length > 0){
        const confirm = window.confirm('Are you sure want to clear completed todo data?')
        if(confirm){
         setCompleted([])
         window.alert('Succefully cleared')
        }
       }else{
           window.alert('Sorry, you dont have any completed data')
       }
      
     
    }

    return (
        <I18nProvider locale={lang}>

        <div className="container">
            <div className="row">

                <div className="col s12 ">
                    <div className="card-panel blue-grey lighten-5">
                   
                        <form >
                            <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                    placeholder={lang === 'hi-in' ? 'आपके todo में आगे क्या है' :'What is next in your Todo' }
                                    id="first_name"  
                                     class="form-control"
                                    value={namsstore} onChange={(event)=>   setnamsstore(event.target.value)   } type="text" />
                          
                                </div>
                                <div className="input-field col l2 s12">
                                        {display ?( <button className="btn waves-effect waves-light" onClick={addData} type="submit" name="action">
                                </button>):''}
                                </div>
                            </div>
                        </form>
                        {
                         renderData && renderData.map((item,index)=>{
                                return(
                                    <div className="card__panel-row" key={index}>
                                        <div className='todo__render'>
                                          <div class="blue-text text-darken-2 col s8">{item.value.toUpperCase()}</div>
                                        {
                                            status !== 'completed' ?  
                                             <div className="col l2 s6" > 
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
                status !== 'completed' && active && active.length > 0  ?  <span>{ `${active.length} items` }<FormattedMessage id='left'/> </span>
                    :  status !== 'completed' ? <span>Ooops,you dont have any active todo's</span> : <span>0 items completed</span>
            }
            </div>
                <hr/>
                    <div className='todos__button_conatiner'>
                    <button 
                     type="button" class="btn btn-outline-primary"
                     style={{
                         background:theme,
                        backgroundColor:status === 'all' ? 'blue':'',
                        color: status === 'all' ? 'white' :'black'
                    }}
                     onClick={()=>setStatus('all')}
                     >   
                    <FormattedMessage id='All'/>
                    </button>
                  &nbsp;
                    <button 
                    type="button" class="btn btn-outline-primary"
                    onClick={()=>setStatus('active')}
                    style={{
                        background:theme,
                        backgroundColor:status === 'active' ? 'blue':'',
                        color: status === 'active' ? 'white' :'black'
                    }}
                    >
                     <FormattedMessage id='Active'/>
                </button>
                                &nbsp;

                        <button
                        type="button" class="btn btn-outline-primary"
                        style={{
                            background:theme,
                            backgroundColor:status === 'completed' ? 'blue':'',
                            color: status === 'completed' ? 'white' :'black'
                        }}
                        onClick={()=>setStatus('completed')}>
                         <FormattedMessage id='Completed'/>

                        </button>
                                    &nbsp;

                    <button 
                    type="button" class="btn btn-outline-primary"
                    style={{
                        background:theme,
                        backgroundColor:status === 'clear completed' ? 'blue':'',
                        color: status === 'clear completed' ? 'white' :'black'
                    }}
                    onClick={clearCompletedData}>
                    <FormattedMessage id='Clear completed'/>

                    </button>
                    </div>
                </div>
          </div>
    </div>
        </div>
    </I18nProvider>
    )
}

export default Todo