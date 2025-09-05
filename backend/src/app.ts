import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createRateLimiter } from './middlewares/rateLimit.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import routes from './routes/index';
import { sequelize, redisClient } from './config/index';
import { initModels } from './models';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(createRateLimiter());

app.use('/api', routes);

app.use(errorHandler);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await initModels(); // <-- this will sync your models with DB

    await redisClient.connect();
    console.log('✅ Redis connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;