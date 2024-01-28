import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    LogOutUser,
    getUserProfile,
    UpdateUserProfile
} from '../controller/userController.js';
import { protect } from '../../middleware/authMiddelware.js';

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', LogOutUser)
// router.route('/profile').get(getUserProfile).put(UpdateUserProfile)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, UpdateUserProfile)



export default router