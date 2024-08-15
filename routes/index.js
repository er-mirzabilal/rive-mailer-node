var express = require("express");
const { homePage, signupUser } = require("../controllers/guest.js");
const { validateRequiredProps } = require("../middlewares/validator.js");
const { requiredProps } = require("../utils/constant.js");
var router = express.Router();

router.post("/signup", validateRequiredProps(requiredProps.SIGNUP), signupUser);
router.get("/", homePage);

module.exports = router;
