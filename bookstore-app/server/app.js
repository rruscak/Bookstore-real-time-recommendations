const express = require('express');
let routes = require('./routes');

// Init App
const app = express();

require('./configurators/body')(app);
require('./configurators/headers')(app);
require('./configurators/logger')(app);

// Set Static Folder
app.use(express.static('public'));

// API routes
app.post("/api/posts", routes.posts.new);
app.get("/api/posts", routes.posts.getAll);


// app.get('/api/movies', (req, res) => {
//   let session = driver.session();
//   session
//     .run('MATCH(n:Actor) RETURN n LIMIT 5')
//     .then((res) => {
//       res.records.forEach((r) => {
//         console.log(r._fields[0].properties);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//
//   res.status(200).json({
//     message: 'Post fetched successfully',
//   });
// });

module.exports = app;
