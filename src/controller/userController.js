const userModel = require('../model/userModel')

const validator = require('../utils/validate')



//User API


//Registor API
const registorUser = async function (req, res) {
    try {
        const userName = req.params.userName

        const findUser = await userModel.findOne({ userName: userName })

        if (findUser) {
            return res.status(400).send({ status: false, message: `${userName} is alredy Registor` })  //find user in DB if Alreday Registor
        }

        const userData = await userModel.create({ userName: userName })

        return res.status(201).send({ status: true, data: userData })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

//!--------------------

//getUser API
const getUser = async function (req, res) {
    try {
        const userName = req.params.userName

        const findUser = await userModel.findOne({ userName: userName })

        if (!findUser) {                                                               //find user in DB present or not
            return res.status(404).send({ status: false, message: `${userName} not Registor` })
        }

        return res.status(200).send({ status: true, data: findUser })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}


module.exports = {
    registorUser,
    getUser
}