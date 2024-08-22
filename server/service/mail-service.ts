import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: parseInt(process.env.SMTP_PORT as string, 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  },
});

export const sendActivationMessage = async (to: string, link: string) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: `Activation account on ${process.env.API_URL}`,
    text: "",
    html: `
            <div>
                  <h1>For activation account click on link</h1>
                  <a href="${link}">${link}</a>
            </div>
            `,
  });
};
