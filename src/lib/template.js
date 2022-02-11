const fs = require("fs");
const path = require("path");

module.exports = function (tplName, data) {
  if (
    !data ||
    typeof data !== "object" ||
    !Object.keys(data).length ||
    !tplName
  )
    return null;

  try {
    let tpl = fs.readFileSync(
      path.join(__dirname, `../views/emails/${tplName}.html`),
      "utf8"
    );
    const KEYS = Object.keys(data);

    for (let i = 0; i < KEYS.length; i++) {
      const ele = KEYS[i];
      const patter = new RegExp(`{{${ele}}}`, "gi");

      tpl = tpl.replace(patter, data[ele]);
    }

    return tpl;
  } catch (err) {
    console.error("[Server][Error] when create template:", err.message);
    console.error("[Server][Error] data:", tplName, data);
    return null;
  }
};
