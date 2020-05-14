const ObjectId = require('mongodb').ObjectID;
const dataBase = require('../config/db')
const dbname = 'chat-app';
const collname = 'chat_rooms';

const getRoom = (req,res) => {
    dataBase.connect((err) => {
        const db = dataBase.db(dbname);
        const collection = db.collection(collname);
        if(err) {
            res.send({error:408, message:'Request timeout'})
            return
        }
        //predefind chat id for now
        const obj = {_id:ObjectId('5ebd0e86ce15cb0e57794b10')}
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


module.exports = {
    getRoom,
}

