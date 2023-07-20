const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/getUser',userController.getUser);
router.get('/getAllUsers',userController.getAllUsers);
router.put('/updateUser',userController.updateUser);
router.put('/changePassword/:id', userController.changePassword)
router.delete('/deleteUser',userController.deleteUser);
router.delete('/deleteAllUsers',userController.deleteAllUsers);

module.exports = router;