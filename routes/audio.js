// routes/audio.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Audio = require('../models/audio.model');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Get all audio
router.get('/list', async (req, res) => {
  try {
    const audioList = await Audio.find();
    res.status(200).json(audioList);
  } catch (error) {
    console.error('Error fetching audio data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add new audio
router.post('/add', upload.single('audioFile'), async (req, res) => {
  const { name, desc } = req.body;

  // Check if req.file exists before accessing its properties
  if (req.file) {
    const song = req.file.filename; // Multer adds the file to the request object
    try {
      const newAudio = new Audio({ name, desc, song });
      await newAudio.save();
      res.status(201).json({ message: 'Audio added successfully' });
    } catch (error) {
      console.error('Error adding audio:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle the case when no file is uploaded
    res.status(400).json({ error: 'No audio file uploaded' });
  }
});

// Update audio
router.put('/update/:id', async (req, res) => {
  const audioId = req.params.id;
  const { name, desc } = req.body;

  try {
    const updatedAudio = await Audio.findByIdAndUpdate(audioId, { name, desc });
    res.status(200).json({ message: 'Audio updated successfully' });
  } catch (error) {
    console.error('Error updating audio:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete audio
router.delete('/delete/:id', async (req, res) => {
  const audioId = req.params.id;

  try {
    await Audio.findByIdAndDelete(audioId);
    res.status(200).json({ message: 'Audio deleted successfully' });
  } catch (error) {
    console.error('Error deleting audio:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
