const users = []//fake db

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}`
}

const login = ({name,password,room}) => {
    name = name.toLowerCase();
    password = password.toLowerCase();
    const existingUser = users.find(u => {
        u.name = u.name.toLowerCase()
        u.password = u.password.toLowerCase()
        if(u.name === name && u.password === password){
            return u
        }
    })
    if(!existingUser) {
        return {error: 'User not found'}
    }
    return existingUser
}
const addUser =({id,name,password,room='chat'}) =>{
    name = name.toLowerCase();
    room = room.toLowerCase();
    const existingUser = users.find(u => Object.is(u,{id,name,room,password}))
    if(existingUser) {
        return {existingUser}
    }
    name = capitalize(name)
    const user = {id, name, room, password}
    users.push(user)
    return {user}
}

const removeUser =(id) =>{
    const idx = users.findIndex(user => user.id === id)
    if(idx !== -1) {
        return users.splice(idx,1)[0]
    }
}

const getUser =(id) => users.find(user => user.id === id)

const getUserRoom =(room) => users.find(user => user.room === room)

module.exports = {
    login,
    addUser,
    removeUser,
    getUser,
    getUserRoom
}