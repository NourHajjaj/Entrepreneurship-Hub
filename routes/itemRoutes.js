const itemController = require('../controllers/itemController');
const express = require('express');
const router = express.Router();

router.post('/addItem', itemController.addItem);

router.get('/getItem/:itemId', itemController.getItem);

router.get('/getAllItems', itemController.getAllItems);
router.put('/updateItem/:itemId/:ngoId', itemController.updateItem);

router.post("/likeUnlikeItem/:itemId/:id", itemController.likeUnlikeItem)

router.delete('/deleteItem/:itemId', itemController.deleteItem);
router.delete('/deleteAllItems', itemController.deleteAllItems);

module.exports = router;