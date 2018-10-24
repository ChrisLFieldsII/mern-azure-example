const mongoose = require('mongoose');

const { DB_CONN, DB_USER, DB_PW } = process.env;

mongoose
  .connect(
    DB_CONN,
    { auth: { user: DB_USER, password: DB_PW }, useNewUrlParser: true },
  )
  .then(() => console.log('Succesfully connected to the DB through the power of magic...'))
  .catch(console.error);
