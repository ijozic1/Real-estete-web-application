let SpisakNekretnina = function () {
    //privatni atributi modula

    /*Prepravka S2*/
    let listaNekretninaSN = [];
    let listaKorisnikaSN = [];


    /*U startu projekta*/
    /*let listaNekretnina = [];
    let listaKorisnika = [];*/
    


    //implementacija metoda
    let init = function (listaNekretnina, listaKorisnika) {
        /*Prepravka S2*/
        listaNekretninaSN = listaNekretnina;
        listaKorisnikaSN = listaKorisnika;

        /*U startu projekta*/
        /*this.listaNekretnina = listaNekretnina;
        this.listaKorisnika = listaKorisnika;*/
    }

    let filtrirajNekretnine = function (kriterij) {
        return /*this.*/listaNekretninaSN.filter(nekretnina => {
            // Filtriranje po tipu nekretnine
            if (kriterij.tip_nekretnine && nekretnina.tip_nekretnine !== kriterij.tip_nekretnine) {
                return false;
            }

            // Filtriranje po minimalnoj kvadraturi
            if (kriterij.min_kvadratura && nekretnina.kvadratura < kriterij.min_kvadratura) {
                return false;
            }

            // Filtriranje po maksimalnoj kvadraturi
            if (kriterij.max_kvadratura && nekretnina.kvadratura > kriterij.max_kvadratura) {
                return false;
            }

            // Filtriranje po minimalnoj cijeni
            if (kriterij.min_cijena && nekretnina.cijena < kriterij.min_cijena) {
                return false;
            }

            // Filtriranje po maksimalnoj cijeni
            if (kriterij.max_cijena && nekretnina.cijena > kriterij.max_cijena) {
                return false;
            }

            // Filtriranje po tipu grijanja
            if (kriterij.tip_grijanja && nekretnina.tip_grijanja !== kriterij.tip_grijanja) {
                return false;
            }

            // Filtriranje po lokaciji
            if (kriterij.lokacija && nekretnina.lokacija !== kriterij.lokacija) {
                return false;
            }

            // Filtriranje po godini izgradnje
            if (kriterij.godina_izgradnje && nekretnina.godina_izgradnje !== kriterij.godina_izgradnje) {
                return false;
            }

            return true;
        });
    }

    let ucitajDetaljeNekretnine = function (id) {
        return listaNekretnina.find(nekretnina => nekretnina.id === id) || null;
    }


    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};