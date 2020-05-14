const ObjectId = require('mongodb').ObjectID;
const dataBase = require('../config/db')
const dbname = 'chat-app';
const collname = 'messages';

const getMessage = (req,res) => {
    dataBase.connect((err) => {
        const db = dataBase.db(dbname);
        const collection = db.collection(collname);
        if(err) {
            res.send({error:408, message:'Request timeout'})
            return
        }
        //predefind chat id for now
        const obj = {_id:ObjectId(req.params.id)}
        collection.find(obj).toArray((err, data) => {
            if(err) {
                res.send({error:408, message:'Request timeout'})
                return
            }
            res.send({status:200, data:data[0]})
            return
        })
    })
}
const getRoomMessage = (req,res) => {
    dataBase.connect((err) => {
        const db = dataBase.db(dbname);
        const roomCollection = db.collection('chat_rooms');
        const messageCollection = db.collection('messages');
        const userCollection = db.collection('users');
        if(err) {
            res.send({error:408, message:'Request timeout'})
            return
        }
        //predefind chat id for now
        const obj = {_id:ObjectId('5ebd0e86ce15cb0e57794b10')}
        roomCollection.find(obj).toArray((err, data) => {
            if(err) {
                res.send({error:408, message:'Request timeout'})
                return
            }
            const roomData = data[0].messages.map(msg => ObjectId(msg))
            messageCollection.find({_id:{"$in":roomData}}).toArray((err, messages) => {
                if(err) {
                    res.send({error:408, message:'Request timeout'})
                    return
                }
                res.send({status:200, data: {...data[0],messages}})
            })
        })
    })
}

module.exports = {
    getMessage,
    getRoomMessage
}

