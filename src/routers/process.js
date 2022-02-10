module.exports = function (express) {
  const router = express.Router();
  const controller = require("../controllers/process");

  router.post("/contact", controller.contact);

  return router;
};
