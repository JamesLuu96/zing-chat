import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
const socket = io.connect('/')
let name = ''

export default function Chat() {
    const [msg, setMsg] = useState('')
    const [chat, setChat] = useState([])
    useEffect(()=>{
        name = prompt('What is your name?')
        socket.on('receive message', message=>{
            setChat(old=>[...old, message])
        })
    }, [])
    function submitForm(e){
        e.preventDefault()
        socket.emit('send message', `${name}: ${msg}`)
        setMsg('')
    }
    
    return (
        <div>
            <ul>
                {chat.map((message, i)=><li key={i}>{message}</li>)}
            </ul>
            <form onSubmit={submitForm}>
                <input value={msg} onChange={(e)=>setMsg(e.target.value)}></input>
            </form>
        </div>
    )
}
