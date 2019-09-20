import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import path from 'path';

import routes from './routes';

// DB Config
import './db';

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(cors());

// Routes Config
app.use('/users', routes.userRouter);
app.use('/auth', routes.authRouter);
app.use('/posts', routes.postsRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client', 'build', 'index.html'));
  });
}

export default app;
