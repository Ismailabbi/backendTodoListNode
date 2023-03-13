require('dotenv').config()
const expressJwt = require('express-jwt')
module.exports.requireSignIn = expressJwt.expressjwt({
    secret:process.env.secrect_jwt,
    algorithms :["HS256"],
    userProperty :'auth'
})