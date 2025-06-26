const Router = require('express') // Импорт Router из Express
const router = new Router() // Создание экземпляра роутера
const userController = require('../controllers/userController') // Импорт контроллера пользователей
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router