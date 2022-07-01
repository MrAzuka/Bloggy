require("dotenv").config();
const nodemailer = require("nodemailer");
const {
  GOOGLE_ACCOUNT_EMAIL,
  GOOGLE_ACCOUNT_PASSWORD,
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN
} = process.env;

exports.forgetPasswordMail = async (req, token) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GOOGLE_ACCOUNT_EMAIL,
        pass: GOOGLE_ACCOUNT_PASSWORD,
        clientId: OAUTH_CLIENTID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
      },
    });

    let mailOptions = {
      from: `"Bloggy your buddy 👻" ${GOOGLE_ACCOUNT_EMAIL}`,
      to: req.body.email,
      subject: "Password RESET",
      text: `Follow this link to reset your password. It expires in 15minutes. \n\n
         http://${req.headers.host}/reset/${token}`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });

  } catch (err) {
    console.log("forgetPasswordMail: ", err);
  }
};

exports.welcomeToBloggyMail = async (req, username) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: GOOGLE_ACCOUNT_EMAIL,
      pass: GOOGLE_ACCOUNT_PASSWORD,
      clientId: OAUTH_CLIENTID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN,
    },
  });

  let mailOptions = {
    from: `"Bloggy your buddy 👻" ${GOOGLE_ACCOUNT_EMAIL}`,
    to: req.body.email,
    subject: "Welcome to Bloggy",
    text: `Welcome to Bloggy, ${username}. \n We are happy to have you.`,
  };


  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });

};