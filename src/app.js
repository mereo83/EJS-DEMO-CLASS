const express = require('express');
const ejs = require('ejs');
const {render} = require('ejs');
const bookingRouter = require('./routes/bookingRoute');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./config/db');
const app = express();
const port = 8000;


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', bookingRouter);
app.use(cookieParser());
app.use(
  session({
    secret: 'myscrete',
    resave: false,
    maxAge: 6000000,
    saveUninitialized: false,
  }));

// Function to handle database queries
function queryPromise(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Rest of your route handlers
app.get('/welcome', (request, response) => {
  response.render('pages/index');
});


app.get('/login', (request, response) => {
    response.render('pages/login');
  });


app.put('/search/:id', async (request, response) => {
  // Your update route code
});

app.delete('/delete/:id', async (request, response) => {
  // Your delete route code
});

app.get('/all', async (request, response) => {
  // Your get all users route code
});

app.post('/create', async (request, response) => {
  // Your create user route code
});

// Add a log statement to check if the database is connected
db.promise()
  .connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
