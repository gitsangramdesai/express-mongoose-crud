let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//# --> %23 requires url encoding
mongoose.connect("mongodb://sangram:sangram%2381@127.0.0.1:27017/phenixDb?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.2.3");


let foodItemSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  createdOn: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

//last one is actual collection name in db and its essential
let FoodItem = mongoose.model("FoodItem", foodItemSchema, "foodItem"); 

module.exports = {
  FoodItem: FoodItem,
  FoodItemSchema: foodItemSchema,
};
