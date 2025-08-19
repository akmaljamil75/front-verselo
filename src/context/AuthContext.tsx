// import React, { createContext, useState, useEffect, useContext } from 'react';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: { name: string; email: string; token: string } | null;
//   login: (token: string, name: string, email: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [user, setUser] = useState<{ name: string; email: string; token: string } | null>(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('authToken');
//     const storedUser = localStorage.getItem('authUser');
//     if (storedToken && storedUser) {
//       setIsAuthenticated(true);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (token: string, name: string, email: string) => {
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('authUser', JSON.stringify({ name, email, token }));
//     setIsAuthenticated(true);
//     setUser({ name, email, token });
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('authUser');
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }; 