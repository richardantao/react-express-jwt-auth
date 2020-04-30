const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/auth");
const controller = require("../controllers/auth");

router.post("/users", validation.register, controller.register);

router.get("/users", auth, controller.user);

router.delete("/users", auth, controller.terminate);

router.post("/users/access-token", validation.login, controller.login);

router.delete("/users/access-token", auth, controller.logout);

module.exports = router;