import {$authHost, $host} from "./index";

export const registration = async(email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role:'USER'}) // Все новые пользователи регистрируются как ADMIN
    // Сохраняем токен в localStorage
    localStorage.setItem('token', data.token)
    return data;
}

export const login = async(email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return data;
}

export const check = async() => {
    // Получаем токен из localStorage
    const token = localStorage.getItem('token');

    // ЕСЛИ ТОКЕНА НЕТ - просто выбрасываем ошибку, чтобы .catch в App.js ее поймал
    if (!token) {
        return Promise.reject(new Error("Токен не найден"));
    }

    // Эта часть кода выполнится, только если токен есть
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return data;
}