const Appointment = require("../models/appointment");
const { sendEmail } = require("../utilis/emailservice");
const User = require("../models/user");
require("dotenv").config();
// Create an appointment
exports.createAppointment = async (req, res) => {
  const { trainer, courseType, date, time, user, userEmail } = req.body;

  try {
    // Create a new appointment
    const newAppointment = new Appointment({
      trainer,
      courseType,
      date,
      time,
      user,
    });

    // Save the appointment
    await newAppointment.save();

    // Add appointment ID to the user's appointments array
    const userDoc = await User.findById(user);
    userDoc.appointments.push(newAppointment._id);
    await userDoc.save();

    // Prepare the confirmation email content for the user
    const userEmailContent = `
      <h3>Your appointment has been successfully booked!</h3>
      <p><strong>Trainer:</strong> ${trainer}</p>
      <p><strong>Course:</strong> ${courseType}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>We look forward to seeing you!</p>
    `;

    // Send confirmation email to the user
    await sendEmail(
      userEmail,
      "Appointment Confirmation",
      userEmailContent,
      true
    );

    // Prepare the appointment request email content for the admin
    const adminEmailContent = `
      <h3>New Appointment Request</h3>
      <p><strong>Trainer:</strong> ${trainer}</p>
      <p><strong>Course:</strong> ${courseType}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>User ID:</strong> ${user}</p>
      <p><strong>User Email:</strong> ${userEmail}</p>
      <p>Please review and confirm the appointment.</p>
    `;

    // Send the appointment request email to the admin
    const adminEmail = process.env.EMAIL_USER; // Replace with the admin's email address
    await sendEmail(
      adminEmail,
      "New Appointment Request",
      adminEmailContent,
      true
    );

    // Return the new appointment data as a response
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error.message);
    res
      .status(500)
      .json({ message: "Error creating appointment", error: error.message });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("trainer") // Populate trainer details if needed
      .populate("user"); // Populate user details if needed
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { status, userEmail } = req.body; // We are only expecting `status` and `userEmail` here.
  console.log(status, userEmail);
  console.log(status, userEmail); // Log the status and user email for debugging

  try {
    // Only update the `status` field
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status }, // Update only the `status` field
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Send confirmation email about the status update
    const emailContent = `
      <h3>Your appointment status has been updated!</h3>
      <p>Status: ${status}</p>
      <p>We look forward to seeing you!</p>
    `;

    // Send the email to the provided `userEmail`
    await sendEmail(userEmail, "Appointment Status Update", emailContent, true);

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

// Delete an appointment by ID

// Get appointments by user ID
exports.getAppointmentsByUserId = async (req, res) => {
  const userId = req.params.userId; // Extract the user ID from the request parameters
 console.log(userId)
  try {
    // Find the user and populate their appointments (which are references to Appointment documents)
    const user = await User.findById(userId).populate("appointments");

    if (!user || !user.appointments || user.appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user" });
    }

    // Return the populated appointments
    res.status(200).json(user.appointments); // The user.appointments array now contains populated appointment data
  } catch (error) {
    console.error("Error fetching appointments for user:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching appointments for this user", error });
  }
};
