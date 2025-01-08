let StatistikaNekretnina = function (){

    let spisakNekretnina = SpisakNekretnina();

    let init = function(listaNekretnina, listaKorisnika) { 
        spisakNekretnina.init(listaNekretnina, listaKorisnika);
    }

    let prosjecnaKvadratura = function(kriterij) {
        let listaNekretninaPoKriteriju = spisakNekretnina.filtrirajNekretnine(kriterij);
        let sumaKvadrature = 0;

        listaNekretninaPoKriteriju.forEach(element => {
            let kvadratura = element.kvadratura;
            sumaKvadrature += kvadratura;
        });

        return sumaKvadrature / listaNekretninaPoKriteriju.length;
    }

    let prosjecnaVrijednostNekogSvojstva = function(svojstvoZaFiltraciju){
        let sumaSvojstva = 0;

        listaNekretnina.forEach(element => {
            let svojstvo = element[svojstvoZaFiltraciju];
            sumaSvojstva += svojstvo;
        });

        return sumaSvojstva / listaNekretnina.length;
    }

    let outlier = function(kriterij, nazivSvojstva){
        /*if(!nazivSvojstva.isNumber()) 
            return undefined;*/
        if(nazivSvojstva !== 'kvadratura' && nazivSvojstva !== 'cijena' && nazivSvojstva !== 'godina_izgradnje')
            return undefined;
        
        let listaNekretninaPoKriteriju = spisakNekretnina.filtrirajNekretnine(kriterij);
        let prosjek = prosjecnaVrijednostNekogSvojstva(/*kriterij,*/ nazivSvojstva);

        let indexMaxOdstupanja = 0;
        let maxOdstupanje = 0;

        listaNekretninaPoKriteriju.forEach((nekretnina, i) => {
            let odstupanje = Math.abs(nekretnina[nazivSvojstva] - prosjek);
            if (odstupanje > maxOdstupanje) {
                maxOdstupanje = odstupanje;
                indexMaxOdstupanja = i;
            }
        });

        return listaNekretninaPoKriteriju[indexMaxOdstupanja];
    }

    let mojeNekretnine = function(korisnik) {
        let listaNekretninaKojeSadrzeUpitKorisnika = 
            listaNekretnina.filter(nekretnina => 
                nekretnina.upiti.some(upit => 
                    upit.korisnik_id === korisnik.id)); 

        //sortiranje po broju upita
        listaNekretninaKojeSadrzeUpitKorisnika.sort((a, b) => {return a.upiti.length < b.upiti.length});
                    
        return listaNekretninaKojeSadrzeUpitKorisnika;
    }

    let histogramCijena = function(periodi, rasponiCijena) {
        let histogram = [];

        periodi.forEach((period, indeksPerioda) => {
            rasponiCijena.forEach((rasponCijena, indeksRasponaCijena) => {
                let brojNekretnina = listaNekretnina.filter(nekretnina => {
                    let cijena = nekretnina.cijena;
                    
                    /*let danObjave = parseInt(nekretnina.datum_objave.split('.')[0]);
                    let mjesecObjave = parseInt(nekretnina.datum_objave.split('.')[1]);*/
                    let datumObjave = parseInt(nekretnina.datum_objave.split('.')[2]);

                    return(
                        datumObjave >= period.od &&
                        datumObjave <= period.do &&
                        cijena >= rasponCijena.od &&
                        cijena <= rasponCijena.do
                    );
                }).length;

                histogram.push({indeksPerioda, indeksRasponaCijena, brojNekretnina});
            });
        });

        return histogram;
    }

    return{
        init: init,
        prosjecnaKvadratura: prosjecnaKvadratura,
        prosjecnaVrijednostNekogSvojstva: prosjecnaVrijednostNekogSvojstva,
        outlier: outlier,
        mojeNekretnine: mojeNekretnine,
        histogramCijena: histogramCijena
    }
}