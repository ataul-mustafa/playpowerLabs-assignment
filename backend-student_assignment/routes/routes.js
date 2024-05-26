const express = require('express');
const { login } = require('../controller/authController');
const { createAssignment, submitAssignment, getAssignments, getOneById, updateAssignment, deleteOneAssignment, deleteAllAssignments } = require('../controller/assignmentController');
const { verifyToken, teacherAuth } = require('../middleware/auth');

const router = express.Router();

// Authentication route
router.post('/login', login);

// Assignment routes
router.post('/assignments', verifyToken, createAssignment);
router.post('/assignments/:id', verifyToken, submitAssignment);
router.get('/assignments', verifyToken, getAssignments);
router.get('/assignments/:id', verifyToken, getOneById);
router.put('/assignments/:id', verifyToken, teacherAuth, updateAssignment);
router.delete('/assignments', verifyToken, teacherAuth, deleteAllAssignments);
router.delete('/assignments/:id', verifyToken, teacherAuth, deleteOneAssignment);

//Submit assignment routes


module.exports = router;
