module.exports = {
  website: function (req, res) {
    res.render("pages/lan_websites");
  },
  contact: function (req, res) {
    // TODO: quit contact in bar when be in contact view
    const csrfToken = req.cookies["XSRF-TOKEN"];
    res.render("pages/contact", { csrfToken });
  },
  socialNetowork: function (req, res) {
    res.render("pages/lan_socialnetwork");
  },
};
