import pkg from 'pg';
const { Pool } = pkg;
import config from '../config/config.js';
import logger from '../logging/logger.js';

const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
});
pool.connect()
  .then(() => {
    logger.logger.info('Connected to PostgreSQL');
    console.log('Connected to PostgreSQL');
  })
  .catch(err => {
    logger.logger.error(`Connection error: ${err}`);
    console.error('Connection error : ', err)
  });

// Export
export default {
  query: (text, params) => pool.query(text, params),
};