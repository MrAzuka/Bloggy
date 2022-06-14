const {Schema, model, Types} = require('mongoose')

const articleSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please provide a the title']
    },
    article: {
        type: String,
        required: [true, "The article cannot be empty"]
    },
    tag: {
        type: String
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide user"]
    }
}, {timestamps:true,})



module.exports = model("Article", articleSchema)