let mongoose = require("mongoose");
let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favouriteFoods: [String],
});
module.exports = mongoose.model("Person", personSchema);
