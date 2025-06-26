// Импортируем необходимые модули
const Router = require('express') // Импортируем Express Router
const router = new Router() // Создаем экземпляр роутера

// Импортируем отдельные роутеры для разных частей приложения
const instrumentRouter = require('./instrumentRouter') // Роутер для работы с инструментами
const userRouter = require('./userRouter') // Роутер для работы с пользователями
const categoryRouter = require('./categoryRouter') // Роутер для работы с категориями
const basketRouter = require('./basketRouter') // Роутер для работы с категориями

router.use('/user', userRouter)
router.use('/instrument', instrumentRouter)
router.use('/category', categoryRouter)
router.use('/basket', basketRouter)

module.exports = router
