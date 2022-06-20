require('dotenv').config()
const nodemailer = require('nodemailer')


exports.forgetPasswordMail = async (req, token) => {

     // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  
    await transporter.sendMail({
        from: `"Bloggy your buddy 👻" ${testAccount.user}`,
        to: req.body.email,
        subject: "Password RESET",
        text: `Follow this link to reset your password. It expires in 15minutes. \n\n
         http://${req.headers.host}/reset/${token}`,
    });
}
