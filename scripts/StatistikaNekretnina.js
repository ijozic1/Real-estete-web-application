let StatistikaNekretnina = function (){
    const listaNekretnina = nekretnine.listaNekretnina;
    const listaKorisnika = nekretnine.listaKorisnika;

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

    let prosjecnaVrijednostNekogSvojstva = function(kriterij, svojstvoZaFiltraciju){
        /*//vec provjereno u outlier funkciji
        if(!svojstvoZaFiltraciju.isNumber()) 
            return undefined;*/
    
        let listaNekretninaPoKriteriju = spisakNekretnina.filtrirajNekretnine(kriterij);
        let sumaSvojstva = 0;

        listaNekretninaPoKriteriju.forEach(element => {
            let svojstvo = element[svojstvoZaFiltraciju];
            sumaSvojstva += svojstvo;
        });

        return sumaSvojstva / listaNekretninaPoKriteriju.length;
    }

    let outlier = function(kriterij, nazivSvojstva){
        if(!nazivSvojstva.isNumber()) 
            return undefined;
        
        let listaNekretninaPoKriteriju = spisakNekretnina.filtrirajNekretnine(kriterij);
        let prosjek = prosjecnaVrijednostNekogSvojstva(kriterij, nazivSvojstva);

        let indexMaxOdstupanja = 0;
        let maxOdstupanje = 0;

        for(let i=0; i<listaNekretninaPoKriteriju.length; i++) {
            let odstupanje = Math.abs(listaNekretninaPoKriteriju[i][nazivSvojstva] - prosjek);
            if(odstupanje > maxOdstupanje) {
                maxOdstupanje = odstupanje;
                indexMaxOdstupanja = i;
            }
        }

        return listaNekretninaPoKriteriju[indexMaxOdstupanja];
    
    }

    let mojeNekretnine = function(korisnik) {
        let listaNekretninaKojeSadrzeUpitKorisnika = 
            listaNekretnina.filter(nekretnina => 
                nekretnina.upiti.some(upit => 
                    upit.korisnik_id === korisnik.id)); 
                    
        return listaNekretninaKojeSadrzeUpitKorisnika;
    }

    let histogramCijena = function(periodi, rasponiCijena) {
        let histogram = [];

        periodi.forEach((period, indeksPerioda) => {
            rasponiCijena.forEach((rasponCijena, indeksRaspona) => {
                let brNekretnina = listaNekretnina.filter(nekretnina => {
                    let cijena = nekretnina.cijena;
                    let datumObjave = parseInt(nekretnina.datum_objave.split('.')[2]);

                    return(
                        datumObjave >= period.od &&
                        datumObjave < period.do &&
                        cijena >= rasponCijena[0] &&
                        cijena < rasponCijena[1]
                    );
                }).length;

                histogram.push({indeksPerioda, indeksRaspona, brNekretnina});
            });
        });

        return histogram;
    }

    return{
        init: init,
        prosjecnaKvadratura: prosjecnaKvadratura,
        outlier: outlier,
        mojeNekretnine: mojeNekretnine,
        histogramCijena: histogramCijena
    }
}