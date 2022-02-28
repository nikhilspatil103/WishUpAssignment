const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestParams = function (requestParams) {
    return Object.keys(requestParams).length > 0
}



const validString = function (value) {
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}





module.exports = {
    isValid,
    isValidRequestParams,
    validString,
   
}