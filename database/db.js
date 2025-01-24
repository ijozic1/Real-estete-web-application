const Sequelize = require("sequelize");
const sequelize_obj = new Sequelize("wt24","root","password",{
    host:"localhost",
    dialect:"mysql"});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize_obj;

//import modela
db.korisnik = sequelize_obj.import(__dirname+'/Korisnik.js');
db.nekretnina = sequelize_obj.import(__dirname+'/Nekretnina.js');
db.ponuda = sequelize_obj.import(__dirname+'/Ponuda.js');
db.upit = sequelize_obj.import(__dirname+'/Upit.js');
db.zahtjev = sequelize_obj.import(__dirname+'/Zahtjev.js');

//relacije
// Relacije Nekretnina - Interesovanja
db.nekretnina.hasMany(db.upit, { foreignKey: 'nekretninaId' });
db.nekretnina.hasMany(db.zahtjev, { foreignKey: 'nekretninaId' });
db.nekretnina.hasMany(db.ponuda, { foreignKey: 'nekretninaId' });

db.upit.belongsTo(db.nekretnina, { foreignKey: 'nekretninaId' });
db.zahtjev.belongsTo(db.nekretnina, { foreignKey: 'nekretninaId' });
db.ponuda.belongsTo(db.nekretnina, { foreignKey: 'nekretninaId' });

// Relacije Korisnik - Interesovanja
db.korisnik.hasMany(db.upit, { foreignKey: 'korisnikId' });
db.korisnik.hasMany(db.zahtjev, { foreignKey: 'korisnikId' });
db.korisnik.hasMany(db.ponuda, { foreignKey: 'korisnikId' });

db.upit.belongsTo(db.korisnik, { foreignKey: 'korisnikId' });
db.zahtjev.belongsTo(db.korisnik, { foreignKey: 'korisnikId' });
db.ponuda.belongsTo(db.korisnik, { foreignKey: 'korisnikId' });

// Ponuda ima vezane ponude
db.ponuda.hasMany(db.ponuda, { as: 'vezanePonude', foreignKey: 'parent_offerId' });
db.ponuda.belongsTo(db.ponuda, { as: 'parentOffer', foreignKey: 'parent_offerId' });

module.exports=db;

(async () => {
    try {
      await sequelize_obj.authenticate();
      console.log('Konekcija na bazu je uspešna!');
  
      // Kreiranje tabela
      await sequelize_obj.sync({ force: true });
      console.log('Tabele su kreirane!');
    } catch (error) {
      console.error('Greška pri konekciji:', error);
    }
})();

db.nekretnina.prototype.getInteresovanja = async function () {
    const upiti = await this.getUpiti();
    const zahtjevi = await this.getZahtjevi();
    const ponude = await this.getPonude();
    return { upiti, zahtjevi, ponude };
};
  