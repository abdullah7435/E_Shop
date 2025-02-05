// backend/src/middleware/authenticate.js

// Assuming you're using sessions for authentication
module.exports = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // User is authenticated, proceed to the next middleware/route handler
    next();
  };
  