import { Router } from 'express';
import {
  getArticlesController,
  getArticleByIdController,
  getArticleBySlugController,
} from '../controllers/blog.controller';

const router = Router();

router.get('/articles', getArticlesController);
router.get('/articles/slug/:slug', getArticleBySlugController);
router.get('/articles/:id', getArticleByIdController);

export default router;

