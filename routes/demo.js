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
