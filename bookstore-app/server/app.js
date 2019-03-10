const express = require('express');
const postsRoutes = require('./routes/posts');

// Init App
const app = express();

require('./configurators/body')(app);
require('./configurators/headers')(app);
require('./configurators/logger')(app);

// Set Static Folder
app.use(express.static('public'));

// API routes
app.use("/api/posts", postsRoutes);

module.exports = app;
