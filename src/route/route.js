const express = require('express')

const router = express.Router()

const userController=require('../controller/userController')


// User API
router.put('/user/:userName', userController.registorUser)
router.get('/user/:userName', userController.getUser)

//Subscription API



module.exports = router