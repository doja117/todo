import React from "react";
import {z} from 'zod';
import axios from 'axios'
interface User {
    email:string;
    password:string;
}



async function sendUser(obj:User){
   axios.post('http://localhost:3000/signupuser',{obj}).then((r:Response)=>{
    if (r.status==409){
        alert('User Already Exists')
    }
   }).catch((e:Error)=>{
    console.log(e)
   })
}
function InputValidation(obj:User){
    try {
        z.string().email().parse(obj.email);
        sendUser(obj);
                
    }   catch {
        alert('email not valid');
        
    }
}

export default function SignUp(){
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    return (<>
        <input placeholder="email" onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
        <input placeholder="password" type="password" onChange={(e)=>{
            setPassword(e.target.value);
        }}/><br />
        <button onClick={()=>{
            (InputValidation({email,password}));
        }}>Submit</button> <br />

       
    </>)
}