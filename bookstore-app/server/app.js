const path = require('path');
const express = require('express');
const booksRoutes = require('./routes/books');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

// Init App
const app = express();

require('./configurators/body')(app);
require('./configurators/headers')(app);
require('./configurators/logger')(app);

// Set Static Folder
// app.use(express.static('uploads'));

// API routes
app.use("/images", express.static(path.join("uploads/images")));
app.use("/api/books", booksRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
