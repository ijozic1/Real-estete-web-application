const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    const Ponuda = sequelize.define('Ponuda', {
        korisnik_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tekst: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cijenaPonude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        datumPonude: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        odbijenaPonuda: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    })
    return Ponuda;
};