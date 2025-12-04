import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import {
  getDashboardStats,
  searchUsers,
  getUserDetails,
  getTransactions,
  generateFakeDataForUser,
  exportUserReport,
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
    };

    const users = await searchUsers(filters);

    res.status(200).json({
      success: true,
      data: users,
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
    };

    const transactions = await getTransactions(filters);

    res.status(200).json({
      success: true,
      data: transactions,
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

