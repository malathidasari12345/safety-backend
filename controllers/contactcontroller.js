const Contact = require("../models/contact");
const { sendEmail } = require("../utilis/emailservice");
require("dotenv").config();
// Controller for handling contact form submission
const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, subject, message, question } = req.body;

    // Validate fields
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save to MongoDB
    const contact = new Contact({
      fullName,
      email,
      subject,
      message,
      question,
    });
    await contact.save();

    // Prepare email content
    const emailSubject = "Thank you for contacting us!";
    const emailText = `Hi ${fullName},\n\nThank you for reaching out! We have received your message:\n\n"${message}"\n\nOur team will get back to you shortly.\n\nBest regards,\nTeam`;

    // Send confirmation email
    await sendEmail(email, emailSubject, emailText);

    // for admin
    const adminEmail = process.env.EMAIL_USER;
    const adminName = adminEmail.split("@")[0].split(".")[0];
    const adminSubject = "New Contact Form Submission";
    const adminText = `Hello ${adminName},\n\nA new contact form submission has been received:\n\nName: ${fullName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\nPlease follow up with the user as needed.\n\nBest regards,\nContact System`;
    await sendEmail(adminEmail, adminSubject, adminText);

    res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Error in contact form submission:", error.message);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
};

module.exports = {
  submitContactForm,
};
