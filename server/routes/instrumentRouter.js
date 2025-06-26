const Router = require('express') // Импорт Router из Express
const router = new Router() // Создание экземпляра роутера
const instrumentController = require('../controllers/instrumentController') // Импорт контроллера инструментов

router.post('/',instrumentController.create)
router.get('/', instrumentController.getAll)
router.get('/:id', instrumentController.getOne)

module.exports = router