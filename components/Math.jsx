import React from 'react';
import {Context} from '../pages/index'
import {form_content} from '../styles/form.module.css';

export const MathComponent  = ( ) => {
    const UseCTX = React.useContext(Context);

    const refNumber = React.useRef({value: 0});
    const refType= React.useRef({value: ""})

    const [search,setSearch] = React.useState(0);
    const [type,setStype] = React.useState('');
    




    function HandleChange (ev){
    
        console.log(refNumber.current.value,refType.current.value)


       
       const asyncion = async () =>{
           try {
                
                let f = await fetch(`http://numbersapi.com/${refNumber.current.value}/${refType.current.value}?json`, {method: "get"})
                let r = await f.json();

                UseCTX.setProvider({
                    ctx: [r]
                });
           } catch (error) {
               UseCTX.setMSG({msg: "Not found"})
           }
                
            } 

            asyncion ()
        
    }

    const HandleSubmit = (ev) => {
        
        ev.preventDefault();

        const asyncion = async () =>{

            try {

                let f = await fetch(`http://numbersapi.com/${search}/${type}?json`, {method: "get"})
                let r = await f.json();
              


                UseCTX.setProvider({
                    ctx: [r]
                });
                } catch (error) {
                    UseCTX.setMSG({msg: "Networking not estabilize"})
                    UseCTX.setProvider({
                        ctx: []
                    })
                }
            } 

            asyncion ()
    }



    React.useEffect(() => {
         
    

    },[search,type,setSearch,setStype ])





    return <>
        <form 
        className={form_content} 
        method="POST" 
        onSubmit={HandleSubmit}
        onChange={HandleChange}>
            <div className='form_fields'>
                <label htmlFor='search'>Search: </label>
                <input type="number" defaultValue={search} onChange={ev => setSearch(parseInt(ev.target.value))} ref={refNumber}  name='search' id='search' ></input>
            </div>
            <div>
                <select name="type" ref={refType} onChange={ev => setStype((ev.target.value).toString())} id="type">
                     <option value='trivia'>Trivia</option>
                     <option value='math'>Math</option>
                     <option value='date'>Date</option>
                     <option value='year'>Year</option>           
                </select>
            </div>
            <button className='submit' type='submit'>Search</button>
        </form>
    
    
    
    </>



}