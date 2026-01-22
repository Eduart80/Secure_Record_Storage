const mongoose = require('mongoose');
const Note = require('../models/Note');


// Create Note
async function createPost(req, res) {
  try {
    const note = new Note({
      ...req.body,
      user: req.user._id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get All Notes
async function getAllNotes(req, res) {
    try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
}

//get single note by id
async function getSingleNote(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid note ID format.' });
    }
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    if (!note.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Not authorized to view this note.' });
    }
    res.json(note);
  } catch (err) {
    console.error('Error in GET /:id:', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// Update Note 
async function updateById(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid note ID format.' });
    }
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    if (!note.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'User is not authorized to update this note.' });
    }
    Object.assign(note, req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    console.error('Error in PUT /:id:', err);
    res.status(500).json({ error: 'Server error.' });
  }
}
// delete by id
async function deleteById(req, res){
 try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    if (!note.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'User is not authorized to delete this note.' });
    }
    await note.deleteOne();
    res.json({ message: 'Note deleted.' });
  } catch (err) {
    console.error('Error in DELETE /:id:', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = {
    createPost,
    getAllNotes,
    getSingleNote,
    updateById,
    deleteById
}