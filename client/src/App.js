import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom"; // Для маршрутизации
import AppRouter from "./components/AppRouter"; // Компонент с маршрутами
import NavBar from "./components/NavBar"; // Навигационная панель
import {observer} from "mobx-react-lite"; // Декоратор для MobX
import {Context} from "./index"; // Глобальный контекст
import {check} from "./http/userAPI"; // API для проверки авторизации
import {Spinner} from "react-bootstrap"; // Индикатор загрузки
import { jwtDecode } from "jwt-decode";

// Оборачиваем компонент в observer для реактивности MobX
const App = observer(() => {
    // Получаем хранилище пользователя из контекста
    const {user} = useContext(Context)
    // Состояние для отображения индикатора загрузки
    const [loading, setLoading] = useState(true)

    // Эффект для проверки авторизации при монтировании
    useEffect(() => {
        // Вызываем check() для проверки авторизации
        check().then(data => {
            // Если токен валиден, сервер вернет новый токен,
            // который мы декодируем и сохраняем данные пользователя
            const decodedUser = jwtDecode(data.token);
            user.setUser(decodedUser);
            user.setIsAuth(true);
        }).catch(error => {
        }).finally(() => {
            // В любом случае (успех или ошибка) убираем загрузку
            setLoading(false);
        });
    }, []); // Пустой массив зависимостей, чтобы выполнилось один раз при старте


    if(loading){
        return <Spinner animation={"grow"}/>
    }
    console.log("Авторизация " + user.isAuth)
    // Основной рендер приложения
    return (
        <BrowserRouter>
            <NavBar /> {/* Навигационное меню */}
            <AppRouter /> {/* Маршрутизация */}
        </BrowserRouter>
    );
});

export default App;
