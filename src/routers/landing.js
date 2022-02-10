module.exports = function (express) {
  const router = express.Router();
  const controller = require("../controllers/landing");

  router.get("/website", controller.website);
  router.get("/contact", controller.contact);

  return router;
};
