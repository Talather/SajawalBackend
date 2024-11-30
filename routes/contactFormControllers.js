const nodemailer = require("nodemailer");
require("dotenv").config();

exports.submitContactForm = async (req, res) => {
    const { name, email, phone, country, products, business, subject, message } = req.body;

    console.log("Received Contact Form Submission:");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Country: ${country}`);
    console.log(`Products: ${products}`);
    console.log(`Business Type: ${business}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    // Set up Nodemailer transporter using SMTP credentials
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER, // Authenticated email
            pass: process.env.EMAIL_PASS, // Email password or app-specific password
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    // Email content to send
    const emailContent = `
    Contact form submission:
    - Name: ${name}
    - Email: ${email}
    - Phone: ${phone}
    - Country: ${country}
    - Products Interested In: ${Array.isArray(products) ? products.join(', ') : products}
    - Business Type: ${business}
    - Subject: ${subject}
    - Message: ${message}
    `;

    console.log("Email Content:", emailContent);

    const mailOptions = {
        from: '"Website" <website@earthlifeinternational.com>',
        to: "sales@earthlifeinternational.com",
        subject: `${subject}`,
        text: emailContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to send email");
    }
};
