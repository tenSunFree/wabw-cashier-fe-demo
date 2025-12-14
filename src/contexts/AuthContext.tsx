import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
    // sync w backend jwt schema/payload
    sub: string;
    username: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (token: string) => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    console.log('AuthProvider rendered, token:', token);
    const [user, setUser] = useState<User | null>(null);
    console.log('AuthProvider rendered, user:', user);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    console.log('AuthProvider rendered, isLoading:', isLoading);

    useEffect(() => {
        console.log('AuthProvider useEffect');
        const storedToken = localStorage.getItem('token');
        // const storedToken: string | null = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedUser: User = jwtDecode(storedToken);
                setToken(storedToken);
                setUser(decodedUser);
            } catch (error) {
                console.error('Invalid token found in storage:', error);
                localStorage.removeItem('token');
            }
        }
        setIsLoading(false);
    }, []);

    const handleSignIn = (newToken: string) => {
        console.log('AuthProvider handleSignIn, newToken:', newToken);
        try {
            const decodedUser: User = jwtDecode(newToken);
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(decodedUser);
        } catch (error) {
            console.error('Failed to decode token on sign in:', error);
        }
    };

    const handleSignOut = () => {
        console.log('AuthProvider handleSignOut');
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            token,
            isAuthenticated: !!token,
            isLoading,
            signIn: handleSignIn,
            signOut: handleSignOut,
        }),
        [user, token, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};