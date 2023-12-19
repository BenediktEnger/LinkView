import express, { Request, Response, NextFunction } from 'express';
import linkRoutes from './routes/links';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { connectDatabase } from './database/connectDatabase';

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json())
app.use('/links', linkRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

(async () => {
  await connectDatabase()
})()

