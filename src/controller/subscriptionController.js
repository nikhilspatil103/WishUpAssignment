const userModel = require('../model/userModel')
const subscriptionModel = require('../model/subscriptionModel')
const validator = require('../utils/validate')
const plan = require('../utils/plans')



//Subscription API


// bySubscription API
const buySubscription = async function (req, res) {
    try {
        const requestBody = req.body

        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide user Detaills" })
        }

        //destruturing
        const { userName, planId, startDate } = requestBody

        //Validation Starts
        if (!validator.isValid(userName)) {
            return res.status(400).send({ status: false, message: "userName Required" })
        }

        if (!validator.isValid(planId)) {
            return res.status(400).send({ status: false, message: "Plan Required" })
        }

        if (!validator.isValidPlanId(planId)) {
            return res.status(400).send({ status: false, message: "Please select valid planId" })
        }

        if (!validator.isValid(startDate)) {
            return res.status(400).send({ status: false, message: "startDate Required" })
        }

        if (!validator.isValidStartDate(startDate)) {
            return res.status(400).send({ status: false, message: "Please provide valid  date" })
        }
        //Validation Ends

        const findUser = await userModel.findOne({ userName: userName })

        if (!findUser) {
            return res.status(404).send({ status: false, message: `${userName} not present` })
        }

        await subscriptionModel.create(requestBody)                                // store in DB

        const planIndex = plan.enumPlanId.indexOf(planId)                          //index of planId
        const amount = plan.enumPlanCost[planIndex]                               // ammout correcponding to PlanId

        return res.status(200).send({ status: 'SUCCESS', amount: amount })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

//!--------------------------------------------------------------------------------------

//getSubcriptionByDate API
// to calculate days basic logic is to substract subscription end date with param date (in milliseconds)

const getSubcriptionByDate = async function (req, res) {
    try {
        const requestParams = req.params

        //destruturing
        const { userName, date } = requestParams

        //Validation Starts
        if (!validator.isValidRequestParams(userName)) {
            return res.status(400).send({ status: false, message: "provide userName" })
        }

        if (!validator.isValidRequestParams(date)) {
            return res.status(400).send({ status: false, message: "provide date" })
        }
        //Validation end


        const findUser = await userModel.findOne({ userName: userName })

        if (!findUser) {
            return res.status(404).send({ status: false, message: `${userName} not present` })
        }

        const findSub = await subscriptionModel.find({ userName: userName })

        if (findSub.length === 0) {
            return res.status(404).send({ status: false, message: `No active subcription for  ${userName} ` })
        }

        const newDate = new Date(`${date} 00:00:00`);
        const dateFromParams = newDate.getTime()                 //converting date from params  to milliseconds


        const validSub = []                                                //will push all valid Subcription

        for (let i in findSub) {
            if (findSub[i].planId === 'FREE') {

                const obj = {
                    planId: findSub[i].planId,
                    daysLeft: 'infinite'
                }
                validSub.push(obj)
            }
            const strDate = findSub[i].startDate                             //start Date

            const newDate = new Date(`${strDate} 00:00:00`);
            const strDateInMilli = newDate.getTime();                         //conver start Date to milliseconds

            const planIndex = plan.enumPlanId.indexOf(findSub[i].planId)     // index of planId from plan array
            const days = plan.enumPlanValidity[planIndex]                    // valid days


            const validTill = (days * 24 * 60 * 60 * 1000) + strDateInMilli   // find valid date in milliseconds
            const timeDiff = validTill - dateFromParams

            if (timeDiff <= 0) {
                const obj = {
                    planId: findSub[i].planId,
                    daysLeft: 0
                }
                validSub.push(obj)
            }
            if (timeDiff > 0) {
                const daysLeft = timeDiff / (1000 * 60 * 60 * 24)
                const obj = {
                    planId: findSub[i].planId,
                    daysLeft: daysLeft
                }
                validSub.push(obj)
            }
        }

        if (validSub.length === 0) {
            return res.status(404).send({ status: false, message: `No active subcription for  ${userName} ` })
        }

        return res.status(200).send({ status: true, data: validSub })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

//!----------------------------------------------------------------------------------------------------------------


//getSubcription API

const getSubcription = async function (req, res) {
    try {
        const requestParams = req.params


        const { userName } = requestParams

        if (!validator.isValidRequestParams(userName)) {
            return res.status(400).send({ status: false, message: "provide userName" })
        }


        const findUser = await userModel.findOne({ userName: userName })

        if (!findUser) {
            return res.status(404).send({ status: false, message: `${userName} not present` })
        }

        const findSub = await subscriptionModel.find({ userName: userName })

        if (findSub.length === 0) {
            return res.status(404).send({ status: false, message: `No active subcription for  ${userName} ` })
        }

        const validSub = []                                                //will push all valid Subcription

        for (let i = 0; i < findSub.length; i++) {
            if (findSub[i].planId === 'FREE') {

                const obj = {
                    planId: findSub[i].planId,
                    startDate: findSub[i].startDate,
                    validTill: 'infinite'
                }
                validSub.push(obj)
            } else {
                const strDate = findSub[i].startDate                           //start Date

                const newDate = new Date(`${strDate} 00:00:00`);
                const strDateInMilli = newDate.getTime();                       //conver start Date to milliseconds


                const planIndex = plan.enumPlanId.indexOf(findSub[i].planId)    // index of planId from plan array
                const days = plan.enumPlanValidity[planIndex]                    // valid days

                const validTill = (days * 24 * 60 * 60 * 1000) + strDateInMilli  // find valid date in milliseconds



                const validDate = new Date(validTill).toLocaleDateString()
                const arr = validDate.split('/')                               //split and  convert to required date format

                const obj = {
                    planId: findSub[i].planId,
                    startDate: findSub[i].startDate,
                    validTill: `${arr[2]}-${arr[1]}-${arr[0]}`
                }
                validSub.push(obj)
            }
        }

        if (validSub.length === 0) {
            return res.status(404).send({ status: false, message: `No active subcription for  ${userName} ` })
        }

        return res.status(200).send({ status: true, data: validSub })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}


module.exports = {
    buySubscription,
    getSubcriptionByDate,
    getSubcription
}