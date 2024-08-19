const { default: axios } = require("axios");

class EmailValidator {
  static async verifyEmail(email) {
    try {
      const resp = await axios.get(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.EMAIL_VERIFIER_KEY}`
      );
      if (resp?.data?.data?.status) {
        return resp?.data?.data?.status;
      }
      throw new Error("Invalid Email");
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
}

module.exports = EmailValidator;
