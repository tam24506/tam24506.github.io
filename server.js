/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    database = require('./database'),
    bodyParser = require('body-parser')

// Connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected succesfully');
}, error => {
    console.log('Cannot connect to database ' + error)
})

const favoriteAPI = require('../backend/routes/favorite.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

// API
app.use('/api', favoriteAPI);

// CREATE PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})