import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../services/userService';
import type { User } from '../types/user';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ page, limit, search }: { page: number, limit: number, search?: string }) => {
        const response = await userService.getUsers(page, limit, search);
        return response;
    }
);

interface UserState {
    items: User[];
    localCreatedUsers: User[];
    loading: boolean;
    error: string | null;
    total: number;
    currentPage: number;
    selectedUser: User | null;
}

const initialState: UserState = {
    items: [],
    localCreatedUsers: [],
    loading: false,
    error: null,
    total: 0,
    currentPage: 1,
    selectedUser: null,
};

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id: number, { getState }) => {
        const state = getState() as { users: UserState };
        const localUser = state.users.localCreatedUsers.find(u => u.id === id);

        if (localUser) {
            return localUser;
        }

        return await userService.getUserById(id);
    }
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData: Omit<User, 'id'>) => {
        return await userService.createUser(userData);
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id: number) => {
        await userService.deleteUser(id);
        return id;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                if (state.currentPage === 1) {
                    state.items = [...state.localCreatedUsers, ...action.payload.data];
                    state.total = action.payload.total + state.localCreatedUsers.length;
                } else {
                    state.items = action.payload.data;
                    state.total = action.payload.total + state.localCreatedUsers.length;
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Bir hata oluştu.';
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
                state.localCreatedUsers.unshift(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.items = state.items.filter(user => user.id !== action.payload);
                state.localCreatedUsers = state.localCreatedUsers.filter(user => user.id !== action.payload);
                state.loading = false;
            })
    }
});


export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;