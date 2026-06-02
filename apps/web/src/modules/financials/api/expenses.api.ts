import type { AxiosResponse } from 'axios';
import { financialsApi as globalApi } from '@/api/financials.api';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { Expense, ExpenseListItem, CreateExpensePayload, UpdateExpensePayload, ExpenseFiltersParams } from '../types/expense.types';

export const expensesApi = {
  getAll: (params?: ExpenseFiltersParams): Promise<AxiosResponse<ApiListResponse<ExpenseListItem>>> =>
    globalApi.getExpenses(params) as Promise<AxiosResponse<ApiListResponse<ExpenseListItem>>>,

  getById: (id: string): Promise<AxiosResponse<ApiResponse<Expense>>> =>
    globalApi.getExpenseById(id) as Promise<AxiosResponse<ApiResponse<Expense>>>,

  create: (payload: CreateExpensePayload): Promise<AxiosResponse<ApiResponse<Expense>>> =>
    globalApi.createExpense(payload) as Promise<AxiosResponse<ApiResponse<Expense>>>,

  update: (id: string, payload: UpdateExpensePayload): Promise<AxiosResponse<ApiResponse<Expense>>> =>
    globalApi.updateExpense(id, payload) as Promise<AxiosResponse<ApiResponse<Expense>>>,
};
