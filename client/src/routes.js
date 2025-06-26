import {
    ADMIN_ROUTE,
    INSTRUMENT_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    CATEGORY_ROUTE
} from "./utils/consts"; // Импорт констант с путями
import Admin from "./pages/Admin"; // Админ-панель
import Shop from "./pages/Shop"; // Главная страница магазина
import Auth from './pages/Auth'; // Страница авторизации/регистрации
import InstrumentPage from "./pages/InstrumentPage"; // Страница отдельного инструмента
import CategoryPage from "./pages/CategoryPage"; // Страница отдельного инструмента

export const authRoutes = [
    {
        path: ADMIN_ROUTE, // Путь из констант (например '/admin')
        Component: Admin // Компонент для отображения
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CATEGORY_ROUTE+ '/:id',
        Component: CategoryPage
    },
    {
        path: INSTRUMENT_ROUTE + '/:id', // Динамический путь для инструмента (например '/instrument/1')
        Component: InstrumentPage // Страница конкретного инструмента
    }
]