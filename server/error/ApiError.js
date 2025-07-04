class ApiError extends Error {
    constructor(status, message) {
        super(); // Вызываем конструктор родительского класса
        this.status = status; // HTTP-статус код ошибки (400, 404, 500 и т.д.)
        this.message = message; // Сообщение об ошибке для клиента
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError;