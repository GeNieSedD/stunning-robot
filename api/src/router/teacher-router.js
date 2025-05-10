const express = require('express');
const teacherController = require('../controllers/teacher-controller')
 const router = express.Router()

 router.get('/allTeachers', teacherController.allTeacher)

 module.exports = router;