import mongoose from 'mongoose';

// import config from '../config';

// const { dbUsername, dbPassword, dbHost, dbPort, dbName } = config;

// const dbUri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}.mlab.com:${dbPort}/${dbName}`;

const dbUri =
  'mongodb+srv://collinstheuncoder:afterMATH@1988@instagram-iwn7m.mongodb.net/test?retryWrites=true';

// DB Config
mongoose.Promise = global.Promise;
mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Successful DB connection'))
  .catch(error => console.log(`Connection error: ${error}`));
mongoose.set('useFindAndModify', false);
