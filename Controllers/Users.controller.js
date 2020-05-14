const ObjectId = require('mongodb').ObjectID;
const dataBase = require('../config/db')
const dbname = 'chat-app';
const collname = 'users';

const getUsers = (req,res) => {
    dataBase.connect((err) => {
        const db = dataBase.db(dbname);
        const collection = db.collection(collname);
        if(err) {
            res.send({error:408, message:'Request timeout'})
            return
        }
        collection.find({}).toArray((err, data) => {
            if(err) {
                res.send({error:408, message:'Request timeout'})
                return
            }
            res.send({status:200, data:data[0]})
            return
        })
    })
}

const getUsersSession = (req,res) => {
    dataBase.connect((err) => {
        const db = dataBase.db(dbname);
        const collection = db.collection('sessions');
        if(err) {
            res.send({error:408, message:'Request timeout'})
            return
        }
        const obj = {_id:ObjectId(req.params.id)}
        collection.find(obj).toArray((err, data) => {
            if(err) {
                res.send({error:408, message:'Request timeout'})
                return
            }
            res.send({status:200, data})
            return
        })
    })
}

const userLogin = (req,res) => {
    dataBase.connect((err) => {
        const db = dataBase.db(dbname);
        const collection = db.collection(collname);
        if(err) {
            res.send({error:408, message:'Request timeout'})
            return
        }
        collection.find(req.body).toArray((error, data) => {
            if(data.length < 1) {
                res.send({status:401,error, message:'Unauthorized login'})
                return
            }
            if(err) {
                res.send({error:408, message:'Request timeout'})
                return
            }
            createSession(data[0],res)
            return
        })
    })
}
const userLogout = (req, res) => {
    dataBase.connect((err) => {
        const db = dataBase.db(dbname);
        const collection = db.collection('sessions');
        if(err) {
            res.send({error:408, message:'Request timeout'})
            return
        }
        collection.remove({_id:ObjectId(req.params.id)},{justOne:true},(err, result) => {
            if(err) {
                res.send({status:401,err, result})
                return
            }
            res.send({status:200, message:'Session destroyed'})
            return
        })
    })
}

const createSession = (user,res) => {
    dataBase.connect((err) => {
        const db = dataBase.db(dbname);
        const collection = db.collection('sessions');
        if(err) {
            res.send({error:408, message:'Request timeout'})
            return
        }
        collection.insertOne({user},(err, result) => {
            res.send({status:200, ...result.ops[0]})
        })
    })
}


module.exports = {
    getUsers,
    getUsersSession,
    userLogin,
    userLogout
}

