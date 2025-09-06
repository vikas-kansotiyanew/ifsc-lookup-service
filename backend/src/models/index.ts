import sequelize from '../config/database.config';
import IFSC from './ifsc.model';

export { IFSC };

export const initModels = async () => {
  await sequelize.sync({ alter: true }); 
  return { IFSC };
};
