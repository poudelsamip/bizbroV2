import nodemailer from "nodemailer";

export const sendEmailVerification = async (receiver, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "BizBro",
    to: receiver,
    subject: "Email Verification",
    text: `Your Email Verification code is : ${code}`,
  });
};
