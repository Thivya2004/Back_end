const express = require("express");
const mongoose= require("mongoose");
const cors = require("cors");
const app = express();
const port = 5500;
app.use(cors());
app.use(express.json());
const mongoURI = "mongodb+srv://nthivya2004:Thivya@2@cluster0.u3z4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schema & Model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema);

// Routes

// Get all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new item
app.post("/items", async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  try {
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an item
app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true },
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an item
app.delete("/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
