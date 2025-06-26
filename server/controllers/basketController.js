const { Basket, Instrument } = require('../models/models'); // Убедитесь, что путь к вашим моделям верный
const ApiError = require('../error/ApiError'); // Предполагается, что у вас есть класс для обработки ошибок

class BasketController {
    //создание
    async create(req, res, next) {
        try {
            const { userId, instrumentId } = req.body;

            // Проверяем, есть ли уже этот товар в корзине у этого пользователя
            const basketItem = await Basket.findOne({
                where: { userId, instrumentId }
            });

            if (basketItem) {
                // Если есть, увеличиваем счетчик
                basketItem.count += 1;
                await basketItem.save();
                return res.json(basketItem);
            } else {
                // Если нет, создаем новую запись в корзине
                const newBasketItem = await Basket.create({
                    userId,
                    instrumentId,
                    count: 1 // При первом добавлении количество равно 1
                });
                return res.json(newBasketItem);
            }

        } catch (e) {
            // Передаем ошибку в следующий middleware
            next(ApiError.badRequest(e.message));
        }
    }
    //выборка
    async getAll(req, res, next) {
        try {
            const { userId } = req.query; // Получаем ID пользователя из query-параметров

            if (!userId) {
                return next(ApiError.badRequest('Не указан userId'));
            }

            const basket = await Basket.findAll({
                where: { userId },
                include: [{
                    model: Instrument // Присоединяем модель Instrument, чтобы получить детали товара
                }],
                order: [ // Опционально: сортируем, чтобы новые товары были сверху
                    ['createdAt', 'DESC']
                ]
            });

            // Возвращаем все найденные позиции в корзине
            return res.json(basket);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    //удаление
    async delete(req, res, next) {
        try {
            // Получаем id записи в корзине, которую нужно удалить.
            // Например, из URL /api/basket/15, где 15 - это id
            const { id } = req.params;

            // Ищем и удаляем запись по ее первичному ключу
            const deletedRows = await Basket.destroy({
                where: { id }
            });

            if (deletedRows === 0) {
                // Если ничего не было удалено, значит, записи с таким id не существует
                return next(ApiError.notFound('Позиция в корзине не найдена'));
            }

            // Возвращаем сообщение об успехе
            return res.json({ message: 'Позиция успешно удалена из корзины' });

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    //обновление
    async update(req, res, next) {
        try {
            const { id } = req.params; // ID записи в корзине
            const { count } = req.body; // Новое количество

            if (!count || count < 0) {
                return next(ApiError.badRequest('Некорректное количество'));
            }

            const basketItem = await Basket.findOne({ where: { id } });
            if (!basketItem) {
                return next(ApiError.notFound('Позиция в корзине не найдена'));
            }

            // Обновляем количество
            basketItem.count = count;
            await basketItem.save();

            // Возвращаем обновленный объект
            return res.json(basketItem);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}


module.exports = new BasketController()