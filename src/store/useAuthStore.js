import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    // 1. Наши состояния (стейт)
    user: null,
    isAuth: false,
    isLoading: true,

    // 2. Функции для изменения состояний (экшены)
    login: (userData) => {
        localStorage.setItem("userRole", userData.role);
        set({ user: userData, isAuth: true });
    },

    logout: () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ user: null, isAuth: false });
    },

    // Функция для проверки сессии при загрузке сайта (вместо useEffect в контексте)
    checkAuth: () => {
        const savedRole = localStorage.getItem("userRole");
        if (savedRole) {
            set({ isAuth: true, user: { role: savedRole }, isLoading: false });
        } else {
            set({ isLoading: false });
        }
    }
}))