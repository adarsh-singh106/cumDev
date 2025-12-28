const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Transporter create karo (Gmail example)
  // Real project me SendGrid ya Mailgun use hota hai, par testing ke liye Gmail thik hai
  const transporter = nodemailer.createTransport({
    service: "gmail", // ya host: 'smtp.mailtrap.io'
    auth: {
      user: process.env.EMAIL_USER, // Apni email ID env me rakho
      pass: process.env.EMAIL_PASS, // App Password (not normal password)
    },
  });

  // 2. Email options define karo
  const mailOptions = {
    from: process.env.EMAIL_FROM, // "MyApp <noreply@myapp.com>"
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html (agar fancy email bhejna ho)
  };

  // 3. Send karo
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
