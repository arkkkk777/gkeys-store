import apiClient from './api';

export interface BalanceTopUpRequest {
  amount: number;
  currency: string;
  paymentMethod: string;
  promoCode?: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  redirectUrl: string;
  status: string;
}

export const paymentApi = {
  /**
   * Create a balance top-up payment intent
   */
  createBalanceTopUp: async (data: BalanceTopUpRequest): Promise<PaymentIntent> => {
    const response = await apiClient.post<{ success: boolean; data: PaymentIntent }>(
      '/api/payment/balance-top-up',
      data
    );
    return response.data;
  },
};
