import axiosClient from './axiosClient';
import type { User, UsersResponse } from '../types/user';

export const userService = {
    getUsers: async (page: number, limit: number, search?: string): Promise<{ data: User[], total: number }> => {
        const response = await axiosClient.get<User[]>(`/users`, {
            params: { _page: page, _limit: limit, q: search }
        });
        return {
            data: response.data,
            total: 10
        };
    },

    createUser: async (user: Omit<User, 'id'>): Promise<User> => {
        const response = await axiosClient.post<User>(`/users`, user);
        return response.data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await axiosClient.delete(`/users/${id}`);
    },

    getUserById: async (id: number): Promise<User> => {
        const response = await axiosClient.get<User>(`/users/${id}`);
        return response.data;
    }
};


