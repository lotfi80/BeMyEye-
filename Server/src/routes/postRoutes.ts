import express from 'express';
import {getUserPosts} from '../controllers/post';

const router = express.Router();

router.get('/', getUserPosts);

export default router;