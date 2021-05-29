import React, {useContext, useState} from 'react'
import io from "socket.io-client";
const socket = io.connect("/");

const SocketContext = React.createContext()
const MyInfoContext= React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function UseInfo(){
    return useContext(MyInfoContext)
}

export default function Socket({children}) {
    const [me, setMe] = useState({})

    return (
        <SocketContext.Provider value={socket}>
            <MyInfoContext.Provider value={{me:me, setMe:setMe}}>
                {children}
            </MyInfoContext.Provider>
        </SocketContext.Provider>
    )
}
