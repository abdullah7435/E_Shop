// backend/src/api/signup.js

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models'); // Assuming you have a User model defined.

const saltRounds = 10; // You can adjust the number of salt rounds for bcrypt.

module.exports = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Check if the email is already registered
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // Create a new user record in the database
    const newUser = await User.create({
      id: uuidv4(), // Generate a unique ID for the user
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Return a success response
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error while creating user:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};
