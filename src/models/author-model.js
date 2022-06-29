const {
    Schema,
    model
} = require('mongoose')


const authorSchema = new Schema({
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
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        default: null,
    },

    tokenExpiryTime: {
        type: Date,
        default: null,
    },
    role: {
        type: String,
        enum: ["admin", "author"],
        default: "author"
    }
}, {
    timestamps: true,
})




module.exports = model("Author", authorSchema)