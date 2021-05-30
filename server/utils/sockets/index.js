let onlineUsers = []

function getUsersByRoom(room){
    return onlineUsers.filter(user=>user.room === room)
}

function getUsers(){
    console.log(onlineUsers.length)
    return onlineUsers
}

function getUsersWithoutMe(id){
    return onlineUsers.filter(user=>user.id !== id)
}

function userConnected(user){
    onlineUsers.push(user)
    return user
}

function changeRoom(id, room, roomName){
    const newUsers = onlineUsers.map(user=>{
        if(user.id === id){
            return {...user, room, roomName}
        }
    })
    onlineUsers = newUsers
}

function checkIfAlreadyOnline(id){
    console.log("online users: ", onlineUsers)
    console.log("users: ", onlineUsers.filter(user=>id === user.id))
    if(onlineUsers.filter(user=>id === user.id).length){
        console.log('check me')
        return true
    }
    return false
}

function userDisconnected(id){
    onlineUsers = onlineUsers.filter(user=>user.id!==id)
}

module.exports = {getUsers, getUsersByRoom, userConnected, userDisconnected, changeRoom, checkIfAlreadyOnline, getUsersWithoutMe}
