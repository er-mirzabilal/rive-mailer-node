const { default: axios } = require("axios");

class EmailValidator {
  static async verifyEmail(email) {
    try {
      const resp = await axios.get(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=7e12b2a67deb038c5e315c88143cd66efdfaf3e3`
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
