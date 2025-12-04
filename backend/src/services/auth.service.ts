import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateAccessToken, generateRefreshToken, TokenPayload } from '../utils/jwt';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types/auth';
import { AppError } from '../middleware/errorHandler';

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const { email, password, nickname, firstName, lastName } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const error: AppError = new Error('User with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      nickname: nickname || 'Newbie Guy',
      firstName,
      lastName,
    },
    select: {
      id: true,
      email: true,
      nickname: true,
      firstName: true,
      lastName: true,
      avatar: true,
      role: true,
    },
  });

  // Generate tokens
  const tokenPayload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Send registration email
  try {
    const { sendRegistrationEmail } = await import('./email.service');
    await sendRegistrationEmail(user.email, { username: user.nickname || 'User' });
  } catch (error) {
    console.error('Failed to send registration email:', error);
    // Don't fail registration if email fails
  }

  return {
    user,
    token,
    refreshToken,
    expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
  };
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const { email, password } = data;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const error: AppError = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Verify password
  const isValidPassword = await comparePassword(password, user.passwordHash);

  if (!isValidPassword) {
    const error: AppError = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Generate tokens
  const tokenPayload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  return {
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname || 'Newbie Guy',
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      avatar: user.avatar || undefined,
      role: user.role,
    },
    token,
    refreshToken,
    expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
  };
};

