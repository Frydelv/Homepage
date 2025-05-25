import { env } from '$env/dynamic/public';

interface User {
    email: string;
    createdAt: string;
    displayName: string;
    username: string;
}

interface AuthResponse {
    isAuthenticated: boolean;
    user?: User;
}

export async function checkAuth(): Promise<AuthResponse> {
    try {
        const response = await fetch(`${env.PUBLIC_SERVER_URL}/v1/user/profile`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            return { isAuthenticated: true, user: data.user };
        }
        return { isAuthenticated: false };
    } catch (error) {
        console.error('Auth check failed:', error);
        return { isAuthenticated: false };
    }
}

export function redirectToLogin(): void {
    window.location.href = '/login';
}