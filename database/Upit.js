const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    const Upit = sequelize.define("Upit",{
        tekst: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    })
    return Upit;
};