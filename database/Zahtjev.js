const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    const Zahtjev = sequelize.define('Zahtjev', {
        tekst: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        trazeniDatum: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        odobren: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        freezeTableName: true
    })
    return Zahtjev;
};