const ROOT_DIR = __dirname;

const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;

const MONGODB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017`;

module.exports = {
  ROOT_DIR,
  MONGODB_URI,
};
