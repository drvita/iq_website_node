const sendmail = require("../lib/sendmail");

module.exports = {
  contact: async function (req, res) {
    const { name, email, comments } = req.body;

    if (!name || !email || !comments) {
      return res
        .status("400")
        .json({ status: false, message: "Datos invalidos" });
    }
    // TODO: create template to send lead and stablish a email to leads
    sendmail({ to: email, subject: "Nuevo lead", person: name });

    res.json({ data: [comments], status: true, message: "OK" });
  },
};
