export interface UserType {
    name: string, email: string
}

export const setSession = (token: string, user : UserType) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export const getSession = () => {
    const token = localStorage.getItem('token');
    const userJsonString  = localStorage.getItem('user');
    const user : UserType = userJsonString != null ? JSON.parse(userJsonString) : userJsonString;
    return { token, user };
} 

export const removeSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export const isAuthenticated = (): boolean => {
    const session = getSession();
    return session.token !== null && session.user !== null;
}