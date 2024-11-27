"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mailer_1 = require("./mailer");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.post("/send-email", async (req, res) => {
    const { fullName, email, phoneNumber, subject, message } = req.body;
    try {
        await (0, mailer_1.sendEmail)(fullName, email, phoneNumber, subject, message);
        res.status(200).send("Email sent successfully");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error sending email:", error.message);
            res.status(500).send("Failed to send email.");
        }
        else {
            console.error("Unexpected error sending email:", error);
            res.status(500).send("Failed to send email.");
        }
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
