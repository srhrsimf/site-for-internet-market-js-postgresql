import { makeAutoObservable } from "mobx";

export default class CategoryStore {
    constructor() {
        this._categories = []; // Начальное значение - ПУСТОЙ МАССИВ, не undefined!
        this._selectedCategory = {};
        makeAutoObservable(this);
    }

    // Action для установки категорий
    setCategories(categories) {
        this._categories = categories;
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
    }

    // Геттеры, чтобы компоненты могли получать доступ к данным
    get categories() {
        return this._categories;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }
}