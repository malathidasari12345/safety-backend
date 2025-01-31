const Course = require("../models/course");
const { sendEmail } = require("../utilis/emailservice");
const JWT_SECRET = process.env.JWT_SECRET;
// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses.", error });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found." });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course details.", error });
  }
};

// Add a new course
exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      icon,
      category,
      methodologies,
      tools,
      benefits,
      price,
      duration,
    } = req.body;

    // Check if a course with the same title already exists
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res
        .status(400)
        .json({ message: "A course with this title already exists." });
    }

    // Create a new Course instance if no duplicate is found
    const course = new Course({
      title,
      description,
      icon,
      category,
      methodologies,
      tools,
      benefits,
      price,
      duration,
    });

    // Save the course to the database
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course.", error });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found." });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to update course.", error });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found." });
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course.", error });
  }
};

// Register for a course
exports.registerCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    console.log(course.title);
    const { FirstName, LastName, email } = req.body;
    if (!course) return res.status(404).json({ message: "Course not found." });

    console.log(FirstName, LastName, email);
    course.registrationCount += 1;
    await course.save();
    console.log("saved");
    const emailContent = `Hi ${FirstName} ${LastName},\n\nThank you for successfully registering for the ${course.title} course! We're excited to have you onboard and look forward to your learning journey. If you have any questions, feel free to reach out.\n\nBest regards,\nYour Team`;

    await sendEmail(email, "course Registration successful", emailContent);
    console.log("send");
    res
      .status(200)
      .json({ message: "Successfully registered for the course!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register for course.", error });
  }
};
