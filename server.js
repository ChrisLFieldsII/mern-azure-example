require('dotenv').config();
require('./server/db-conn');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mount routes
app.use('/api/thoughts/', require('./server/routes/thoughts-route'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/client/build/' });
});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Wizardry happening on port ${PORT}`));
