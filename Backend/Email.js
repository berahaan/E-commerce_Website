import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "birhankabtamu5@gmail.com",
    pass: "icanachievemygoal#",
  },
});

const sendOrderConfirmationEmail = (customerInfo) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: "berahaan@gmail.com",
      to: customerInfo.email,
      subject: "Order Confirmation",
      text: `Dear ${customerInfo.name},\n\nYour order has been confirmed.\n\nThank you for shopping with us!\n\nBest regards,\nYour Company Name`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info.response);
      }
    });
  });
};

export default sendOrderConfirmationEmail;
