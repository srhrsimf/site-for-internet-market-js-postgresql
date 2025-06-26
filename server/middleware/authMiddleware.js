const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        // Получаем токен из заголовка "Authorization". Формат: "Bearer <token>"
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Пользователь не авторизован" });
        }
        // Расшифровываем токен. Если он невалидный, jwt.verify выбросит ошибку
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // Добавляем расшифрованные данные в объект запроса
        req.user = decoded;
        next(); // Передаем управление следующему обработчику (вашему контроллеру)
    } catch (e) {
        res.status(401).json({ message: "Пользователь не авторизован" });
    }
};