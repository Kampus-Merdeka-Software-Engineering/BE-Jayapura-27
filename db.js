const sequelize = require('sequelize')
const mysql = require('mysql2')
const fs = require('fs')
const path = require('path')

const conn = new sequelize.Sequelize("mysql://avnadmin:AVNS_N7HHFsLgjdlk8nMWvnk@mysql-2e822813-rumedical-27.aivencloud.com:26143/rumedical?ssl-mode=REQUIRED", {
    ssl: fs.readFileSync(path.join(__dirname, 'elisa.pem')),
    dialect: 'mysql',
    logging: true
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

const booking = conn.define("booking", {
    id_book: {type: sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nama: {type: sequelize.DataTypes.STRING, allowNull:false},
    noHP: {type: sequelize.DataTypes.INTEGER, allowNull:false},
    email: {type: sequelize.DataTypes.STRING, allowNull:false},
    service: {type: sequelize.DataTypes.STRING, allowNull:false}

}, 
{
    freezeTableName: true,
    timestamps: false
})

module.exports = {
    conn,
    user,
    booking
}

