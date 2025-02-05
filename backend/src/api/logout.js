// backend/src/api/logout.js

module.exports = (req, res) => {
    // TODO: Destroy the user session or JWT token here.
  
    // Return a success response
    return res.status(200).json({ message: 'User logged out successfully' });
  };
  