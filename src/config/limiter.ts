import { rateLimit } from 'express-rate-limit';

const MINUTE = 60 * 1000;

const limiter = rateLimit({
  windowMs: 15 * MINUTE,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
