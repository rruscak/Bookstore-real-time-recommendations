const path = require('path');
const express = require('express');
const postsRoutes = require('./routes/posts');

// Init App
const app = express();

require('./configurators/body')(app);
require('./configurators/headers')(app);
require('./configurators/logger')(app);

// Set Static Folder
// app.use(express.static('uploads'));

// API routes
app.use("/images", express.static(path.join("uploads/images")));
app.use("/api/posts", postsRoutes);

module.exports = app;
