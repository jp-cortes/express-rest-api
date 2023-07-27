require('dotenv').config({ path: '../.env' });

//postgres config
const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtRecovery: process.env.JWT_SECRET_RECOVERY_MAIL,
  nodeMailer: {
    port: process.env.NODE_MAILER_PORT,
    host: process.env.NODE_MAILER_HOST,
    user: process.env.NODE_MAILER_APP_USER,
    password: process.env.NODE_MAILER_APP_PASSWORD,
  },
  frontEndUrl:process.env.FRONTEND_URL,
};


module.exports = { config }
