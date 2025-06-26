const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');
const ApiError = require('../error/ApiError');


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, // Данные для шифрования в токене
        process.env.SECRET_KEY, // Секретный ключ из переменных окружения
        {expiresIn: '24h'} // Срок действия токена
    )
}

class UserController {
    async registration(req, res, next) {
        // Получаем email, password и role из тела запроса
        const {email, password, role} = req.body
        // Проверка на наличие обязательных полей
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        // Проверка на существование пользователя с таким email
        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPwd = await bcrypt.hash(password, 5) // Хеширование пароля
        const user = await User.create({email, role, password: hashPwd}) // Создание пользователя
        const token = generateJwt(user.id, user.email, user.role) // Генерация токена
        console.log(token)
        return res.json({token}) // Возвращаем токен клиенту
    }

    async login(req, res, next) {
        const {email, password} = req.body
        // Поиск пользователя по email
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Неверный email'))
        }
        // Сравнение паролей
        let comparePwd = bcrypt.compareSync(password, user.password)
        if(!comparePwd) {
            return next(ApiError.internal('Неверный email'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        console.log(token)
        return res.json({token})
    }

    async check(req, res, next) {
        // Генерация нового токена (продление срока действия)
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        console.log(token)
        return res.json({token})
    }
}

module.exports = new UserController()