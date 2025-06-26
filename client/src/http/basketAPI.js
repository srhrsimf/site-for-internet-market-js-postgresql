import { $host } from "./index"; // Используем $host, т.к. авторизация не нужна по условию

// Функция для получения всех товаров из корзины пользователя
export const fetchBasketItems = async (userId) => {
    const { data } = await $host.get('api/basket', { params: { userId } });
    return data;
};

// Функция для удаления одного товара из корзины по его ID в таблице Basket
export const deleteBasketItem = async (id) => {
    const { data } = await $host.delete(`api/basket/${id}`);
    return data;
};

// Функция для обновления количества товара
export const updateBasketItemCount = async (id, count) => {
    const { data } = await $host.put(`api/basket/${id}`, { count });
    return data;
};

// Функция для обновления товара в корзину
export const addToBasket = async (userId, instrumentId) => {
    // Ваш контроллер ожидает userId и instrumentId в теле запроса
    const { data } = await $host.post('api/basket', { userId, instrumentId });
    return data;
};

