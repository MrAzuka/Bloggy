require("dotenv").config();
const { connect } = require("mongoose");

let mongoURI;
if (process.env.NODE_ENV === "development") {
  mongoURI = process.env.MONGO_URI_DEV;
}
if (process.env.NODE_ENV === "test") {
  mongoURI = process.env.MONGO_URI_TEST;
}
if (process.env.NODE_ENV === "production") {
  mongoURI = process.env.MONGO_URI_PROD;
}

exports.connectToDB = async () => {
  try {
    await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connection Successful!");
  } catch (err) {
    console.log("DB Connection not successful!", err);
    //process.exit(1);
  }
};
