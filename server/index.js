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

const { User } = models;

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log(chalk.cyan(`${req.method} ${req.path}`));
  next();
});

app.use((req, res, next) => {
  if(req.cookies.uuid){
    User.findByPk(req.cookies.uuid)
    .then(userOrNull => {
      if(userOrNull){
        req.loggedIn = true;
        next();
      }else{
        next();
      }
    })
    .catch(e => {
      console.log(e);
      next();
    })
  }else{
    next();
  }
})

app.get('/whoami', (req, res, next) => {
  if(req.loggedIn){
    res.send(req.user);
  }else{
    res.sendStatus(401);
  }
})

app.use(express.static(path.join(__dirname, '../dist')));

app.post('/login', (req, res, next) => {
  //console.log(req.body);
  const { username, password} = req.body;

  User.findOne({
    where:{
      username,
      password,
    }
  })
  .then((userOrNull) => {
    //console.log(userOrNull)
    if(userOrNull){
      res.cookie('uuid', userOrNull.id, {
        path: '/',
        expires: moment.utc().add(1,'day').toDate(),
      })
      return res.status(202).send('Success!');
    }
    res.status(401).send("Failure!");
  })
  .catch(e => {
    res.status(500).send('Internal Error!')
  })

})

db.sync({ force: true })
.then(() => User.create({
  username: 'harry@gmail.com',
  password: '12345',
}))
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.greenBright(`Server is listening on http://localhost:${PORT}`));
    });
  })
  .catch(e => {
    console.error(e);
  });
