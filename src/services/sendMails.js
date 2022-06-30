require("dotenv").config();
const nodemailer = require("nodemailer");
const { GOOGLE_ACCOUNT_EMAIL, GOOGLE_ACCOUNT_PASSWORD } = process.env;

exports.forgetPasswordMail = async (req, token) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "gmail",
      auth: {
        user: GOOGLE_ACCOUNT_EMAIL, // generated ethereal user
        pass: GOOGLE_ACCOUNT_PASSWORD, // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: `"Bloggy your buddy 👻" ${GOOGLE_ACCOUNT_EMAIL}`,
      to: req.body.email,
      subject: "Password RESET",
      text: `Follow this link to reset your password. It expires in 15minutes. \n\n
         http://${req.headers.host}/reset/${token}`,
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
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  console.log("past transporter");

  let mailOptions = {
    from: `"Bloggy your buddy 👻" ${GOOGLE_ACCOUNT_EMAIL}`,
    to: req.body.email,
    subject: "Welcome to Bloggy",
    text: `Welcome to Bloggy, ${username}. \n We are happy to have you.`,
  };
  console.log("past mail option");

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
  console.log("past send mail");

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("past testacc");
  // // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   // host: "gmail",
  //   // port: 587,
  //   // secure: false, // true for 465, false for other ports
  //   host: process.env.EMAIL_HOST,
  //   service: "gmail",
  //   port: 587,
  //   auth: {
  //     user: GOOGLE_ACCOUNT_EMAIL, // generated ethereal user
  //     pass: GOOGLE_ACCOUNT_PASSWORD, // generated ethereal password
  //   },
  // });
  // console.log("past transporter");

  // await transporter.sendMail({
  //   from: `"Bloggy your buddy 👻" ${testAccount.user}`,
  //   to: req.body.email,
  //   subject: "Welcome to Bloggy",
  //   text: `Welcome to Bloggy, ${username}. \n We are happy to have you.`,
  // });

  // console.log("past sendMail");
};
