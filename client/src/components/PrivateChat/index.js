import React, { useState, useEffect, useCallback } from "react";
import { Tabs, Input, Avatar, List, Badge } from "antd";
import "./chat.css";
import {useVisible} from "./BlurHandler"
import {useMyInfo, useUsers, useSocket} from "../Socket"
import { useMutation } from "@apollo/react-hooks";
import {SEND_DM} from "../../utils/mutations"

const { TabPane } = Tabs;

function PrivateChat({setCount}) {
  const {visible} = useVisible();
  const [openChat, setOpenChat] = useState("1");
  const [currentConv, setCurrentConv] = useState({username: ""})
  const [currentConvChat, setCurrentConvChat] = useState([])
  const [message, setMessage] = useState('')
  const user = useMyInfo()
  const [friends, setFriends] = useState([])
  const {users} = useUsers()
  const [sendDM] = useMutation(SEND_DM)
  const socket = useSocket()
  const [notif, setNotif] = useState([])

  useEffect(()=>{
    if(openChat === "2" && visible){
      console.log('erase unread messages')
      setNotif(old=>old.filter(names=>names !== currentConv.username))
    }
    if(openChat === "1" && visible){
      console.log('erase friend requests')
    }
  }, [openChat, visible])
  
  useEffect(()=>{
    if(socket){
      socket.off('receive DM')
      socket.off('add friend')
      socket.on('receive DM', (message)=>{
        if(openChat !== "2" || visible === false || (currentConv.username !== message.sender)){
          setNotif(old=>[...old, message.sender])
          setCount(notif.length)
        }
        setCurrentConvChat(old=>[...old, message])
      })
      socket.on('add friend', friend=>{
        setFriends(old=> [...old, friend])
      })
      return ()=>{
        socket.off('receive DM')
        socket.off('add friend')
      }
    }
  }, [socket, openChat, visible, currentConv])

  setCount(notif.length)

  useEffect(()=>{
    if(!user || (Array.isArray(currentConvChat) && currentConvChat.length)){
    }else{
      setCurrentConvChat(user.privateMessages)
      setFriends(user.friends)
    }
  }, [user])

  async function sendMessage(e){
    e.preventDefault()
    setMessage('')
    const userMessage = {message, receiver: currentConv.username}
    setCurrentConvChat(old=>[...old, userMessage])
    socket.emit('send DM', userMessage, currentConv._id)
    try {
      await sendDM({variables: userMessage})
    } catch (e) {
      console.log(e);
    }
  }
  const newChatHandler = (currentTab) => {
    setOpenChat(e=>currentTab);
  };
  const clickFriendHandler = (friend) => {
    newChatHandler("2")
    setCurrentConv(friend)
  }
  return (
    <>
      {visible && (
        <div className="chatBox testThis">
          <Tabs activeKey={openChat} onChange={e=>newChatHandler(e)}>
            <TabPane tab="Friends" key="1">
              <List
                dataSource={friends}
                renderItem={(friend, i) => (
                  <List.Item key={i} onClick={() => clickFriendHandler(friend)}>
                    <List.Item.Meta
                      avatar={
                        users.filter(user=>user.id === friend._id).length ? 
                        <Badge dot status="success" size="default">
                          <Avatar src={friend.avatar} />
                        </Badge> :
                        <Badge dot status="" size="default">
                          <Avatar src={friend.avatar} />
                        </Badge>
                      }
                      description={friend.username}
                    />
                    
                    {users.filter(user=>user.id === friend._id).length ?
                    <div>Online</div> : <div>Offline</div>}
                  </List.Item>
                )}
              ></List>
            </TabPane>
            <TabPane tab="Conversations" key="2">
              {currentConv.username !== "" ?
              <>
                <div>
                <List.Item.Meta
                      avatar={
                        users.filter(user=>user.id === currentConv._id).length ? 
                      <Badge dot status="success" size="default">
                        <Avatar src={currentConv.avatar} />
                      </Badge> :
                      <Badge dot status="" size="default">
                        <Avatar src={currentConv.avatar} />
                      </Badge>}
                      description={currentConv.username}
                />
                </div>
                <ul style={{overflowX: "hidden", overflowY: "scroll", height: "210px"}}>
                  {currentConvChat.filter(message=>(
                    (message.receiver === currentConv.username) || (message.sender === currentConv.username)
                  )).map((chat, i)=>(
                    <li key={i}>{chat.message}</li>
                  ))}
                  <div ></div>
                </ul>
                <form onSubmit={e=>sendMessage(e)}>
                  <div className="chatInput">
                    <Input placeholder="write a message..." className="chat" value={message} onChange={e=>setMessage(e.target.value)}/>
                  </div>
                </form>
              </>
              :
              <p>Please select a friend...</p>
              }
            </TabPane>
          </Tabs>
        </div>
      )}
    </>
  );
}

export default PrivateChat;
