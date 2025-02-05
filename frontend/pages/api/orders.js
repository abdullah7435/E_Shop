// import { NextApiRequest, NextApiResponse } from "next";
// import sgMail from "@sendgrid/mail";
// import { makePaymentRequest } from "@/utils/api";

// // Set your SendGrid API key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { products } = req.body;

//     // Handle payment using makePaymentRequest or your preferred payment method
//     try {
//       const res = await makePaymentRequest("/api/orders", {
//         products,
//       });

//       // Send email using SendGrid
//       const { orderId, userEmail } = res; // Make sure your server returns orderId and userEmail
//       const msg = {
//         to: userEmail,
//         from: "noreply@example.com", // Set your from email address
//         subject: "Order Confirmation",
//         text: `Thank you for your order! Your order ID is ${orderId}.`,
//         html: `<p>Thank you for your order! Your order ID is ${orderId}.</p>`,
//       };

//       await sgMail.send(msg);

//       res.status(200).json({ message: "Payment successful and email sent!" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }
