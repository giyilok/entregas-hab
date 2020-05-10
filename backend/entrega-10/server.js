//require('dotenv').config();

const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
//const path = require('path');
const errorhandler = require('errorhandler');

const { userIsAuthenticated, userIsAdmin } = require('./middlewares/auth.js');

const app = express();
const port = process.env.PORT;

//User controllers
const {
  newUser,
  getUser,
  editUser,
  loginUser
} = require('./controllers/users');

// Entry controllers
const {
  listEntries,
  newEntry,
  getEntry,
  deleteEntry,
  editEntry,
  voteEntry,
  getEntryVotes
} = require('./controllers/diary');

// Console logger middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());

// Multipart parsing middleware
app.use(fileUpload());

// CORS middleware
app.use(cors());

// Serve static (no use at this time)
//app.use(express.static(path.join(__dirname, 'static')));

//User Routes
app.post('/users', newUser);
app.post('/users/login', loginUser);
app.get('/users/:id', userIsAuthenticated, getUser);
app.put('/users/:id', userIsAuthenticated, editUser);

// Routes
app.get('/entries', listEntries);
app.post('/entries', userIsAuthenticated, newEntry);
app.get('/entries/:id', getEntry);
app.get('/entries/:id/votes', getEntryVotes);
app.post('/entries/:id/votes', userIsAuthenticated, voteEntry);
app.put('/entries/:id', userIsAuthenticated, editEntry);
app.delete('/entries/:id', userIsAuthenticated, userIsAdmin, deleteEntry);

// Manejador de errores (only dev)
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

// Error middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.httpCode || 500).send({
    status: 'error',
    message: error.message
  });
});

// Not found middleware
app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Not found' });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
