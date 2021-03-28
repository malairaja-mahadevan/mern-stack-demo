const mongoose = require("mongoose");

const PhoneSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: String,
  description: String
});

module.exports = mongoose.model("Phones", PhoneSchema);
