import React, { useState, useEffect } from "react";
import { List } from "antd";
import RoomCard from "./RoomCard";
import { QUERY_ROOMS } from "../../utils/queries";
import { ADD_ROOM } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSocket } from "../Socket";

export default function RoomList() {
  const socket = useSocket();
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [createRoom, { error }] = useMutation(ADD_ROOM);
  const { data, loading } = useQuery(QUERY_ROOMS);

  useEffect(() => {}, []);

  useEffect(() => {
    if (data) {
      setRooms((index) => [...index, ...data.room]);
    }
  }, [data]);

  return (
    <div>
      {rooms.map((room, i) => {
        return <RoomCard key={i} room={room} />;
      })}
    </div>
  );
}
