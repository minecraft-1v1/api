import { Router } from 'express';

import minecraftServerRoutes from './minecraftServerRoutes';

const router = Router();

router.get('/health', (req, res, next) => {
  res.locals.message = 'The service is healthy!';
  next();
});

router.use('/minecraft-server', minecraftServerRoutes);

export default router;
