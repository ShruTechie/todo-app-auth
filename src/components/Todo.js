import React, { useState ,useEffect} from 'react'
import { Button } from 'react-bootstrap';

const Todo = () => {
    
    const [namsstore, setnamsstore] = useState('');
    const [display, setdisplay] = useState(true);
    const [id, setid] = useState('');
    const [language, setlanguage] = useState('english');
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
        

     console.log(renderData);
    return (
        <div className="container">
            <div className="row">

                <div className="col s12 ">
                    <div className="card-panel blue-grey lighten-5">
                   
                        <form >
                            <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="what is next in your Todo" id="first_name"  value={namsstore} onChange={(event)=>   setnamsstore(event.target.value)   } type="text" className="validate" />
                          
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
                                    <div className="card-panel row" key={index}>
                                        <div style={{display:'flex'}}>
                                              <input type="checkbox" aria-label="Checkbox for following text input"/>

                                        <div class="blue-text text-darken-2 col s8">{item.value}</div>
                                        {
status !== 'completed' ?   <div className="col l2 s6" > 
                                                                    <button type="button" class="close" aria-label="Close" onClick={()=>Deletehandler(index)} >
                                    <span aria-hidden="true">&times;</span>
                                    </button>

                            </div> :''
                                        }
                                   
                               </div>
                               <hr style={{color:'red'}}/>
                                    </div>

                                )
                            })
                        }
                     
                    </div>
<div>
    <hr/>
    <div>
    <input type="checkbox" aria-label="Checkbox for following text input"/>
    <span>Check All</span>
    {
        status !== 'completed' ?     <span> {active && active.length} items left</span>
            :''
    }
    </div>

    <div>
    <Button 
     type="button" class="btn btn-outline-primary"
     style={{background:theme}}
    onClick={()=>setStatus('all')}>All</Button>
            &nbsp;
    <Button 
     type="button" class="btn btn-outline-primary"
    onClick={()=>setStatus('active')}
    style={{background:theme}}
    >Active</Button>
                &nbsp;

    <Button
     type="button" class="btn btn-outline-primary"
     style={{background:theme}}
    onClick={()=>setStatus('completed')}>Completed</Button>
                &nbsp;

    <Button 
     type="button" class="btn btn-outline-primary"
     style={{background:theme}}
    onClick={clearCompletedData}>Clear completed</Button>
    </div>
    <div style={{marginTop:'3%'}}>
        <div>
            <button>
            <input id="colorPicker" type="color" onChange={(e)=>setTheme(e.target.value)}  />

                Select theme</button>

        </div>

    </div>
    
<span style={{color:'green'}} >Selected lang {language}</span>

</div>
<div  style={{marginTop:'3%'}}>
<select id="items" onClick={(e)=>setlanguage(e.target.value)}>
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                  </select>
</div>
                   
                </div>
            </div>
        </div>
    )
}

export default Todo