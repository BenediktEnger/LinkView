import express, { Request, Response, NextFunction } from 'express';
import linkRoutes from './routes/links';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { dataAccessLayer } from './models/Mongoose/MongooseDataAccess';

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

async function connect() {
  await dataAccessLayer.connect('mongodb://127.0.0.1:27017/', 'Links')
}

connect()