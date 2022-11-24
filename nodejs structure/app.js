require('./db/db.connection');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const apiRoutes = require('./routes');
const docs = require('./docs');
const helmet = require('helmet');

const app = express();
app.use(cors({
  origin: '*',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

/**
 * below is the swagger setup
 */
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.get('/', (req, res) => {
  res.send('working!!!');
});

app.use('/', apiRoutes);

module.exports = app;
