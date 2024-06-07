export interface AuthSubmitBody {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    username: string;
    user_id: number;
}
