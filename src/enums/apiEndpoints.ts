export const ApiEndpoints = {
    USERS: '/users',
    POSTS: '/posts',
    COMMENTS: '/comments',
} as const;

export type ApiEndpoints = typeof ApiEndpoints[keyof typeof ApiEndpoints];
