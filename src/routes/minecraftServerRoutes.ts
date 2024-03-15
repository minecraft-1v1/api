import { Router } from 'express';

import * as minecraftServerController from '../controllers/minecraftServerController';

const router = Router();

router.post('/minecraft-server', minecraftServerController.create);

export default router;
