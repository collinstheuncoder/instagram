import mongoose from 'mongoose';

import config from '../config';

const { db_username, db_password, db_host, db_port, db_name } = config;

const db_url = `mongodb://${db_username}:${db_password}@${db_host}.mlab.com:${db_port}/${db_name}`;

// DB Config
mongoose.Promise = global.Promise;
mongoose
  .connect(
    db_url,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('Successful DB connection'))
  .catch(error => console.log(`Connection error: ${error}`));
