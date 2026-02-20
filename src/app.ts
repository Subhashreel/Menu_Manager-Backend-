import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import menuRoutes from './modules/menu/menu.routes';
import categoryRoutes from './modules/category/category.routes';
import { sequelize } from './config/sequelize';
import { errorHandler } from './middlewares/errorHandler';
import auditRoutes from './modules/audit/audit.routes';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:8081', 'http://localhost:3000'],
    credentials: true,
  })
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({ alter: true });
    console.log('DB synced');
  } catch (err) {
    console.error('DB connection/sync error', err);
    process.exit(1);
  }
})();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/menu', menuRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/audit', auditRoutes);
app.use(errorHandler);

export default app;
