const {
    Schema,
    model
} = require('mongoose')
const bcrypt = require('bcryptjs')

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

authorSchema.pre('save', async function (next) {
    //If password is not modified then skip
    if (!this.isModified('password')) {
      return next();
    }
  
    //if password is modified then change hash the password and save it.
    //also remove the passwordConfirm.
  
    //hash the password
    this.password = await bcrypt.hash(this.password, 12);
  
    next();
  });



module.exports = model("Author", authorSchema)