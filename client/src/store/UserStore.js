import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor(){
        // Приватные свойства хранилища
        this._isAuth = false; // Флаг авторизации
        this._user = {};      // Данные пользователя
        // Делаем хранилище наблюдаемым
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool;
    }
    // Установка данных пользователя
    setUser(user) {
        this._user = user;
    }

    get isAuth(){
        return this._isAuth;
    }
    get user(){
        return this._user;
    }
}