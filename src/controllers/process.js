const sendmail = require("../lib/sendmail");
const getTpl = require("../lib/template");

module.exports = {
  contact: function (req, res) {
    const { name, email, comments, phone = "--" } = req.body;

    if (!name || !email || !comments) {
      return res
        .status("400")
        .json({ status: false, message: "Datos invalidos" });
    }
    // TODO: create template to send lead and stablish a email to leads
    const tpl = getTpl("lead", {
      name,
      email,
      comments,
      phone: phone ? phone : "--",
    });

    if (tpl) {
      sendmail({
        to: "ventas@iqissmexico.com.mx",
        subject: "Nuevo lead generado en website",
        html: tpl,
      });

      return res.json({ status: true, message: "OK" });
    }

    return res.json({ status: false, message: "No pudimos enviar el email" });
  },
};
