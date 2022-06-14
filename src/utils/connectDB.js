const mongoose =  require('mongoose')

exports.connectToDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Database Connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}