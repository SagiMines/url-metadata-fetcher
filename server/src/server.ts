import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { fetchMetadata } from './routes/fetch-metadata';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use('/fetch-metadata', limiter);

// Apply 'fetch-metadata' route handler
app.use('/fetch-metadata', fetchMetadata);

// Server initializer
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { server, app };
