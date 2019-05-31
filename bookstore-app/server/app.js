const path = require('path');
const express = require('express');
const booksRoutes = require('./routes/books');
const cartRoutes = require('./routes/cart');
const filtersRoutes = require('./routes/filters');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const rateRoutes = require('./routes/rate');
const ordersRoutes = require('./routes/orders');
const recRelatedRoutes = require('./routes/rec/related');
const recRecentRoutes = require('./routes/rec/recent');
const recRecommendedRoutes = require('./routes/rec/recommended');
const recSalesRoutes = require('./routes/rec/sales');

// Init App
const app = express();

require('./configurators/body')(app);
require('./configurators/headers')(app);
require('./configurators/logger')(app);

// Set Static Folder
app.use("/images", express.static(path.join("uploads/images")));
// app.use(express.static('uploads'));

// API routes
app.use("/api/books", booksRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/rate", rateRoutes);
app.use("/api/filters", filtersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", ordersRoutes);
// Recommendations
app.use("/api/rec/related", recRelatedRoutes);
app.use("/api/rec/recent", recRecentRoutes);
app.use("/api/rec/recommended", recRecommendedRoutes);
app.use("/api/rec/sales", recSalesRoutes);

module.exports = app;
