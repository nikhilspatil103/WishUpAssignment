const mongoose=require('mongoose')

const subscriptionSchema =new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    planId:{
        type:String,
        required:true,

    },
    startDate:{
        type:String,
        required:true
    }
},{ timestamps: true })

module.exports=mongoose.model('subscription',subscriptionSchema)