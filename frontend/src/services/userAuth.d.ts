// Type definitions for userAuth.js

export interface UserData {
  name: string;
  email: string;
  phone?: string;
  membershipStatus?: string;
  serviceDetails?: {
    branch?: string;
    rank?: string;
    serviceNumber?: string;
    fromDate?: string;
    toDate?: string;
  };
}

export interface AuthResponse {
  token: string;
  user: UserData;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export function registerUser(userData: RegisterData): Promise<AuthResponse>;
export function loginUser(credentials: LoginCredentials): Promise<AuthResponse>;
export function logoutUser(): void;
export function getCurrentUser(): UserData | null;
export function isAuthenticated(): boolean;