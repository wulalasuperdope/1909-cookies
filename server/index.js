const express = require('express');
const chalk = require('chalk');
const path = require('path');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const {
  db,
  models,
} = require('./db/index.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log(chalk.cyan(`${req.method} ${req.path}`));
  next();
});

app.use(express.static(path.join(__dirname, '../dist')));

db.sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.greenBright(`Server is listening on http://localhost:${PORT}`));
    });
  })
  .catch(e => {
    console.error(e);
  });
