const express = require("express");
const mongoose = require("mongoose");
const Order = require("./models/Order");
const cors = require("cors");
require("dotenv").config();

const Pizza = require("./models/Pizza");
const app = express();

app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => 
  {console.log("MongoDB Connected Successfully!");
}).catch((error) => {
  console.log("MongoDB Connection Failed:" , error .message);
});

app.get("/", (req, res) => {
  res.send("PizzaHub Backend is Running!");
});

// API to add a new pizza
app.post("/api/pizzas", async (req, res) => {
  try {
    const newPizza = new Pizza({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image
    });

    const savedPizza = await newPizza.save();

    res.status(201).json({
      message: "Pizza added successfully!",
      pizza: savedPizza
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding pizza",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

// API to get all pizzas
app.get("/api/pizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    res.status(200).json(pizzas);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching pizzas",
      error: error.message
    });
  }
});

// app.get("/api/pizzas/seed", async (req, res) => {
//   try {
//       await Pizza.deleteMany({});

//     const pizzas = [
//       {
//         name: "Margherita",
//         price: 199,
//         description: "Classic cheese pizza",
//         image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500"
//       },
//       {
//         name: "Farmhouse",
//         price: 299,
//         description: "Fresh vegetable pizza",
//         image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500"
//       },
//       {
//         name: "Peppy Paneer",
//         price: 349,
//         description: "Spicy paneer pizza",
//         image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
//       }
//     ];

//     await Pizza.insertMany(pizzas);

//     res.json({ message: "Pizzas added successfully!" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Add sample pizzas
app.post("/api/pizzas/seed", async (req, res) => {
  try {
    const pizzas = [
      {
        name: "Margherita",
        price: 199,
        description: "Classic cheese pizza",
        image: "https://example.com/margherita.jpg"
      },
      {
        name: "Farmhouse",
        price: 299,
        description: "Loaded with fresh vegetables",
        image: "https://example.com/farmhouse.jpg"
      },
      {
        name: "Peppy Paneer",
        price: 349,
        description: "Spicy paneer with capsicum",
        image: "https://example.com/paneer.jpg"
      }
    ];

    await Pizza.insertMany(pizzas);

    res.json({ message: "Sample pizzas added successfully!" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place a new order
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, phone, address, items, totalAmount } = req.body;

    // Basic validation
    if (!customerName || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({
        message: "Please provide all order details"
      });
    }

    const newOrder = new Order({
      customerName,
      phone,
      address,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to place order",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});