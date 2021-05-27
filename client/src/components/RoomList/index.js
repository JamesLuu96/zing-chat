import React, {useState, useEffect} from 'react'
import { List } from "antd";
import RoomCard from "./RoomCard";

import { QUERY_ROOMS } from "../../utils/queries";
import { ADD_ROOM } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";


export default function RoomList() {
  const [rooms, setRooms] = useState([])
  const [roomName, setRoomName] = useState('')
  const [createRoom, { error }] = useMutation(ADD_ROOM);
  const {data, loading} = useQuery(QUERY_ROOMS)

  useEffect(()=>{
    if(data){
      setRooms(index=>[...index, ...data.room])
    }
  }, [data])

  // console.log(rooms)
  async function addRoom(e){
    e.preventDefault()
    try {
      const response = await createRoom({ variables: { roomName: roomName } });
      if (response) {
        const {data: { addRoom }} = response;
        setRooms(index=>[...index, addRoom])
      }
    } catch (e) {
      console.log(e);
    }
    setRoomName('')
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
