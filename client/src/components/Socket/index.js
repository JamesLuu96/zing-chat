import React, {useContext, useState, useEffect} from 'react'
import io from "socket.io-client";
import decode from "jwt-decode";

const SocketContext = React.createContext()
const UsersContext= React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function useUsers(){
    return useContext(UsersContext)
}

export default function Socket({children, idToken}) {
    const [users, setUsers] = useState([])
    const [socket, setSocket] = useState()
    useEffect(() => {
        
        const newSocket = io(
            '/',
            { query: { idToken: JSON.stringify(decode(idToken).data) } }
        )
        setSocket(newSocket)
        newSocket.on('already logged in', ()=>{
            window.location.assign("/error")
        })
        return () => newSocket.close()
    }, [idToken])

    return (
        <SocketContext.Provider value={socket}>
            <UsersContext.Provider value={{users, setUsers}}>
                {children}
            </UsersContext.Provider>
        </SocketContext.Provider>
    )
}
