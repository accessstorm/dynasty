// Import required modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Razorpay from 'razorpay';
import shortid from 'shortid';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

// Get directory name for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Initialize Express app
  const app = express();

  // Configure middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static('public'));
  app.use(express.static('dist'));

  // Initialize Razorpay
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_TN1UYHfEGIr6rI',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'ha0u7XG5ISfSQRFljqHyQeEy',
  });

  // API ENDPOINTS - Must be defined BEFORE Vite middleware
  
  // Logo endpoint
  app.get("/logo.svg", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dynasty-logo.svg"));
  });

  // Payment verification webhook
  app.post("/verification", (req, res) => {
    const secret = "razorpaysecret";
    
    console.log("Webhook received:", req.body);
    
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    
    console.log("Generated signature:", digest);
    console.log("Razorpay signature:", req.headers["x-razorpay-signature"]);
    
    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("Payment verification successful");
      res.status(200).json({
        message: "OK",
      });
    } else {
      console.log("Payment verification failed");
      res.status(403).json({ message: "Invalid" });
    }
  });

  // Create Razorpay order endpoint (support both /razorpay and /create-order)
  app.post(["/razorpay", "/create-order"], async (req, res) => {
    // Get amount from request or use default
    const amount = req.body.amount || 500; // Amount in INR
    const payment_capture = 1;
    const currency = req.body.currency || "INR";
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };
    
    try {
      const response = await razorpay.orders.create(options);
      console.log("Order created:", response);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ error: "Failed to create order" });
    }
  });
  
  // Create Vite server and add middleware AFTER API endpoints
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  
  // Use Vite's middleware after API routes
  app.use(vite.middlewares);

  // Start server
  const PORT = process.env.PORT || 5173;

  // Start Express server
  app.listen(PORT, () => {
    console.log(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                          ┃
┃   🚀 All-in-one server running at http://localhost:${PORT}               ┃
┃   💰 Razorpay integration is ready!                                      ┃
┃                                                                          ┃
┃   To see the payment integration:                                        ┃
┃   1. Open http://localhost:${PORT} in your browser                       ┃
┃   2. Click on any Buy Now button on products to initiate payment         ┃
┃                                                                          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `);
    console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID || 'rzp_test_TN1UYHfEGIr6rI');
  });
}

startServer().catch(console.error); 