import sequelize from '../config/database.config';
import IFSC from './ifsc.model';

export { IFSC };

export const initModels = async () => {
  await sequelize.sync({ alter: true }); 
  // `alter: true` will create the table if it doesn’t exist, 
  // and update schema if it changed (safe for dev).
  // Use { force: true } only if you want to drop & recreate tables.
  return { IFSC };
};
