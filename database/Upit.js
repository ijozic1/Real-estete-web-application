const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    const Upit = sequelize.define("Upit",{
        korisnik_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tekst: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    })
    return Upit;
};