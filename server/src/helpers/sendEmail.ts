import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

interface SendEmailProps {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

const hbsConfig = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.join(__dirname, "../templates/mail/"),
    layoutsDir: path.join(__dirname, "../templates/mail/"),
    defaultLayout: "",
  },
  viewPath: path.join(__dirname, "../templates/mail/"),
  extName: ".hbs",
};

export const sendEmail = async ({
  to,
  subject,
  template,
  context,
}: SendEmailProps) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.ethereal.email",
    port: (process.env.MAIL_PORT && parseInt(process.env.MAIL_PORT)) || 587,
    secure:
      process.env.MAIL_PORT && parseInt(process.env.MAIL_PORT) === 465
        ? true
        : false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME || "qz2jwaj7vrx5cpf7@ethereal.email", // generated ethereal user
      pass: process.env.MAIL_PASSWORD || "SweuugcKUXnJcrPKmh", // generated ethereal password
    },
  });

  transporter.use("compile", hbs(hbsConfig));

  // send mail with defined transport object
  const email = {
    from: process.env.MAIL_USERNAME || '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    // text: "Hello world?", // plain text body
    template, // html body
    context,
  };
  try {
    let info = await transporter.sendMail(email);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
  }
};
