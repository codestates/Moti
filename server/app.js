const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const port = 80;

//const controllers = require('./controllers');

global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE']
    })
  );

app.use(cookieParser());

// app.post('/login', controllers.signin);
// app.post('/signup', controllers.signup);
app.use('/post', postRouter);
app.use('/user', userRouter);


app.get('/',(req,res)=>{
    res.status(201).send('hello world');
})

app.listen(port,()=>{
    console.log('server running');
})