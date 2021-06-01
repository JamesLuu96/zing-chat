import React, { useState, useEffect } from "react";
import { List } from "antd";
import RoomCard from "./RoomCard";
import { QUERY_ROOMS } from "../../utils/queries";
import { ADD_ROOM } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSocket } from "../Socket";
import RoomForm from "../../components/RoomForm";
import { Button } from "antd";

export default function RoomList() {
  const socket = useSocket();
  const [rooms, setRooms] = useState([]);
  const [filterString, setFilterString] = useState("");

  const [createRoom, { error }] = useMutation(ADD_ROOM);
  const { data, loading } = useQuery(QUERY_ROOMS);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setRooms((index) => [
        ...index,
        ...data.room.map((room) => {
          return { ...room, users: [] };
        }),
      ]);
    }
    if (socket) {
      socket.on("add room", (room) => {
        setRooms((index) => [...index, { ...room, users: [] }]);
      });
      socket.on("delete room", (room) => {
        setRooms((index) => [...index.filter((old) => old._id !== room._id)]);
      });
    }
  }, [data]);

  const onCreate = async (values) => {
    const { roomName, tags, privacy, primary, secondary, tertiary } = values;
    console.log(values);
    try {
      const response = await createRoom({
        variables: {
          roomName,
          colors: [primary, secondary, tertiary],
          tags,
          privacy,
        },
      });
      socket.emit("add room", response.data.addRoom);
    } catch (e) {
      console.log(e);
    }
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Create room
      </Button>
      <RoomForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <label>Filter by Tag: </label>
      <input
        value={filterString}
        onChange={(e) => setFilterString(e.target.value)}
      />
      <List
        id="room-list"
        dataSource={
          filterString
            ? rooms.filter((room) => {
                for (let i = 0; i < room.tags.length; i++) {
                  if (room.tags[i].includes(filterString)) {
                    return true;
                  }
                }
                return false;
              })
            : rooms
        }
        pagination={{
          pageSize: 5,
        }}
        renderItem={(room, i) => (
          <RoomCard
            key={i}
            room={{ ...room }}
            setFilterString={setFilterString}
          />
        )}
      ></List>
    </>
  );
}
