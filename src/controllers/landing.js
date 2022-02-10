module.exports = {
  website: function (req, res) {
    res.render("pages/lan_websites");
  },
  contact: function (req, res) {
    // TODO: quit contact in bar when be in contact view
    res.render("pages/contact");
  },
};
