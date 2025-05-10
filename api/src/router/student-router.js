const express = require('express')
const studentController = require('../controllers/student-controller')
const router = express.Router()

router.get('/allStudent', studentController.allStudents)

module.exports = router;