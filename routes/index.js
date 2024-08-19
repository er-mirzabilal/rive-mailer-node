var express = require("express");
const {
  homePage,
  signupUser,
  removeUser,
  resendEmail,
  verifyEmail,
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

router.get('/verify-email', verifyEmail );

router.get("/", homePage);

module.exports = router;
