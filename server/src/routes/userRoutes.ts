import express from 'express';
import { getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;
