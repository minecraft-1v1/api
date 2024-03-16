import { Router } from 'express';

import * as minecraftServerController from '../controllers/minecraftServerController';

const router = Router();

router.post('/', minecraftServerController.create);
router.get('/:serverId', minecraftServerController.describe)

export default router;