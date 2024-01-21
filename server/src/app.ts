import express, { Request, Response, NextFunction } from 'express';
import {router as linkRoutes} from './routes/links'
import {router as authRoutes} from './routes/auth'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

const app = express();

app.use(express.json())
app.use('/links', linkRoutes)
app.use('/auth', authRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
  });

export default app;