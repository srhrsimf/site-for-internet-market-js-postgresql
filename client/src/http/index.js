import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// Авторизованный HTTP-клиент для защищенных запросов
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// Interceptor для логирования запросов (разработка)
$authHost.interceptors.request.use(config => {
    console.log('Отправка запроса на:', config.baseURL + config.url)
    console.log('Полный URL:', config.url) // Относительный путь
    console.log('Параметры:', config.data)
    return config
})

// Interceptor для добавления JWT токена
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor)// Применяем interceptors

export {
    $host,    // Клиент для публичных запросов
    $authHost  // Клиент для авторизованных запросов
}