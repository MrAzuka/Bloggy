require('dotenv').config()
const {connect} =  require('mongoose')

exports.connectToDB = async ()=> {
    try {
        await connect(process.env.MONGO_URI_TEST_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database Connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}