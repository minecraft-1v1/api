import { Router } from 'express';

import * as minecraftServerController from '../controllers/minecraftServer/minecraftServerController';

const router = Router();

router.route('/').post(minecraftServerController.create);

router
  .route('/:serverId')
  .get(minecraftServerController.detail)
  .delete(minecraftServerController.destroy);

export default router;
