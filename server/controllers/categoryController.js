const uuid = require('uuid') // Для генерации уникальных имен файлов
const path = require('path') // Для работы с путями файлов
const {Category} = require('../models/models')

class CategoryController {
    async create(req, res) {
        try{
            const {name} = req.body
            const {img} = req.files // Получаем загруженный файл
            // Генерируем уникальное имя файла
            let fileName = uuid.v4() + ".jpg"
            // Сохраняем изображение в папку static
            img.mv(path.resolve(__dirname, `..`, 'static', fileName))

            const category = await Category.create({name, img:fileName})
            return res.json(category)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }
}

module.exports = new CategoryController()