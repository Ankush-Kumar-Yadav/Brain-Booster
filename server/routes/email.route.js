import express from "express";

import { sendEmail } from "../utils/sendEmail.js";

const app = express();

const router = express.Router();

router.post("/send/mail", async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return next(
      res.status(400).json({
        succes: false,
        message: "Please provide all details",
      })
    );
  }
  try {
    await sendEmail({
      email: process.env.SMTP_MAIL,
      subject: "Email Comming From Brain Boosters",
      message,
      userEmail: email,
    });
    res.status(200).json({
      success: true,
      message: "Message send Successfully.",
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
