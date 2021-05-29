const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    surname:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:4,
    },
});
const User = mongoose.model('users',userSchema);
module.exports = User;