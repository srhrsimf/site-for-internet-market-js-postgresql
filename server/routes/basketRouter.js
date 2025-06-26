const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware для проверки авторизации


router.post('/', basketController.create);
router.get('/', basketController.getAll);
router.delete('/:id', basketController.delete);
router.put('/:id', basketController.update);


module.exports = router;