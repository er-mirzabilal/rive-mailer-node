const EmailValidator = require("../services/emailVerifier.js");
const UserService = require("../services/user.js");
const jwt = require('jsonwebtoken');
const {
  sendEmailVerifyAlert,
  isEmailAlreadyUsed,
} = require("../utils/common.js");
const { handleResponse, handleError } = require("../utils/responses.js");

exports.signupUser = async (req, res) => {
  const data = { ...req.body };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    //validate Email
    if (!emailRegex.test(data?.email)) {
      throw new Error(
        "Invalid Formatted Email; please check the entry and try again."
      );
    }
    // verify email
    const emailValidated = await EmailValidator.verifyEmail(data?.email);
    if (emailValidated !== "valid") {
      throw new Error(
        "Email Lookup and Verification Failed. Please enter a valid e-mail address that can be verified."
      );
    }

    const recordFound = await isEmailAlreadyUsed(data?.email);
    if (recordFound && recordFound.isEmailVerified) {
      handleResponse(
        res,
        200,
        "Email Already Found!  Do you wish to remove your email from our mailing list system?",
        { status: "email-found-and-verified" }
      );
      return;
    }
    if (recordFound && !recordFound.isEmailVerified) {
      handleResponse(
        res,
        200,
        "Email Already Found But Not Verified!  Do you wish to resend the verification request or remove your email from our system?",
        { status: "email-found-and-not-verified" }
      );
      return;
    }

    await UserService.create(data);
    await sendEmailVerifyAlert(data.email);
    handleResponse(
      res,
      200,
      "Thank you for your Submission; please check your email to Verify your Registration.",
      { status: "record-save" }
    );
  } catch (err) {
    handleError(res, err);
  }
};

exports.removeUser = async (req, res) => {
  const { email } = req.params;
  try {
    await UserService.delete({ where: { email: email } });
    handleResponse(res, 200, "User removed successfully!");
  } catch (err) {
    handleError(res, err);
  }
};

exports.resendEmail = async (req, res) => {
  const data = { ...req.body };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    //validate Email
    if (!emailRegex.test(data?.email)) {
      throw new Error(
        "Invalid Formatted Email; please check the entry and try again."
      );
    }
    await sendEmailVerifyAlert(data?.email);
    handleResponse(res, 200, "Email resend successfully!");
  } catch (err) {
    handleError(res, err);
  }
};
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await UserService.findBy({email: decoded.email});
    if(user.isEmailVerified && user.verifiedAt !== null){
      return handleError(res, { message: 'Email Already Verified: ' + decoded.email, statusCode: 409 })
    }
    
    // Mark the user as verified in the database here
    await UserService.update({isEmailVerified: true , verifiedAt: new Date()} , { where: { email: decoded.email } });

    handleResponse(res, 200, 'Email verified successfully ' +  decoded.email );
    // res.status(200).json({ message: 'Email verified successfully', email: decoded.email });
  } catch (err) {
    console.log(err.message);
    handleError(res, { message: 'Invalid or expired token', statusCode: 400 })
  }
}

exports.homePage = async (req, res) => {
  handleResponse(res, 200, "Rive app backend api working!");
};
