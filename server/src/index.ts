import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Optimization Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: '*', // Allow Vercel frontend / local dev
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Rate Limiter: 150 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});
app.use('/api', limiter);

// Mount API Routes
app.use('/api/v1', apiRoutes);

// Root Health & System Diagnostics
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Political Intelligence Platform API',
    constituency: 'Hyderabad Parliamentary Constituency (Telangana)',
    version: '1.0.0',
    documentation: '/api/v1/overview',
    endpoints: [
      '/api/v1/overview',
      '/api/v1/elections',
      '/api/v1/trends/vote-share',
      '/api/v1/assembly-segments',
      '/api/v1/demographics',
      '/api/v1/parties',
      '/api/v1/intelligence-insights'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`[API Server] Running at http://localhost:${PORT}`);
});

export default app;
