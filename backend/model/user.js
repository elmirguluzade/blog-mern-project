const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    confirmPassword: {
        type: String,
        required: [true, "Please provide confirm password"],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords are not same"
        }
    }
})

userSchema.pre('save', async function (next) {
    this.confirmPassword = undefined;
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.checkPasswords = async function(pass) {
    return await bcrypt.compare(pass, this.password)
}

const User = mongoose.model('user', userSchema)
module.exports = User










// userSchema.methods.checkPasswords = async function (originalPassword) {
//     console.log(originalPassword);
  
//     return await bcrypt.compare(originalPassword, this.password);
//   };
  
//   userSchema.methods.hashResetPassword = async function () {
//     const resetPassword = crypto.randomBytes(12).toString("hex");
  
//     const hashedPassword = crypto
//       .createHash("sha256")
//       .update(resetPassword)
//       .digest("hex");
  
//     this.resetToken = hashedPassword;
//     this.resetTime = Date.now() + 15 * 60 * 1000;
  
//     console.log({ resetPassword, hashedPassword });
  
//     return resetPassword;
//   };