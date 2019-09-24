import dotenv from 'dotenv';

const path = `${__dirname}/../../../.env.${
  process.env.NODE_ENV.trim() === 'development' ? 'development' : 'production'
}`;

dotenv.config({
  path,
});

// To be accessible across app
const config = {};

config.port = process.env.PORT || 4000;

config.dbUsername = process.env.DB_USERNAME;
config.dbPassword = process.env.DB_PASSWORD;
config.dbName = process.env.DB_NAME;
config.dbHost = process.env.DB_HOST;
config.dbPort = process.env.DB_PORT;

config.jwtEncryption = process.env.JWT_ENCRYPTION;
config.jwtExpiration = process.env.JWT_EXPIRATION || 604800;

config.facebookId = process.env.FACEBOOK_ID;
config.facebookSecret = process.env.FACEBOOK_SECRET;

export default config;
