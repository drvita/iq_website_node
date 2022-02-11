const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const csrfMiddleware = csrf({ cookie: true });
const router = express.Router();

// Middellwares
router.use(cookieParser());
// router.use(csrfMiddleware);
router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ limit: "50mb", extended: false }));
// Error by token
router.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    console.log("[Server] Error when validate token csrf:", err.message);
    console.log("[Server] token csrf:", req.cookie);
    return res.status(403).json("Unauthorized");
  }

  return next(err);
});
// Add token
router.all("*", (req, res, next) => {
  // res.cookie("XSRF-TOKEN", req.csrfToken(), {
  //   sameSite: "none",
  //   secure: false,
  // });

  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log("[SERVER] connection:", req.method, fullUrl);

  return next();
});

// Routes
router.get("/", require("../controllers/main"));
router.use("/views", require("./landing")(express));
router.use("/process", require("./process")(express));
router.use("*", require("./404"));

module.exports = router;
