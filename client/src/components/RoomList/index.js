import React, {useState, useEffect} from 'react'
import { List } from "antd";
import RoomCard from "./RoomCard";
import { QUERY_ROOMS } from "../../utils/queries";
import { ADD_ROOM } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {useSocket} from '../Socket'

export default function RoomList() {
  const socket = useSocket()
  const [rooms, setRooms] = useState([])
  const [roomName, setRoomName] = useState('')
  const [createRoom, { error }] = useMutation(ADD_ROOM);
  const {data, loading} = useQuery(QUERY_ROOMS)

  useEffect(()=>{
    socket.on('add room', room => {
      setRooms(old=>[...old, room])
    })
  }, [])

  useEffect(()=>{
    if(data){
      setRooms(index=>[...index, ...data.room])
    }
  }, [data])

  async function addRoom(e){
    e.preventDefault()
    setRoomName('')
    try {
      const response = await createRoom({ variables: { roomName: roomName } });
      if (response) {
        const {data: { addRoom }} = response;
        setRooms(index=>[...index, addRoom])
        socket.emit('add room', addRoom)
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <form onSubmit={addRoom}>
        <input value={roomName} onChange={e=>setRoomName(e.target.value)} />
        <button type="submit">create</button>
      </form>
      
      {rooms.map((room, i)=>{
        return <RoomCard key={i} room={room} />
      })}
      
    </div>
  )
}
