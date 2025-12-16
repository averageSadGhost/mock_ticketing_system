import { createContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '../types';
import { mockUsers } from '../services/mockData';

const AUTH_STORAGE_KEY = 'railway_auth';
const USERS_STORAGE_KEY = 'railway_users';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize users in localStorage if not present
  useEffect(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!storedUsers) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));
    }
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      const user = JSON.parse(storedAuth);
      dispatch({ type: 'SET_USER', payload: user });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : mockUsers;

    const user = users.find(
      (u: { email: string; password: string }) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      dispatch({ type: 'SET_USER', payload: userWithoutPassword });
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const register = async (data: RegisterData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Check if email already exists
    if (users.some((u: { email: string }) => u.email === data.email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    dispatch({ type: 'SET_USER', payload: userWithoutPassword });

    return { success: true, message: 'Registration successful' };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
