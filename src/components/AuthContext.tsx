import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';
import type { AuthContextType } from '../types/AuthContextType';
import type { User } from '../types/UserType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        let timeout: ReturnType<typeof setTimeout> | null = null;

        if (token && storedUser) {
            try {
                const parts = token.split('.');
                if (parts.length !== 3) throw new InvalidTokenError('Token does not have 3 parts');

                const decoded = jwtDecode<{ sub: string; role: string; exp: number }>(token);
                const now = Date.now() / 1000;

                if (decoded.exp && decoded.exp < now) {
                    console.warn('AuthProvider: Token has expired');
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                } else {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);

                    const msUntilExpiration = decoded.exp * 1000 - Date.now();
                    timeout = setTimeout(() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setUser(null);
                    }, msUntilExpiration);
                }
            } catch (e) {
                console.error('AuthProvider: Failed to decode token', e);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
            }
        }

        setLoading(false);
        return () => { if (timeout) clearTimeout(timeout); };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;
