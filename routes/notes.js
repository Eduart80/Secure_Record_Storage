const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/auth');
const notesController = require('../controllers/notesController')

// Create Note
router.post('/api/notes', authMiddleware, notesController.createPost )

// Get All Notes 
router.get('/api/notes', authMiddleware,notesController.getAllNotes )

// Get Single Note 
router.get('/api/notes/:id', authMiddleware, notesController.getSingleNote )

// Update Note 
router.put('/api/notes/:id', authMiddleware, notesController.updateById )

// Delete Note 
router.delete('/api/notes/:id', authMiddleware, notesController.deleteById)

module.exports = router;
