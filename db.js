const sequelize = require('sequelize')
const mysql = require('mysql2')
const fs = require('fs')
const path = require('path')

const conn = new sequelize.Sequelize("mysql://avnadmin:AVNS_N7HHFsLgjdlk8nMWvnk@mysql-2e822813-rumedical-27.aivencloud.com:26143/defaultdb?ssl-mode=REQUIRED", {
    ssl: fs.readFileSync(path.join(__dirname, 'elisa.pem')),
    dialect: 'mysql',
    logging: false
});

const user = conn.define("user", {
    id: {type: sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: sequelize.DataTypes.STRING, allowNull: false},
    email: {type: sequelize.DataTypes.STRING, allowNull: false},
    password: {type: sequelize.DataTypes.STRING, allowNull: false},

}, 
{
    freezeTableName: true,
    timestamps: false
})

const booking = conn.define("book", {
    id_book: {type: sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nama: {type: sequelize.DataTypes.STRING, allowNull:false},
    noHP: {type: sequelize.DataTypes.STRING, allowNull:false},
    email: {type: sequelize.DataTypes.STRING allowNull:false},
    service: {type: sequelize.DataTypes.STRING, allowNull:false}

}, 
{
    freezeTableName: true,
    timestamps: false
})

module.exports = {
    conn,
    user,
    book
}