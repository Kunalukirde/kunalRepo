const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const audioRoutes = require('./routes/audio');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// app.use(express.static('../XceltecCrudTask'));

// MongoDB connection
mongoose.connect('mongodb+srv://kunalukirde01:kunalukirde@cluster0.ffcff6b.mongodb.net/?retryWrites=true&w=majority');

// Routes - Implement CRUD operations


// Routes
app.use('/' , (req,res) => {
  res.status(200).send({ 'message ' : 'You Are Live On Server'});
})
app.use('/api/auth', authRoutes);
app.use('/api/audio', audioRoutes);
// Serve uploaded audio files statically
app.use('/uploads', express.static('uploads'));


// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});