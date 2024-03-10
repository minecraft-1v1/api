import { Router } from 'express';

import limiter from '@/config/limiter';

const router = Router();

router.post('/login', limiter, (req, res) => {
  res.send('success');
});

router.get('/hello', (req, res, next) => {
  res.locals.message = 'word';
  next();
});

export default router;
