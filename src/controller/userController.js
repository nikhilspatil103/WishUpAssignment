const userModel = require('../model/userModel')

const validator = require('../validator/validate')

const registorUser = async function (req, res) {
    try {
        const userName = req.params.userName

        let findUser = await userModel.findOne({ userName: userName })

        if (findUser) {
            return res.status(400).send({ status: false, message: `${userName} is alredy Registor` })
        }
        let userData = await userModel.create({ userName: userName })
        return res.status(201).send({ status: true, data: userData })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}


const getUser = async function (req, res) {
    const userName = req.params.userName

    let findUser = await userModel.findOne({ userName: userName })

    if (!findUser) {
        return res.status(404).send({ status: false, message: `${userName} not Registor` })
    }

    return res.status(200).send({status:true,data:findUser})
}


module.exports = {
    registorUser,
    getUser
}