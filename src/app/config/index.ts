import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join((process.cwd(), '.env')),
});

export default {
  port: process.env.PORT,
  database: process.env.DATABASE_URI,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};
