import React, { useState, useEffect } from "react";
import { List } from "antd";
import RoomCard from "./RoomCard";
import { QUERY_ROOMS } from "../../utils/queries";
import { ADD_ROOM } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSocket } from "../Socket";

const fakeRooms = [
  {
    _id: "kkofdsk4",
    roomName: "The biggest baddest room",
    category: ["dogs", "turtles", "cats", "fish"],
    users: [
      "Florence Kamp",
      "Tom Hanks",
      "Theia Wagner",
      "John Wallace",
      "Jennifer Ross",
      "James Ramirez",
    ],
  },
  {
    _id: "kkofdsk4",
    roomName: "Let's talk about vehicles",
    category: ["cars", "trucks", "transportation", "wheels", "highways"],
    users: ["Dorothy Graham", "Michael Taylor", "Tilly-Mae Bowen"],
  },
  {
    _id: "kkofdsk4",
    roomName: "My personal room",
    category: ["personal"],
    users: ["Bogdan Bryan", "Tom Hanks", "Marni Waller"],
  },
];

export default function RoomList() {
  const socket = useSocket()
  const [rooms, setRooms] = useState(fakeRooms)
  const [roomName, setRoomName] = useState('')
  const [filterString, setFilterString] = useState('')
  const [createRoom, { error }] = useMutation(ADD_ROOM);
  const {data, loading} = useQuery(QUERY_ROOMS)


  useEffect(()=>{
    if(data){
      setRooms(index=>[...index, ...data.room.map(room=>{
        return {...room, category: [], users: []}
      })])
    }
    if(socket){
      socket.on('add room', room=>{
        setRooms(index=>[...index, {...room, category: [], users: []}])
      })
    }
  }, [data])

  async function addRoom(e){
    e.preventDefault()
    setRoomName('')
    try {
      const response = await createRoom({ variables: { roomName: roomName } });
      if (response) {
        const {data: { addRoom }} = response;
        socket.emit('add room', addRoom)
      }
    } catch (e) {
      console.log(e);
    }
  }, [data]);

  return (
    <>
      <label>Filter by Tag: </label>
      <input value={filterString} onChange={e=>setFilterString(e.target.value)}/>
      <form onSubmit={addRoom}>
        <input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        <button type="submit">create</button>
      </form>
      <List
          id="room-list"
          dataSource={filterString ? rooms.filter(room=>{
            for(let i = 0; i < room.category.length; i++){
              if(room.category[i].includes(filterString)){
                return true
              }
            }
            return false
          }
          ): rooms}
          pagination={{
            pageSize: 5,
          }}
          renderItem={(room, i) => (
            <RoomCard key={i} room={{...room}} />
          )}>
      </List>
    </>
  )
}
