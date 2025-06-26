import {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import UserStore from "./store/UserStore"; // Хранилище пользовательских данных
import InstrumentStore from "./store/InstrumentStore"; // Хранилище данных об инструментах
import CategoryStore from "./store/CategoryStore";
import {ToastContainer} from "react-toastify";

// Создаем контекст приложения с null в качестве значения по умолчанию
export const Context = createContext(null)

// Получаем корневой DOM-элемент
const root = createRoot(document.getElementById('root'));

root.render(
    // Оборачиваем приложение в провайдер контекста
    <Context.Provider value={{
        user: new UserStore(),       // Экземпляр хранилища пользователей
        instrument: new InstrumentStore(), // Экземпляр хранилища инструментов
        category: new CategoryStore(), // Экземпляр хранилища инструментов

    }}>

        <App />
        <div>
            {/* Этот контейнер будет отображать все уведомления. Добавьте его в конце. */}
            <ToastContainer
                position="bottom-right" // Позиция (можно изменить)
                autoClose={2000}     // Закрывать через 5 секунд
                hideProgressBar={false}
                closeOnClick
                theme="light"        // Тема: "light", "dark", "colored"
            />
        </div>
    </Context.Provider>
);