import { Router } from 'express';
import {
  getGamesController,
  getGameByIdController,
  getGameBySlugController,
  getBestSellersController,
  getNewInCatalogController,
  getPreordersController,
  getNewGamesController,
  getGamesByGenreController,
  getRandomGamesController,
  getSimilarGamesController,
  searchGamesController,
} from '../controllers/game.controller';

const router = Router();

router.get('/', getGamesController);
router.get('/search', searchGamesController);
router.get('/best-sellers', getBestSellersController);
router.get('/new-in-catalog', getNewInCatalogController);
router.get('/preorders', getPreordersController);
router.get('/new', getNewGamesController);
router.get('/by-genre/:genre', getGamesByGenreController);
router.get('/random', getRandomGamesController);
router.get('/:id/similar', getSimilarGamesController);
router.get('/slug/:slug', getGameBySlugController);
router.get('/:id', getGameByIdController);

export default router;

