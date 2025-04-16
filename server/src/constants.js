const ROOT_DIR = __dirname;

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const MONGODB_URI = process.env.NODE_ENV === "development"
  ? `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`
  : process.env.MONGO_DB_URI;

module.exports = {
  ROOT_DIR,
  MONGODB_URI,
};
