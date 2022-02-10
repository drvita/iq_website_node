require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  emailConfig: {
    mailServer: process.env.SMTP_SERVER,
    mailPort: process.env.SMTP_PORT,
    mailSecure: process.env.SMTP_SECURE,
    userMailAuth: process.env.SMTP_USER,
    passMailAuth: process.env.SMTP_PASS,
  },
};
