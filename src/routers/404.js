module.exports = function (req, res, next) {
  res.status(404);
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log("[SERVER] 404:", req.method, fullUrl);

  // respond with html page
  if (req.accepts("html")) {
    res.status(404).render("pages/404");
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.status(404).type("txt").send("Not found");
};
