import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (to: string, subject: string, html: string) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.ethereal.email",
    port: (process.env.MAIL_PORT && parseInt(process.env.MAIL_PORT)) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER || "qz2jwaj7vrx5cpf7@ethereal.email", // generated ethereal user
      pass: process.env.MAIL_PASSWORD || "SweuugcKUXnJcrPKmh", // generated ethereal password
    },
  });

  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER || '"Fred Foo 👻" <foo@example.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      // text: "Hello world?", // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
  }
};
