const Item = require("../models/itemModel");

exports.addItem = async (req, res) => {
  try {
    // we need to make sure that name and image fields are filled (quantity and price have
    // default values so no need to fill at first when creating)
    if (req.body.name == "" || req.body.image == "") {
      return res.status(400).send({
        success: false,
        message: "Name and image are required!",
      });
    }

    // create item
    const newItem = await Item.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Item created successfully!",
      data: newItem,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// retrieve item from the database by its ObjectId
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(400).send({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// retrieve all items from the database
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    if (items.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "They are no items",
      });
    }

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// update an item based on their ObjectId
exports.updateItem = async (req, res) => {
  try {
    if (req.body.name == "" || req.body.image == "") {
      return res.status(400).json({
        success: false,
        message: "Name and Image can not be empty",
      });
    }

    if (req.body.quantity == 0 || req.body.price == 0) {
      return res.status(400).json({
        success: false,
        message: "Price and quantity can not be zero",
      });
    }

    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(400).send({
        success: false,
        message: "Item not found",
      });
    }

    const updatedItem = await Item.updateOne(
      { _id: req.params.itemId },
      {
        $set: {
          name: req.body.name,
          image: req.body.image,
          price: req.body.price,
          quantity: req.body.quantity,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// delete item from the database based on id
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.itemId });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const deleted = await Item.deleteOne({ _id: req.params.itemId });

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: deleted,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// delete all items from database
exports.deleteAllItems = async (req, res) => {
  try {
    const deleted = await Item.deleteMany({});

    return res.status(200).json({
      success: true,
      message: " All items deleted successfully",
      data: deleted,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};
