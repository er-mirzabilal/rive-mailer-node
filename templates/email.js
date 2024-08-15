exports.emailVerificationTemplate = () => {
  return `<div><h1 style="color:#8477ad;text-align:center">Rive App</h1>
      <p style="color:#100d24l;font-size:22px">Your account is successfully created on Rive App. Please verify your Email Address.</p>
      <p style="font-size:22px">Click this link to verify : <b>${process.env.FRONTEND_DEPLOYEMNT}</b></p>
      </div>`;
};
