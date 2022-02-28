const express = require('express')

const router = express.Router()

const userController=require('../controller/userController')
const subscriptionController=require('../controller/subscriptionController')

// User API
router.put('/user/:userName', userController.registorUser)
router.get('/user/:userName', userController.getUser)

//Subscription API

router.post('/subscription',subscriptionController.buySubscription )
router.get('/sunscription/:userName/:date', subscriptionController.getSubcriptionByDate)
router.get('/sunscription/:userName', subscriptionController.getSubcription)

module.exports = router