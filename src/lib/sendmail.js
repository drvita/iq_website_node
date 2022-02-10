const nodemailer = require("nodemailer");
const { emailConfig: config } = require("../configs");
//const mailTemplates = require("../../mailTemplates.js");
const mailTransport = nodemailer.createTransport({
  host: config.mailServer,
  port: config.mailPort,
  secureConnection: config.mailSecure,
  auth: {
    user: config.userMailAuth,
    pass: config.passMailAuth,
  },
});

module.exports = function sendEmail(data) {
  return new Promise(async (resolve, reject) => {
    // const mailHTML = await mailTemplates[data.name](data);
    // if (!mailHTML) {
    //   console.error("[SendMail][ERROR] no template found");
    //   return reject({ code: 500, message: "Error in get file email template" });
    // }
    const attachments = data.attachments ?? [];
    const mailOptions = {
      from: `IQISSMexico <${config.userMailAuth}>`,
      to: data.to,
      html: data.html,
      subject: data.subject,
      attachments,
    };

    mailTransport
      .sendMail(mailOptions)
      .then((data) => {
        console.log("[SendMail] Email sent: ", data.messageId);
        return resolve(data);
      })
      .catch((error) => {
        console.error("[SendMail][ERROR] ", error.message);
        return reject({ code: 500, error });
      });
  });
};
