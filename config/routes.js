const express = require('express')
const router = express.Router();
const userController = require('../Controllers/Users.controller')
const chatRoomsController = require('../Controllers/ChatRooms.controllers')
const messageController = require('../Controllers/Messages.controllers')
const user = require('../user')


router.get('/users',userController.getUsers)
router.get('/session/:id',userController.getUsersSession)
router.post('/login',userController.userLogin)
router.delete('/logout/:id',userController.userLogout)

router.get('/room/:id',chatRoomsController.getRoom)

router.get('/message/:id',messageController.getMessage)
router.get('/room/messages/:id',messageController.getRoomMessage)

module.exports = router