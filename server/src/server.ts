import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sendEmail } from "./mailer";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { fullName, email, phoneNumber, subject, message } = req.body;
  try {
    await sendEmail(fullName, email, phoneNumber, subject, message);
    res.status(200).send("Email sent successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error sending email:", error.message);
      res.status(500).send("Failed to send email.");
    } else {
      console.error("Unexpected error sending email:", error);
      res.status(500).send("Failed to send email.");
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
