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

    let prosjecnaVrijednostNekogSvojstva = function(kriterij, svojstvoZaFiltraciju){
        let sumaSvojstva = 0;

        listaNekretnina.forEach(element => {
            let svojstvo = element[svojstvoZaFiltraciju];
            sumaSvojstva += svojstvo;
        });

        return sumaSvojstva / listaNekretnina.length;
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

        //sortiranje po broju upita
        listaNekretninaKojeSadrzeUpitKorisnika.sort((a, b) => {a.upiti.length > b.upiti.length});
                    
        return listaNekretninaKojeSadrzeUpitKorisnika;
    }

    let histogramCijena = function(periodi, rasponiCijena) {
        let histogram = [];

        //oznaceni filteri
        let tip_nekretnine = document.querySelector('input[name="tip_nekretnine"]:checked')?.value
        let lokacija = document.getElementById('lokacija').value;
        let min_kvadratura = document.getElementById('min_kvadratura').value;
        let max_kvadratura = document.getElementById('max_kvadratura').value;
        let godina_izgradnje = document.getElementById('godina_izgradnje').value;
        
        let tip_Grijanja = [];
        if(document.getElementById('struja').checked) tip_Grijanja.push('struja');
        if(document.getElementById('plin').checked) tip_Grijanja.push('plin');
        if(document.getElementById('toplana').checked) tip_Grijanja.push('toplana');
        

        periodi.forEach((period, indeksPerioda) => {
            rasponiCijena.forEach((rasponCijena, indeksRasponaCijena) => {
                let brojNekretnina = listaNekretnina.filter(nekretnina => {
                    let cijena = nekretnina.cijena;
                    
                    /*let danObjave = parseInt(nekretnina.datum_objave.split('.')[0]);
                    let mjesecObjave = parseInt(nekretnina.datum_objave.split('.')[1]);*/
                    let datumObjave = parseInt(nekretnina.datum_objave.split('.')[2]);

                    let godinaIzgradnje = nekretnina.godina_izgradnje;
                    let kvadratura = nekretnina.kvadratura;
                    let lokacijaNekretnine = nekretnina.lokacija;
                    let tipNekretnine = nekretnina.tip_nekretnine;
                    let tipGrijanjaNekretnine = nekretnina.tip_grijanja;

                    let odgovara = true;

                    if(godina_izgradnje && godinaIzgradnje !== godina_izgradnje) odgovara = false;
                    if(min_kvadratura && kvadratura < min_kvadratura) odgovara = false;
                    if(max_kvadratura && kvadratura > max_kvadratura) odgovara = false;
                    if(lokacija && lokacijaNekretnine !== lokacija) odgovara = false;
                    if(tip_nekretnine && tipNekretnine !== tip_nekretnine) odgovara = false;
                    if(tip_Grijanja.length > 0 && !tip_Grijanja.includes(tipGrijanjaNekretnine)) odgovara = false;

                    return(
                        odgovara &&
                        datumObjave >= period.od &&
                        datumObjave <= period.do &&
                        cijena >= rasponCijena[0] &&
                        cijena <= rasponCijena[1]
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
        outlier: outlier,
        mojeNekretnine: mojeNekretnine,
        histogramCijena: histogramCijena
    }
}