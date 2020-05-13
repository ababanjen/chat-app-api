const express = require('express')
const router = express.Router();
const user = require('../user')

router.get('/login',(req,res) => {
	const payload = {
		...req.query,
		room:'chat'
	}
	res.send(user.login(payload))
})

module.exports = router