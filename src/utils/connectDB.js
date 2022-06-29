require('dotenv').config()
const {
    connect
} = require('mongoose')

const MONGO_URL = process.env.MONGO_URI_TEST_DB;
exports.connectToDB = async () => {
  try {
    await connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connection Successful!');
  } catch (err) {
    console.log('DB Connection not successful!', err);
    //process.exit(1);
  }
};