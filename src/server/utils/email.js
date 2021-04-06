const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendSignupEmail = (email) => {
  const msg = {
    to: email,
    from: "eexdhe@gmail.com",
    subject: "Welcome",
    text: `Welcome to Kha. I hope you will have a good journey among us.`,
  };

  sendgrid
    .send(msg)
    .then(() => console.log("email sent"))
    .catch((error) => console.log(error));
};

const sendCancelationEmail = (email) => {
  const msg = {
    to: email,
    from: "eexdhe@gmail.com",
    subject: "Cancelation",
    text: `We are sorry to know that you are leaving`,
  };

  sendgrid
    .send(msg)
    .then(() => console.log("email sent"))
    .catch((error) => console.log(error));
};

module.exports = { sendSignupEmail, sendCancelationEmail };
