const express = require('express');
const router = express.Router();
const ravMesserController = require('../controllers/ravMesserController');

router.get('/getLists', ravMesserController.getLists);
router.get('/getSubscribers/:listId', ravMesserController.getSubscribers); 
router.post('/addSubscriber/:listId', ravMesserController.addSubscriber);

module.exports = router;
