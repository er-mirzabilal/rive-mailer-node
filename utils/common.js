const NodemailerService = require("../services/nodemailer.js");
const UserService = require("../services/user.js");
const { emailVerificationTemplate } = require("../templates/email.js");
const jwt = require('jsonwebtoken');

exports.isEmailAlreadyUsed = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await UserService.findBy({ where: { email: email } });
      if (user) {
        resolve(user);
      }
      resolve(null);
    } catch (error) {
      reject(error);
    }
  });
};

exports.sendEmailVerifyAlert = async (email) => {
  // Sending an email to the user
    // Generate a JWT token for verification
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const url = `${process.env.FRONTEND_DEPLOYEMNT}?token=${token}`;
  const html = emailVerificationTemplate(url);
  await NodemailerService.sendEmail(email, "Verify Email Address", html);
};
