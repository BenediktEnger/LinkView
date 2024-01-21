import { dataAccessLayer } from './models/Mongoose/MongooseDataAccess';
import app from './app';

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

async function connect() {
  await dataAccessLayer.connect('mongodb://127.0.0.1:27017/', 'Links')
}

connect()

