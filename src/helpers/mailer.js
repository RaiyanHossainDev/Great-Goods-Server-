const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "astralfog2@gmail.com",
    pass: "inrb nvln ajoy bzts",
  },
});

const mailer = async (email,subject,template) => {
  const info = await transporter.sendMail({
    from: "Voyager",
    to: email,
    subject: subject,
    text: "",
    html: template, // HTML body
  });

  console.log("Message sent:", info.messageId);
};

module.exports = mailer