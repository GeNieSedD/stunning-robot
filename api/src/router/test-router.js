const express = require('express');
const testController = require('../controllers/test-controller')
const router = express.Router();

router.post('/createTest', testController.createTest)
module.exports = router;