var express = require("express");
const {
  homePage,
  signupUser,
  removeUser,
  resendEmail,
} = require("../controllers/guest.js");
const { validateRequiredProps } = require("../middlewares/validator.js");
const { requiredProps } = require("../utils/constant.js");
var router = express.Router();

router.post("/signup", validateRequiredProps(requiredProps.SIGNUP), signupUser);
router.delete(
  "/remove-record/:email",
  validateRequiredProps(requiredProps.REMOVE),
  removeUser
);
router.put(
  "/resend-email",
  validateRequiredProps(requiredProps.RESEND),
  resendEmail
);
router.get("/", homePage);

module.exports = router;
