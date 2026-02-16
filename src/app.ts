import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import menuRoutes from './modules/menu/menu.routes';
import categoryRoutes from './modules/category/category.routes';
import { sequelize } from './config/sequelize';
import { errorHandler } from './middlewares/errorHandler';
import auditRoutes from './modules/audit/audit.routes';

const app = express();
app.use(express.json());

(async () => {
  await sequelize.authenticate();
  console.log('DB connected');
})();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/menu', menuRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/audit', auditRoutes);
app.use(errorHandler);

export default app;
