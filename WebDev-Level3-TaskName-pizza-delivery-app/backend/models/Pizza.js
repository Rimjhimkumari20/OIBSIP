const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String
  },

  image: {
    type: String
  }
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;