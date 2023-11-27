import {z} from 'zod'
import React from 'react'

function zodTest(input:string):string{
    const emailSchema=z.string().email();
    try {
        emailSchema.parse(input);
        return input;
    } catch (e){
        return 'email not valid'
    }
}
export default function TestInput(){
    const [input,setInput]=React.useState("");
    const [output,setOutput]=React.useState("Default Ass Output");
    return <>
        <input placeholder='email' onChange={(e)=>{setInput(e.target.value)}}/>
        <button onClick={()=>{
            let str=zodTest(input);
            setOutput(str);
        }}>Test</button>
        <br />
        {output}
    </>
   
}


