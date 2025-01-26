import { Router } from 'express';
import NoteController from '../controllers/note';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, NoteController.index); // show all posts
router.get('/:id', loginRequired, NoteController.show); // show a specific post
router.post('/post', loginRequired, NoteController.store); // create a post
router.put('/:id', loginRequired, NoteController.update); // update an existing post
router.delete('/:id', loginRequired, NoteController.delete); // delete a post

export default router;
