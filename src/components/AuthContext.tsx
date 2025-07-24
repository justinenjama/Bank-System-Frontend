import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getSessionUser } from "../service/Service"; 
import type { AuthContextType } from '../types/AuthContextType';
import type { User } from '../types/UserType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessionUser = async () => {
            try {
                const cachedUser = localStorage.getItem("bank_user");
                if (cachedUser) {
                    setUser(JSON.parse(cachedUser));
                    return;
                }

                const res = await getSessionUser();
                setUser(res);
                localStorage.setItem("bank_user", JSON.stringify(res));

            } catch (error) {
                console.error('AuthProvider: Not authenticated', error);
                setUser(null);
                localStorage.removeItem("bank_user");
            } finally {
                setLoading(false);
            }
        };

        fetchSessionUser();
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
