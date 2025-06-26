require('dotenv').config() // Загружает переменные окружения из .env файла
const express = require('express') // Фреймворк для создания сервера
const sequelize = require('../../тест1/server/db') // Подключение к БД через Sequelize
const models = require('./models/models') // Модели Sequelize
const cors = require('cors') // Middleware для обработки CORS
const fileUpload = require('express-fileupload') // Middleware для загрузки файлов
const router = require('./routes/index') // Основной роутер приложения
const path = require('path') // Работа с путями файловой системы

const PORT = process.env.PORT || 5000 // Порт из .env или 5000 по умолчанию
const app = express() // Создание экземпляра Express

app.use(cors()) // Включает CORS для всех запросов
app.use(express.json()) // Парсит JSON в теле запроса
app.use(express.static(path.resolve(__dirname, 'static'))) // Раздает статику из папки static
app.use(fileUpload({})) // Включает загрузку файлов
app.use('/api', router) // Подключает роуты по префиксу /api
app.use('/static', express.static('static')); // Раздача файлов из папки static // Альтернативный путь к статике


const start = async () => {
    try {
        await sequelize.authenticate() // Проверка подключения к БД
        await sequelize.sync() // Синхронизация моделей с БД
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // Запуск сервера
    } catch(e) {
        console.log(e) // Логирование ошибок при запуске
    }
}

start()