let onlineUsers = []

function getUsersByRoom(room){
    return onlineUsers.filter(user=>user.room === room)
}

function getUsers(){
    return onlineUsers
}

function userConnected(id, username, room){
    const user = {id, username, room}
    onlineUsers.push(user)
    return user
}

function userDisconnected(username){
    onlineUsers = onlineUsers.filter(user=>user.username!==username)
}

module.exports = {getUsers, getUsersByRoom, userConnected, userDisconnected}
