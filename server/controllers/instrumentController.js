const uuid = require('uuid') // Для генерации уникальных имен файлов
const path = require('path') // Для работы с путями файлов
const {Instrument, Category} = require("../models/models");
const {badRequest} = require("../error/ApiError");

class InstrumentController {
    async create(req, res, next) {
        try{
            // Получаем данные из тела запроса
            let {name, price, categoryId, info} = req.body
            const {img} = req.files // Получаем загруженный файл
            // Генерируем уникальное имя файла
            let fileName = uuid.v4() + ".jpg"
            // Сохраняем изображение в папку static
            img.mv(path.resolve(__dirname, `..`, 'static', fileName))

            // Создаем запись об инструменте в БД
            const instrument = await Instrument.create({
                name,
                price,
                categoryId,
                img: fileName,
                info
            });
            return res.json(instrument)
        }catch(e){
            next(badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { categoryId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        // Создаем объект опций для Sequelize
        const options = {
            limit,
            offset,
            where: {}, // Изначально 'where' пустой
            include: [{ model: Category, as: 'category' }]
        };

        // Если categoryId пришел, добавляем его в 'where'
        if (categoryId) {
            options.where.categoryId = categoryId;
        }

        // Выполняем запрос с собранными опциями
        const instruments = await Instrument.findAndCountAll(options);

        return res.json(instruments);
    }

    async getOne(req, res) {
        let {id} = req.params
        const instrument = await Instrument.findOne(
            {
                where: {id},
            }
        )
        return res.json(instrument)
    }
}

module.exports = new InstrumentController()