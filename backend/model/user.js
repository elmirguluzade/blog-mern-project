const mongoose = require('mongoose')
// const validator = require("validator");
const crypto = require('crypto')
const bcrypt = require("bcryptjs");
const GlobalError = require('../error/GlobalError')


const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        // validate: validator.isEmail,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
        // validate: {
        //     validator: function (el) {return el === this.password},
        //     message: "Passwords are not same"
        // }
    },
    resetToken: String
})

userSchema.pre('save', async function (next) {
    this.confirmPassword = undefined;
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new GlobalError('Email need unique', 403));
    }
  });

userSchema.methods.checkPasswords = async function(pass) {
    return await bcrypt.compare(pass, this.password)
}

userSchema.methods.hashResetPassword = async function () {
    const resetPassword = crypto.randomBytes(12).toString("hex");
    const hashedPassword = crypto.createHash("md5").update(resetPassword).digest("hex");
    this.resetToken = hashedPassword;
    return resetPassword;
  };

const User = mongoose.model('user', userSchema)
module.exports = User
