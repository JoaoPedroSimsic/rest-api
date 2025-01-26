import { Router } from 'express';
import UserController from '../controllers/user';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.post('/', UserController.store);
router.put('/', loginRequired, UserController.update);
router.delete('/:id', loginRequired, UserController.delete);

export default router;
