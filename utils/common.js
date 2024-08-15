const NodemailerService = require("../services/nodemailer.js");
const UserService = require("../services/user.js");
const { emailVerificationTemplate } = require("../templates/email.js");

exports.isEmailAlreadyUsed = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await UserService.findBy({ where: { email: email } });
      if (user) {
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

exports.sendEmailVerifyAlert = async (email) => {
  // Sending an email to the user
  const html = emailVerificationTemplate();
  await NodemailerService.sendEmail(email, "Verify Email Address", html);
};
