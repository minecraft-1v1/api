import { Router } from 'express';

import limiter from '@/config/limiter';

const router = Router();

router.post('/login', limiter, (req, res) => {
  res.send('success');
});

router.get('/healthy', (req, res, next) => {
  res.locals.message = 'The service is healthy!';
  next();
});

export default router;
