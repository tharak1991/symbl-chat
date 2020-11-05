const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const socket_route = require('./routes/socket.route');
const message_route = require('./routes/message.route');


const port = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));

app.use(morgan('dev'));
app.use(bodyParser.json({
  limit: '50mb',
  extended: true,
}));
app.use(bodyParser.urlencoded({
  extended: false,
  parameterLimit: 100000,
  limit: '50mb',
}));
app.use(compression());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));


const server = app.listen(port, function () {
  console.log('Listening to port ' + port);
});

const io = socket(server);
socket_route.start(io);

/**
 * Api Route
 */
app.use('/message/', message_route);

app.use('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = app;