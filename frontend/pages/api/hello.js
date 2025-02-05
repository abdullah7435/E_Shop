// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// This is the default function that handles the API request.
// It takes two parameters: `req` (request) and `res` (response).
export default function handler(req, res) {
  // Set the status of the response to 200 (OK) and send a JSON object with a name property.
  res.status(200).json({ name: "John Doe" });
}
