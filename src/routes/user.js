import { Router } from 'express';
import UserController from '../controllers/user';

const router = new Router();

router.get('/', UserController.index);
router.post('/', UserController.store);

export default router;
