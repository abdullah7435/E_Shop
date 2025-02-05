// backend/src/api/login.js

const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assuming you have a User model defined.

module.exports = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // TODO: Create a session or JWT token for user authentication
  // (You can use libraries like Express Session or JSON Web Tokens for this).

  // Return a success response
  return res.status(200).json({ message: 'User logged in successfully' });
};
