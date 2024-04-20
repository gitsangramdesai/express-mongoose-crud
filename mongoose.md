Today we explore how to create CRUD operation with express.js and mongodb as
database.

mongoose is an orm that is usually used for connecting mongodb with node.js.

Lets get started.

create express.js app using genenerator express --view=ejs express-mongoose

It will create express-mongoose folder ,cd into this folder & run npm i

Update express.js package to latest npm install express@latest

install nodemon npm install nodemon --save-dev

update package.json to use nodemon In package.json find "start": "node
    ./bin/www"

    and change it to 
        "start": "nodemon ./bin/www"

Now install mongoose package npm i mongoose --save

Assuming you have opened project in an ide,I am using visual studio code,add
models folder to root and add foodItem.js into this folder.

Content of foodItem.js

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

 //last one is actual collection name in db and its essential
let FoodItem = mongoose.model("FoodItem", foodItemSchema, "foodItem");

module.exports = {
  FoodItem: FoodItem,
  FoodItemSchema: foodItemSchema,
};



Here we are defining schema of our document foodItem.Our database is 'phenixDb'


Now go to routes foldetr and add demo.js into it.

content of demo.js

let express = require("express");
let router = express.Router();
let FoodItem = require("../models/foodItem").FoodItem;
let FoodItemSchema = require("../models/foodItem").FoodItemSchema;
let mongoose = require("mongoose");

/* insert a new food item */
router.post("/insert", async function (req, res, next) {
  let foodItemName = req.body.name;
  let foodItemDesc = req.body.description;
  let foodItemPrice = req.body.price;

  try {
    let foodItem = await FoodItem.create({
      name: foodItemName,
      description: foodItemDesc,
      price: foodItemPrice,
    });

    console.log("FoodItem:", foodItem);

    res.json({
      message: "food item added successfully",
      error: "",
      data: foodItem,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "unable to retreive food items",
      error: err.message.toString(),
      data: [],
      success: false,
    });
  }
});

/* get all food item */
router.get("/getAll", async function (req, res, next) {
  try {
    let foodItems = await FoodItem.find({});
    console.log("FoodItems", foodItems);

    res.json({
      message: "all food items retrived successfully",
      error: "",
      data: foodItems,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "unable to retreive food items",
      error: err.message.toString(),
      data: [],
      success: false,
    });
  }
});

/* get all food item */
router.get("/getById", async function (req, res, next) {
  let foodItemId = req.query.id;
  try {
    let foodItem = await FoodItem.findById(foodItemId);
    res.json({
      message: "food item retrived successfully",
      error: "",
      data: foodItem,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "unable to retreive food item",
      error: err.message.toString(),
      data: [],
      success: false,
    });
  }
});

//update food item all columns
router.put("/update", async function (req, res, next) {
  let foodItemId = req.body.id;
  let foodItemName = req.body.name;
  let foodItemDesc = req.body.description;
  let foodItemPrice = req.body.price;

  try {
    let foodItem = await FoodItem.updateOne(
      { _id: foodItemId },
      {
        $set: {
          name: foodItemName,
          description: foodItemDesc,
          price: foodItemPrice,
        },
      }
    );

    console.log("FoodItem:", foodItem);

    res.json({
      message: "food item updated successfully",
      error: "",
      data: foodItem,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "unable to update food item",
      error: err.message.toString(),
      data: [],
      success: false,
    });
  }
});

//update foot item price
router.patch("/update/price", async function (req, res, next) {
  let foodItemId = req.body.id;
  let foodItemPrice = req.body.price;

  try {
    let foodItem = await FoodItem.updateOne(
      { _id: foodItemId },
      {
        $set: {
          price: foodItemPrice,
        },
      }
    );

    console.log("FoodItem:", foodItem);

    res.json({
      message: "food item price updated successfully",
      error: "",
      data: foodItem,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "unable to update food item price",
      error: err.message.toString(),
      data: [],
      success: false,
    });
  }
});

//delete food item
router.delete("/delete", async function (req, res, next) {
  let foodItemId = req.body.id;

  try {
    let foodItem = await FoodItem.deleteOne({ _id: foodItemId });

    console.log("FoodItem:", foodItem);

    res.json({
      message: "food item deleted successfully",
      error: "",
      data: foodItem,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "unable to delete food item",
      error: err.message.toString(),
      data: [],
      success: false,
    });
  }
});

router.delete("/delete/soft", async function (req, res, next) {
  let foodItemId = req.body.id;
  try {
    let foodItem = await FoodItem.updateOne(
      { _id: foodItemId },
      {
        $set: {
          isDeleted: 1,
        },
      }
    );

    console.log("FoodItem:", foodItem);

    res.json({
      message: "food item marked as deleted successfully",
      error: "",
      data: foodItem,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "unable to mark food item as deleted",
      error: err.message.toString(),
      data: [],
      success: false,
    });
  }
});

//search based on keyword
router.get("/search", async function (req, res, next) {
  let keyword = req.query.keyword;
  

  try {
    let foodItem = await FoodItem.find({description: {$regex: keyword, $options: 'i'}});

    console.log("FoodItem:", foodItem);

    res.json({
      message: "food item searched successfully",
      error: "",
      data: foodItem,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "unable to search food item",
      error: err.message.toString(),
      data: [],
      success: false,
    });
  }

});

module.exports = router;


Here demo.js defines various CRUD endpoints.

Now mount our route,go to app.js in root folder and add

let demoRouter = require('./routes/demo');

and

app.use('/demo', demoRouter);

to suitable place.

Mean-while I already have a project running on 3000 port so I added .env file to
root folder

content of .env file

    PORT=3001

To use this port when we npm start,we need to install dotenv package. npm
    install dotenv --save

Now go to bin/www and add require('dotenv').config()

Now you can run our application by issuing "npm start" command. You can access
the api created by using Postman app. E.g. To use search API we need to hit
below endpoint,it GET api. http://localhost:3001/demo/search?keyword=potato

The complete code of this project is available on github at
      https://github.com/gitsangramdesai/express-mongoose-crud