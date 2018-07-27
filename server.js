const express = require('express');
const mongoose = require("mongoose");
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const { DATABASE_URL } = require("./config");
mongoose.connect(DATABASE_URL);

const authRouter = require('./routes/authRouter');
const usersRouter = require('./routes/usersRouter');
const petsRouter = require('./routes/petsRouter');
const visitsRouter = require('./routes/visitsRouter');
const tasksRouter = require('./routes/tasksRouter');

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/pets', petsRouter);
app.use('/vists', visitsRouter);
app.use('/tasks', tasksRouter);

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchronously starting
// our server, since we'll be dealing with promises there.
function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve(server);
        })
        .on("error", err => {
          reject(err);
        });
    });
  }
  
  // like `runServer`, this function also needs to return a promise.
  // `server.close` does not return a promise on its own, so we manually
  // create one.
  function closeServer() {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          reject(err);
          // so we don't also call `resolve()`
          return;
        }
        resolve();
      });
    });
  }
  
  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
  if (require.main === module) {
    runServer().catch(err => console.error(err));
  }
  
  module.exports = { app, runServer, closeServer };