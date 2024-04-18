let mongoose = require("mongoose");
let Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/phenixDb");

let foodItemSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  createdOn: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

let FoodItem = mongoose.model("FoodItem", foodItemSchema, "foodItem"); //last one is actual colelction name in db and its essential

module.exports = {
  FoodItem: FoodItem,
  FoodItemSchema: foodItemSchema,
};
