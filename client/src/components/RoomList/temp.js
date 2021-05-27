import React, { useEffect, useState } from "react";
import { List } from "antd";
import ChatCard from "./RoomCard";

import { ADD_ROOM } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_ROOMS } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_ROOMS, UPDATE_ROOM } from "../../utils/actions";

export default function RoomList() {
  const [addRoom, { error }] = useMutation(ADD_ROOM);
  const { loading, data } = useQuery(QUERY_ROOMS);

  const [roomname, setRoom] = useState("");

  const [state, dispatch] = useStoreContext();
  const { rooms } = state;

  //create room
  const createRoomHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await addRoom({ variables: { roomName: roomname } });
      if (response) {
        const {
          data: { addRoom },
        } = response;
        // console.log(response);
        // dispatch({
        //   type: UPDATE_ROOM,
        //   room: addRoom,
        // });
        // console.log(rooms);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //fetch rooms and set to rooms state
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_ROOMS,
        rooms: data.room,
      });
    } else if (!loading) {
      console.log("error");
    }
  }, [loading, data, dispatch]);
  console.log(rooms, "rooms");
  return (
    <>
      <form onSubmit={createRoomHandler}>
        <input value={roomname} onChange={(e) => setRoom(e.target.value)} />
        <button type="submit">create</button>
      </form>
      <List
        pagination={{
          pageSize: 3,
        }}
      >
        {rooms && rooms.length ? (
          <div className="flex-row">
            {rooms.map((room, i) => (
              <ChatCard key={i} room={room} />
            ))}
          </div>
        ) : (
          []
        )}
      </List>
    </>
  );
}
