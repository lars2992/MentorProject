import { createContext, useState, useEffect } from "react";

// 1. Создаем сам контекст (хранилище)
export const AuthContext = createContext(null);

// 2. Создаем Провайдер — компонент, который будет снабжать данными всё приложение
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Начинаем со стадии загрузки

    useEffect(() => {
        // Здесь мы чуть позже сделаем автоматическую проверку: 
        // если в LocalStorage есть данные, мы восстановим сессию пользователя
        const savedRole = localStorage.getItem("userRole");
        
        if (savedRole) {
            // Фейково восстанавливаем, пока не подключили к базе на 100%
            setIsAuth(true);
            setUser({ role: savedRole }); 
        }
        
        setIsLoading(false); // Проверка завершена
    }, []);

    // Функции для управления состоянием, которые будут доступны везде
    const login = (userData) => {
        setUser(userData);
        setIsAuth(true);
        localStorage.setItem("userRole", userData.role);
    };

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem("userRole");
        localStorage.removeItem("accessToken"); // Чистим за собой
        localStorage.removeItem("refreshToken");
    };

    return (
        // Раздаем состояния и функции через Provider
        <AuthContext.Provider value={{ user, isAuth, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};