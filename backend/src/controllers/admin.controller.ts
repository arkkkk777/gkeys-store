import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import {
  getDashboardStats,
  searchUsers,
  getUserDetails,
  getTransactions,
  generateFakeDataForUser,
  exportUserReport,
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllOrders,
  updateOrderStatus,
} from '../services/admin.service';
import { UserSearchFilters, TransactionFilters } from '../types/admin';

export const getDashboardController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const searchUsersController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters: UserSearchFilters = {
      query: req.query.query as string | undefined,
      email: req.query.email as string | undefined,
      name: req.query.name as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined,
    };

    const result = await searchUsers(filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDetailsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userDetails = await getUserDetails(id);

    res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters: TransactionFilters = {
      method: req.query.method as string | undefined,
      status: req.query.status as string | undefined,
      startDate: req.query.startDate as string | undefined,
      endDate: req.query.endDate as string | undefined,
      transactionHash: req.query.transactionHash as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined,
    };

    const result = await getTransactions(filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const generateFakeDataController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const webhookData = req.body;

    await generateFakeDataForUser(id, webhookData);

    res.status(200).json({
      success: true,
      message: 'Fake data generated',
    });
  } catch (error) {
    next(error);
  }
};

export const exportUserReportController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const pdfBuffer = await exportUserReport(id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=user-report-${id}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};

export const syncG2AController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { syncG2ACatalog } = await import('../services/g2a.service');
    await syncG2ACatalog();

    res.status(200).json({
      success: true,
      message: 'G2A catalog sync started',
    });
  } catch (error) {
    next(error);
  }
};

// Games CRUD controllers
export const getGamesController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 20;

    const result = await getAllGames(page, pageSize);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createGameController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createGame(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGameController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await updateGame(id, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGameController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await deleteGame(id);

    res.status(200).json({
      success: true,
      message: 'Game deleted',
    });
  } catch (error) {
    next(error);
  }
};

// Blog Posts CRUD controllers
export const getBlogPostsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 20;

    const result = await getAllBlogPosts(page, pageSize);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createBlogPostController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createBlogPost(req.body, req.user!.id);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPostController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await updateBlogPost(id, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPostController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await deleteBlogPost(id);

    res.status(200).json({
      success: true,
      message: 'Blog post deleted',
    });
  } catch (error) {
    next(error);
  }
};

// Orders controllers
export const getOrdersController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 20;
    const status = req.query.status as string | undefined;

    const result = await getAllOrders(page, pageSize, status);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatusController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateOrderStatus(id, status);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
