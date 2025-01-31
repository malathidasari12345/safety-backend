const express = require("express");
const app = express();
// env files
const dotenv = require("dotenv");
dotenv.config();
// import database
const db = require("./config/db");
const PORT = process.env.PORT || 5000;
// cors
const cors = require("cors");
app.use(cors());
// routes import
const userRoutes = require("./routes/userroutes");
const contactRoutes = require("./routes/contactroute");
const faqRoutes = require("./routes/faqRoutes");
const courseRoutes = require("./routes/courseroute");
const trainerRoutes = require("./routes/trainerroute");
const appointmentroutes = require("./routes/appointmentroute");
const blog = require("./routes/blogroutes");
const comment = require("./routes/commentroute");
const resources = require("./routes/resourceroute");

// middleware
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/resources", resources);
app.use("/api/faqs", faqRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/appointments", appointmentroutes);
app.use("/api/blog", blog);
app.use("/api/comment", comment);

// home route
app.use("/", (req, res) => {
  res.json({ message: "Welcome to HomePage" });
});
//  listen port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
