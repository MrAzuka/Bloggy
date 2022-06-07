const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Please provide a username'],
        minlength: [3, 'Username should be at least 3 characters'],
        maxlength: [20, 'Username should be at most 20 characters']
    },
    email: {
        type: String,
        unique: [true, 'Please provide an email'],
        required: true,
        lowercase: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, {timestamps:true,})

userSchema.pre('save', async function () {
    if (this.password == null) {
        this.password = null
    } else {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

userSchema.methods.comparePassword = async function (inputPassword) {
    let isMatch
    if (this.password == null) {
        isMatch = false
        return isMatch
    }
    isMatch = await bcrypt.compare(inputPassword, this.password)
    return isMatch
}

module.exports = model("User", userSchema)