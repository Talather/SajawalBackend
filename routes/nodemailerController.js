const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env

exports.scheduleMeeting = async (req, res) => {
  const { fullName, email, message, meetingDetails } = req.body;

  console.log("Received Meeting Request:");
  console.log(`Full Name: ${fullName}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log("Meeting Details:", meetingDetails);

  // Set up Nodemailer transporter using SMTP credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use false as Gmail does not require secure for port 587
    auth: {
      user: process.env.EMAIL_USER, // Authenticated email
      pass: process.env.EMAIL_PASS, // App-specific password
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });

  // Format the email content
  const emailContent = `
    Meeting Request Details:
    ------------------------
    - Full Name: ${fullName}
    - Email: ${email}
    - Message: ${message}
    - Meeting Date: ${meetingDetails?.selectedDate || "Not Provided"}
    - Meeting Time: ${meetingDetails?.selectedTime || "Not Provided"}
    - Region: ${meetingDetails?.selectedRegion || "Not Provided"}
    `;

  console.log("Email Content:", emailContent);

  // Define mail options
  const mailOptions = {
    from: `"Website" <${process.env.EMAIL_USER}>`, // Set sender's email
    to: "sales@earthlifeinternational.com", // Recipient email
    subject: "New Meeting Request",
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};
