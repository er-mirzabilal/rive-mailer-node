const UserService = require("../services/user.js");
const {
  sendEmailVerifyAlert,
  isEmailAlreadyUsed,
} = require("../utils/common.js");
const { handleResponse, handleError } = require("../utils/responses.js");

exports.signupUser = async (req, res) => {
  const data = { ...req.body };

  try {
    // validate email
    // const emailValidated = await MailgunService.validateEmail(data?.email);
    // if (emailValidated?.result !== "deliverable") {
    //   throw new Error("Email is not valid. Please enter a correct one.");
    // }

    const emailCheck = await isEmailAlreadyUsed(data?.email);
    if (emailCheck) {
      throw new Error(
        "Email already exist in system. Please try with new one."
      );
    }

    const user = await UserService.create(data);
    await sendEmailVerifyAlert(data.email);
    handleResponse(
      res,
      200,
      "User created successfully. Please verify your email.",
      user
    );
  } catch (err) {
    handleError(res, err);
  }
};

exports.homePage = async (req, res) => {
  handleResponse(res, 200, "Rive app backend api working!");
};
