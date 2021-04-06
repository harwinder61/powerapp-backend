import { createTransport } from "nodemailer";

const {
  SMTP_HOST = "smtp.gmail.com",
  SMTP_PORT = "465",
  SMTP_USER = "noreplyconsentia@gmail.com",
  SMTP_PASSWORD = "P@ssw0rd!1234",
} = process.env;

// create reusable transporter object using the default SMTP transport
const transporter = createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export default transporter;
