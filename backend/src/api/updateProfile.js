// backend/src/api/updateProfile.js

const { User } = require('../models'); // Assuming you have a User model defined.

module.exports = async (req, res) => {
  const { userId } = req.params; // Assuming you're passing the userId in the request params.
  const { firstName, lastName } = req.body;

  try {
    // Find the user by their ID and update their name
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;

    // Save the updated user details to the database
    await user.save();

    // Return a success response
    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error while updating user profile:', error);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
};
