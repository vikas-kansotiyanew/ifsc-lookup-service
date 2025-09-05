import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'mysql',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'ifsc_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;