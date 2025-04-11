const Sequelize = require("sequelize");
const sequelize_obj = new Sequelize("wt24","root","password",{ //za vrijeme izrade projekta, password bio ""
    host:"mysql-db",
    //host:"localhost",
    dialect:"mysql",
    port: '3306',
    logging: false,
    retry: {
      max: 10, //Broj pokusaja konekcije
      backoffBase: 1000, //Osnovno vreme cekanja u ms
      backoffExponent: 1.5, //Eksponent za povecanje vremena cekanja
    }});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize_obj;

//import modela
const path = require('path');
const { log } = require("console");
db.korisnik = require(path.join(__dirname, '/Korisnik.js'))(sequelize_obj, Sequelize.DataTypes);
db.nekretnina = require(path.join(__dirname, '/Nekretnina.js'))(sequelize_obj, Sequelize.DataTypes);
db.ponuda = require(path.join(__dirname, '/Ponuda.js'))(sequelize_obj, Sequelize.DataTypes);
db.upit = require(path.join(__dirname, '/Upit.js'))(sequelize_obj, Sequelize.DataTypes);
db.zahtjev = require(path.join(__dirname, '/Zahtjev.js'))(sequelize_obj, Sequelize.DataTypes);


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

async function inicializacija() {
  return new Promise(function (resolve, reject) {
    const korisniciListaPromisea = [];
    const nekretnineListaPromisea = [];
    const upitiListaPromisea = [];

    // Dodavanje korisnika
    const korisniciPodaci = [
      {
        id: 1,
        ime: "Neko",
        prezime: "Nekic",
        username: "username1",
        password: "$2b$10$OFykzLMWv.wpDk2dXT5C8ObIgy8tlZYbm0ZPN0VTe8I/jXosIX1EG",
      },
      {
        id: 2,
        ime: "Neko2",
        prezime: "Nekic2",
        username: "username2",
        password: "$2b$10$eN2a0Ii0mkjvpSUU.6.S4uASuULIlAspWFc2LkJTmIYPZszB8oyXC",
      },
      {
        id: 3,
        ime: "ivona",
        prezime: "jozic",
        username: "ijozic1",
        password: "$2b$10$XT28eJbWux2bWpB1B9rUhumRtirUV1Kp2wMFSN0bVygGhHuZp7kyi",
      },
      {
        id: 4,
        ime: "admin",
        prezime: "admin",
        username: "admin",
        password: "$2b$10$jZUkGiHI/FrIV8JKfNIc5umh83NBd.mox8ASyOnSf2.gmfETVq0/S", // sifra: admin
        admin: true
      },
      {
        id: 5,
        ime: "user",
        prezime: "user",
        username: "user",
        password: "$2b$10$iTPTTHRQINzsUhE5lc5wjOFjSfrdAl7QIHt/lXIk5CHSlo6u6Q5D6" // sifra: user

      }
    ];

    korisniciPodaci.forEach((korisnik) => {
      korisniciListaPromisea.push(db.korisnik.create(korisnik));
    });

    Promise.all(korisniciListaPromisea).then(function (korisnici) {
      const nekretninePodaci = [
        {
          id: 1,
          tip_nekretnine: "Stan",
          naziv: "Useljiv stan Sarajevo",
          kvadratura: 58,
          cijena: 232000,
          tip_grijanja: "plin",
          lokacija: "Novo Sarajevo",
          godina_izgradnje: 2019,
          datum_objave: "01.10.2023.",
          opis: "Sociis natoque penatibus.",
          upiti: [
            {
              korisnik_id: 1,
              tekst_upita: "Nullam eu pede mollis pretium.",
            },
            {
              korisnik_id: 2,
              tekst_upita: "Phasellus viverra nulla.",
            },
          ],
        },
        {
          id: 2,
          tip_nekretnine: "Poslovni prostor",
          naziv: "Mali poslovni prostor",
          kvadratura: 20,
          cijena: 70000,
          tip_grijanja: "struja",
          lokacija: "Centar",
          godina_izgradnje: 2005,
          datum_objave: "20.08.2023.",
          opis: "Magnis dis parturient montes.",
          upiti: [
            {
              korisnik_id: 2,
              tekst_upita: "Integer tincidunt.",
            },
          ],
        },
      ];

      nekretninePodaci.forEach((nekretnina) => {
        nekretnineListaPromisea.push(
          db.nekretnina
            .create({
              id: nekretnina.id,
              tip_nekretnine: nekretnina.tip_nekretnine,
              naziv: nekretnina.naziv,
              kvadratura: nekretnina.kvadratura,
              cijena: nekretnina.cijena,
              tip_grijanja: nekretnina.tip_grijanja,
              lokacija: nekretnina.lokacija,
              godina_izgradnje: nekretnina.godina_izgradnje,
              datum_objave: nekretnina.datum_objave,
              opis: nekretnina.opis,
            })
            .then(function (kreiranaNekretnina) {
              const upiti = nekretnina.upiti.map((upit) => ({
                korisnikId: upit.korisnik_id,
                tekst: upit.tekst_upita,
                nekretninaId: kreiranaNekretnina.id,
              }));

              upiti.forEach((upit) => {
                upitiListaPromisea.push(db.upit.create(upit));
              });

              return kreiranaNekretnina;
            })
        );
      });

      Promise.all(nekretnineListaPromisea)
        .then(() => Promise.all(upitiListaPromisea))
        .then(() => resolve())
        .catch((err) => {
          console.error("Greška prilikom kreiranja nekretnina ili upita:", err);
          reject(err);
        });
    });
  });
}


module.exports={db, inicializacija};

/*(async () => {
    try {
      await sequelize_obj.authenticate();
      console.log('Konekcija na bazu je uspešna!');
  
      // Kreiranje tabela
      await sequelize_obj.sync({ force: true });
      console.log('Tabele su kreirane!');
    } catch (error) {
      console.error('Greška pri konekciji:', error);
    }
})();*/

db.nekretnina.prototype.getInteresovanja = async function () {
    const upiti = await db.upit.findAll({where: {nekretninaId: this.id}});
    const zahtjevi = await db.zahtjev.findAll({where: {nekretninaId: this.id}});
    const ponude = await db.ponuda.findAll({where: { nekretninaId: this.id }});
    const interesovanja = { upiti, zahtjevi, ponude };
    //console.log("Ovo su interesovanja:", interesovanja);
    return interesovanja;
};
  