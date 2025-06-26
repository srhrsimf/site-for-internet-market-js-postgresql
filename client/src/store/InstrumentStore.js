import {makeAutoObservable} from "mobx";

export default class InstrumentStore {
    constructor(){
        // Инициализация состояния
        this._categories = [];     // Список всех категорий
        this._instruments = [];    // Список инструментов
        this._selectedCategory = {}; // Выбранная категория

        makeAutoObservable(this)
    }

    // Actions (методы для изменения состояния)
    setCategories(categories){
        this._categories = categories;
    }
    setInstruments(instruments){
        this._instruments = instruments;
    }
    setSelectedCategory(category){
        this._selectedCategory = category;
    }

    // Computed (геттеры для получения состояния)
    get categories(){
        return this._categories;
    }
    get instruments(){
        return this._instruments;
    }
    get instrument(){
        return this._instrument;
    }
    get selectedCategory(){
        return this._selectedCategory;
    }
}