const sequelize = require('../../../тест1/server/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING},
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Instrument = sequelize.define('instrument', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false},
    price: { type: DataTypes.INTEGER, allowNull: false},
    img: { type: DataTypes.STRING, allowNull: false},
    info: { type: DataTypes.STRING, defaultValue: 'Информация о инструменте'},
})

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false},
    img: { type: DataTypes.STRING, allowNull: false},
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, allowNull: false},
})

Category.hasMany(Instrument)
Instrument.belongsTo(Category)

Instrument.hasMany(Basket)
Basket.belongsTo(Instrument)

User.hasMany(Basket)
Basket.belongsTo(User)

module.exports = {
    User,
    Category,
    Instrument,
    Basket
}