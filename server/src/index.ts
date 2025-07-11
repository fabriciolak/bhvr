import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import routes from './routes';

dotenv.config()

console.log(process.env.PORT)

const app = express();
const PORT = process.env.PORT || 5000

const startTime = performance.now();

app.use(cors());
app.use(express.json());

// /api/v1/
app.use('/api/', routes);

app.listen(PORT, () => {
  const duration = Math.round(performance.now() - startTime);
  console.log(`\nSERVER ready in ${duration} ms\n`);
  console.log(`➜  Local:   http://localhost:${PORT}/\n`);
});
