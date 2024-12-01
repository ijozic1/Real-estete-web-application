//kvadratura
const kvadraturaDodajKriterijBtn = document.getElementById("dodaj_kriterij_kvadratura");
const kvadraturaPrikaziBtn = document.getElementById("prikazi_prosjecnu_kvadraturu");
const kvadraturaResetBtn = document.getElementById("reset_kvadratura");

//outlier
const outlierDodajKriterijBtn = document.getElementById("dodaj_kriterij_outlier");
const outlierPrikaziBtn = document.getElementById("prikazi_outlier");
const outlierResetBtn = document.getElementById("reset_outlier");

//moje nekretnine
const nekretnineKorisnik = document.getElementById("korisnici_dropdown");
const nekretninePrikaziBtn = document.getElementById("prikazi_moje_nekretnine");

//histogram
const dodajCijenuBtn = document.getElementById("cijena_dodaj_opseg");
const dodajGodinuBtn = document.getElementById("godina_dodaj_opseg");
const resetBtn = document.getElementById("reset");
const prikaziHistoBtn = document.getElementById("prikazi_histogram");


//inicijalizacije
const statistikaNekretnina = StatistikaNekretnina();
const spisakNekretnina = SpisakNekretnina();

let kvadraturaKriterij ={
    tip_nekretnine: undefined,
    min_kvadratura: undefined,
    max_kvadratura: undefined,
    min_cijena: undefined,
    max_cijena: undefined,
    tip_grijanja: undefined,
    lokacija: undefined,
    godina_izgradnje: undefined
};

let outlierKriterij = {
    tip_nekretnine: undefined,
    min_kvadratura: undefined,
    max_kvadratura: undefined,
    min_cijena: undefined,
    max_cijena: undefined,
    tip_grijanja: undefined,
    lokacija: undefined,
    godina_izgradnje: undefined
};

const histogramCijeneData = [];
const histogramGodinaData = [];


//event listeneri kvadratura
kvadraturaDodajKriterijBtn.addEventListener("click", dodajKriterij("kvadratura"));
kvadraturaPrikaziBtn.addEventListener("click", izracunajProsjecnuKvadraturu);
kvadraturaResetBtn.addEventListener("click", resetujFormuZaKvadraturu);

//event listeneri outlier
outlierDodajKriterijBtn.addEventListener("click", dodajKriterij("outlier"));
outlierPrikaziBtn.addEventListener("click", prikaziOutlier);
outlierResetBtn.addEventListener("click", resetujFormuZaOutlier);

//event listeneri moje nekretnine
nekretninePrikaziBtn.addEventListener("click", prikaziMojeNekretnine);

//event listeneri histogram
dodajCijenuBtn.addEventListener("click", dodajCijenu);
dodajGodinuBtn.addEventListener("click", dodajGodinu);
resetBtn.addEventListener("click", izbrisiFormuZaHistogram)
prikaziHistoBtn.addEventListener("click", prikaziHistogram);

//liste za nekretnine i korisnike
const listaNekretnina = [
    {
        id: 1,
        tip_nekretnine: "stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 58,
        cijena: 232000,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Opis stana sa id 1",
        upiti:[
            {
                korisnik_id: 1,
                tekst_upita: "Tekst upita 1"
            },
            {
                korisnik_id: 2,
                tekst_upita: "Tekst upita 2"
            }
        ]
    },
    {
        id: 1,
        tip_nekretnine: "stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 58,
        cijena: 23200,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2001,
        datum_objave: "01.10.2003.",
        opis: "Opis stana sa id 1",
        upiti:[
            {
                korisnik_id: 1,
                tekst_upita: "Tekst upita 1"
            },
            {
                korisnik_id: 2,
                tekst_upita: "Tekst upita 2"
            }
        ]
    },
    {
        id: 1,
        tip_nekretnine: "stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 58,
        cijena: 232000,
        tip_grijanja: "toplana",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2009,
        datum_objave: "01.10.2019.",
        opis: "Opis stana sa id 1",
        upiti:[
            {
                korisnik_id: 1,
                tekst_upita: "Tekst upita 1"
            },
            {
                korisnik_id: 2,
                tekst_upita: "Tekst upita 2"
            }
        ]
    },
    {
        id: 2,
        tip_nekretnine: "kuca",
        naziv: "Kuca sa bazenom",
        kvadratura: 200,
        cijena: 300000,
        tip_grijanja: "struja",
        lokacija: "Ilidza",
        godina_izgradnje: 2015,
        datum_objave: "01.10.2021.",
        opis: "Opis kuce sa id 2",
        upiti:[
            {
                korisnik_id: 1,
                tekst_upita: "Tekst upita 1"
            }
        ]
    },
    {
        id: 3,
        tip_nekretnine: "kuca",
        naziv: "Kuca sa bastom",
        kvadratura: 150,
        cijena: 250000,
        tip_grijanja: "toplana",
        lokacija: "Centar",
        godina_izgradnje: 2010,
        datum_objave: "01.10.2020.",
        opis: "Opis kuce sa id 3",
        upiti:[
            {
                korisnik_id: 2,
                tekst_upita: "Tekst upita 2"
            }
        ]
    },
    {
        id: 4,
        tip_nekretnine: "stan",
        naziv: "Stan u centru grada",
        kvadratura: 70,
        cijena: 150000,
        tip_grijanja: "toplana",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "01.10.2018.",
        opis: "Opis stana sa id 4",
        upiti:[
            {
                korisnik_id: 2,
                tekst_upita: "Tekst upita 2"
            }
        ]
    },
    {
        id: 5,
        tip_nekretnine: "kuca",
        naziv: "Kuca sa garazom",
        kvadratura: 180,
        cijena: 220000,
        tip_grijanja: "plin",
        lokacija: "Stari Grad",
        godina_izgradnje: 2000,
        datum_objave: "01.10.2017.",
        opis: "Opis kuce sa id 5",
        upiti:[
            {
                korisnik_id: 1,
                tekst_upita: "Tekst upita 1"
            }
        ]
    },
    {
        id: 6,
        tip_nekretnine: "kuca",
        naziv: "Kuca sa velikom bastom",
        kvadratura: 250,
        cijena: 350000,
        tip_grijanja: "toplana",
        lokacija: "Ilidza",
        godina_izgradnje: 2012,
        datum_objave: "01.10.2016.",
        opis: "Opis kuce sa id 6",
        upiti:[
            {
                korisnik_id: 2,
                tekst_upita: "Tekst upita 2"
            }
        ]
    },
    {
        id: 7,
        tip_nekretnine: "poslovni_prostor",
        naziv: "Poslovni prostor u centru",
        kvadratura: 50,
        cijena: 100000,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2008,
        datum_objave: "01.10.2015.",
        opis: "Opis poslovnog prostora sa id 7",
        upiti:[
            {
                korisnik_id: 2,
                tekst_upita: "Tekst upita 1"
            }
        ]
    },
    {
        id: 8,
        tip_nekretnine: "poslovni_prostor",
        naziv: "Poslovni prostor u poslovnoj zgradi",
        kvadratura: 100,
        cijena: 200000,
        tip_grijanja: "toplana",
        lokacija: "Centar",
        godina_izgradnje: 2010,
        datum_objave: "01.10.2014.",
        opis: "Opis poslovnog prostora sa id 8",
        upiti:[
            {
                korisnik_id: 1,
                tekst_upita: "Tekst upita 1"
            }
        ]
    },
    {
        id: 9,
        tip_nekretnine: "poslovni_prostor",
        naziv: "Poslovni prostor u poslovnoj zgradi",
        kvadratura: 80,
        cijena: 20000,
        tip_grijanja: "plin",
        lokacija: "Vogošća",
        godina_izgradnje: 2010,
        datum_objave: "01.10.2020.",
        opis: "Opis poslovnog prostora sa id 8",
        upiti:[]
    },
]

const listaKorisnika = [
    {
        id: 1,
        ime: "Neko",
        prezime: "Nekic",
        username: "nekonekic",
    },
    {
        id: 2,
        ime: "Neka",
        prezime: "Nekic",
        username: "nekanekic",
    },
    {
        id: 3,
        ime: "Niko",
        prezime: "Nikic",
        username: "nikonikic",
    },
]

statistikaNekretnina.init(listaNekretnina, spisakNekretnina);
spisakNekretnina.init(listaNekretnina, listaKorisnika);

resetujFormuZaKvadraturu();
resetujFormuZaOutlier();
izbrisiFormuZaHistogram();

//prikaz kvadratura
document.getElementById('kriterij_kvadratura').addEventListener('change', function () {
    // sakrij sve tabele
    const allTables = [
        'tip_nekretnine_dropdown_kvadratura',
        'kvadratura_za_prosjek',
        'cijena_za_prosjek',
        'grijanje_prosjek',
        'lokacija_prosjek_1',
        'godina_izgradnje_prosjek_1'
    ];

    allTables.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    // prikazi odabranu tabelu
    const selectedValue = this.value;
    const tableId = {
        'tip_nekretnine': 'tip_nekretnine_dropdown_kvadratura',
        'kvadratura': 'kvadratura_za_prosjek',
        'cijena': 'cijena_za_prosjek',
        'tip_grijanja': 'grijanje_prosjek',
        'lokacija': 'lokacija_prosjek_1',
        'godina_izgradnje': 'godina_izgradnje_prosjek_1'
    }[selectedValue];

    if (tableId) {
        document.getElementById(tableId).style.display = 'table';
    }
});
document.getElementById('kriterij_kvadratura').dispatchEvent(new Event('change'));


//prikaz outlier
document.getElementById('kriterij_outlier').addEventListener('change', function () {
    // sakrij sve tabele
    const allTables = [
        'tip_nekretnine_dropdown_outlier',
        'kvadratura_za_outlier',
        'cijena_za_outlier',
        'grijanje_outlier',
        'lokacija_outlier_1',
        'godina_izgradnje_outlier_1'
    ];

    allTables.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    // prikazi odabranu tabelu
    const selectedValue = this.value;
    const tableId = {
        'tip_nekretnine': 'tip_nekretnine_dropdown_outlier',
        'kvadratura': 'kvadratura_za_outlier',
        'cijena': 'cijena_za_outlier',
        'tip_grijanja': 'grijanje_outlier',
        'lokacija': 'lokacija_outlier_1',
        'godina_izgradnje': 'godina_izgradnje_outlier_1'
    }[selectedValue];

    if (tableId) {
        document.getElementById(tableId).style.display = 'table';
    }
});
document.getElementById('kriterij_outlier').dispatchEvent(new Event('change'));


// prikaz moje nekretnine
function popuniDropdownKorisnik(idDropdown) {
    const dropdown = document.getElementById(idDropdown);

    if (!dropdown) {
        console.error(`Element sa ID '${idDropdown}' nije pronađen.`);
        return;
    }

    const praznaOpcija = document.createElement("option");
    praznaOpcija.value = "";
    praznaOpcija.textContent = "Odaberite korisnika";
    dropdown.appendChild(praznaOpcija);

    listaKorisnika.forEach(korisnik => {
        const opcija = document.createElement("option");
        opcija.value = JSON.stringify(korisnik);
        //opcija.value = korisnik.id; 
        opcija.textContent = `${korisnik.ime} ${korisnik.prezime} (${korisnik.username})`;
        dropdown.appendChild(opcija);
    });
}

//DOM 
document.addEventListener("DOMContentLoaded", () => {
    //dinamicko popunjavanje dropdown-a za korisnike
    popuniDropdownKorisnik("korisnici_dropdown");
});

function resetFormu(formaId){
    const forma = document.getElementById(formaId);
    if (forma) {
        const inputs = forma.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }
}

function obrisiSadrzajDiva(divId){
    const div = document.getElementById(divId);
    if (div) {
        const dataFields = div.querySelectorAll('.data, ul');
        dataFields.forEach(field => {
            if (field.tagName === 'UL') {
                field.innerHTML = ''; 
            } else {
                field.textContent = ''; //za td
            }
        });
    }
}

function ulDodajItem(div, item){
    let li = document.createElement("li");
    li.innerHTML = item;
    li.id = "li_";
    div.appendChild(li);
}

function ulDodajItemNekretnina(ulElement, item) {
    const li = document.createElement("li");
    li.innerHTML = item;
    ulElement.appendChild(li);
}

function dodajKriterij(tip){
    if(tip==="kvadratura"){
        let odabraniKriterij = document.getElementById("kriterij_kvadratura").value;
        let odabranaVrijednost;

        switch(odabraniKriterij){
            case "tip_nekretnine":
                odabranaVrijednost= document.getElementById("tip_nekretnine_dropdown_kvadratura_1").value;
                break;
            case "kvadratura":
                let minKvadratura = document.getElementById("kvadratura_od_za_prosjek").value;
                let maxKvadratura = document.getElementById("kvadratura_do_za_prosjek").value;

                if(minKvadratura && !isNaN(minKvadratura) && kvadraturaKriterij["min_kvadratura"] === undefined){
                    kvadraturaKriterij["min_kvadratura"] = parseInt(minKvadratura); 
                }

                if(maxKvadratura && !isNaN(maxKvadratura) && kvadraturaKriterij["max_kvadratura"] === undefined){
                    kvadraturaKriterij["max_kvadratura"] = parseInt(maxKvadratura); 
                }
                break;
            case "cijena":
                let minCijena = document.getElementById("cijena_od_za_prosjek").value;
                let maxCijena = document.getElementById("cijena_do_za_prosjek").value;

                if(minCijena && !isNaN(minCijena) && kvadraturaKriterij["min_cijena"] === undefined){
                    kvadraturaKriterij["min_cijena"] = parseInt(minCijena); 
                }

                if(maxCijena && !isNaN(maxCijena) && kvadraturaKriterij["max_cijena"] === undefined){
                    kvadraturaKriterij["max_cijena"] = parseInt(maxCijena); 
                }
                break;
            case "tip_grijanja":
                odabranaVrijednost = document.getElementById("grijanje_dropdown_kvadratura").value;
                break;
            case "lokacija":
                odabranaVrijednost = document.getElementById("lokacija_prosjek").value;
                break;
            case "godina_izgradnje":
                odabranaVrijednost = document.getElementById("godina_izgradnje_prosjek").value;
                break;
            default:
                break;
        }
        if(odabranaVrijednost && kvadraturaKriterij[odabraniKriterij]===undefined){
            kvadraturaKriterij[odabraniKriterij] = odabranaVrijednost;
        }
        console.log("Ažurirani kriteriji:", kvadraturaKriterij);
        return;
    }
    else{
        let odabraniKriterij = document.getElementById("kriterij_outlier").value;
        let odabranaVrijednost;
        switch(odabraniKriterij){
            case "tip_nekretnine":
                odabranaVrijednost= document.getElementById("tip_nekretnine_dropdown_outlier_1").value;
                break;
            case "kvadratura":
                let minKvadratura = document.getElementById("kvadratura_od_za_outlier").value;
                let maxKvadratura = document.getElementById("kvadratura_do_za_outlier").value;

                if(minKvadratura && !isNaN(minKvadratura) && kvadraturaKriterij["min_kvadratura"] === undefined){
                    kvadraturaKriterij["min_kvadratura"] = parseInt(minKvadratura); 
                }

                if(maxKvadratura && !isNaN(maxKvadratura) && kvadraturaKriterij["max_kvadratura"] === undefined){
                    kvadraturaKriterij["max_kvadratura"] = parseInt(maxKvadratura); 
                }

                break;
            case "cijena":
                let minCijena = document.getElementById("cijena_od_za_outlier").value;
                let maxCijena = document.getElementById("cijena_do_za_outlier").value;

                if(minCijena && !isNaN(minCijena) && kvadraturaKriterij["min_cijena"] === undefined){
                    kvadraturaKriterij["min_cijena"] = parseInt(minCijena); 
                }

                if(maxCijena && !isNaN(maxCijena) && kvadraturaKriterij["max_cijena"] === undefined){
                    kvadraturaKriterij["max_cijena"] = parseInt(maxCijena); 
                }
                
                break;
            case "tip_grijanja":
                odabranaVrijednost = document.getElementById("grijanje_dropdown_outlier").value;
                break;
            case "lokacija":
                odabranaVrijednost = document.getElementById("lokacija_outlier").value;
                break;
            case "godina_izgradnje":
                odabranaVrijednost = document.getElementById("godina_izgradnje_outlier").value;
                break;
            default:
                break;
        }
        if(odabranaVrijednost && outlierKriterij[odabraniKriterij]===undefined){
            outlierKriterij[odabraniKriterij] = odabranaVrijednost;
            return;
        }
    }
}

//metode za kvadraturu
function resetujFormuZaKvadraturu(){
    obrisiSadrzajDiva("prosjecna_kvadratura");
    obrisiSadrzajDiva("podaci");
    kvadraturaKriterij ={
        tip_nekretnine: undefined,
        min_kvadratura: undefined,
        max_kvadratura: undefined,
        min_cijena: undefined,
        max_cijena: undefined,
        tip_grijanja: undefined,
        lokacija: undefined,
        godina_izgradnje: undefined
    };
}

function izracunajProsjecnuKvadraturu(){
    let kriterij= kvadraturaKriterij;
    let prosjek = statistikaNekretnina.prosjecnaKvadratura(kriterij);
    
    if (isNaN(prosjek) || prosjek === 0) {
        alert("Nema nekretnina koje zadovoljavaju kriterijume!");
        document.getElementById("prosjecna_kvadratura_prikaz").innerHTML = `<p>Nema rezultata.</p>`;
        document.getElementById("podaci").style.display = "grid";
        return;
    }
    //document.getElementById("prosjecna_kvadratura_prikaz").textContent = prosjek;
    document.getElementById("prosjecna_kvadratura_prikaz").innerHTML = `<p>${prosjek.toFixed(2)} m^2</p>`;
    document.getElementById("podaci").style.display = "grid";
}

//metode za outlier
function resetujFormuZaOutlier(){
    obrisiSadrzajDiva("outlier");
    obrisiSadrzajDiva("podaci");
    outlierKriterij = {
        tip_nekretnine: undefined,
        min_kvadratura: undefined,
        max_kvadratura: undefined,
        min_cijena: undefined,
        max_cijena: undefined,
        tip_grijanja: undefined,
        lokacija: undefined,
        godina_izgradnje: undefined
    };
}

function prikaziOutlier(){
    let kriterij = outlierKriterij;
    let svojstvo = document.getElementById("svojstvo_outlier").value;
    let outlier = statistikaNekretnina.outlier(kriterij, svojstvo);
    //document.getElementById("outlier_prikaz").textContent = outlier;
    document.getElementById("outlier_po_kriteriju").innerHTML = `<p>${outlier}</p>`;
    document.getElementById("podaci").style.display = "grid";
}

//metode za moje nekretnine
function prikaziMojeNekretnine(){
    let korisnik= document.getElementById("korisnici_dropdown");

    const odabranaVrijednost = korisnik.value;

    // ako odabere praznu opciju
    if (odabranaVrijednost === "") {
        alert("Molimo odaberite korisnika!");
        return;
    }

    const korisnikJSON = JSON.parse(korisnik.value);

    if(!korisnikJSON){
        alert("Morate odabrati korisnika!");
        return;
    }

    let nekretnine = statistikaNekretnina.mojeNekretnine(korisnikJSON);

    if(nekretnine.length === 0){
        alert("Korisnik nema nekretnina!");
        return;
    }

    const ul = document.getElementById("moje_nekretnine_lista");
    ul.innerHTML = "";

    nekretnine.forEach(nekretnina => {
        let item = `${nekretnina.naziv} (${nekretnina.tip_nekretnine})`;
        ulDodajItemNekretnina(ul, item);
    });

    document.getElementById("podaci").style.display = "grid";
}


//metode za histogram
function izbrisiFormuZaHistogram(){
    let godine = document.getElementById("rangovi_godina");
    let cijene = document.getElementById("rangovi_cijena");

    while(godine.firstChild){
        godine.removeChild(godine.firstChild);
    }

    while(cijene.firstChild){
        cijene.removeChild(cijene.firstChild);
    }

    document.getElementById("godina_od").value = "";
    document.getElementById("godina_do").value = "";

    document.getElementById("cijena_od").value = "";
    document.getElementById("cijena_do").value = "";

    document.getElementById("histogram").innerHTML = "";

    if(histogramGodinaData.length > 0) {
        histogramGodinaData.length = 0;
    }

    if(histogramCijeneData.length > 0) {
        histogramCijeneData.length = 0;
    }
}

function ponistiUnosGodine(){
    document.getElementById("godina_od").value = "";
    document.getElementById("godina_do").value = "";
}

function ponistiUnosCijene(){
    document.getElementById("cijena_od").value = "";
    document.getElementById("cijena_do").value = "";
}

function dodajGodinu(){
    let godinaOd = document.getElementById("godina_od").value;
    let godinaDo = document.getElementById("godina_do").value;

    if(!godinaOd || !godinaDo){
        alert("Morate unijeti obje granice za godine!");
        ponistiUnosGodine();
        return;
    }

    if(parseInt(godinaOd) > parseInt(godinaDo)){
        alert("Pocetna godina mora biti manja od krajnje godine!");
        ponistiUnosGodine();
        return;
    }

    let godine = document.getElementById("rangovi_godina");
    let item = `${godinaOd} - ${godinaDo}`;
    ulDodajItem(godine, item);

    ponistiUnosGodine();
    histogramGodinaData.push([parseInt(godinaOd), parseInt(godinaDo)]);
}

function dodajCijenu(){
    let cijenaOd = document.getElementById("cijena_od").value;
    let cijenaDo = document.getElementById("cijena_do").value;

    if(!cijenaOd || !cijenaDo){
        alert("Morate unijeti obje granice za cijenu!");
        ponistiUnosCijene();
        return;
    }

    if(parseInt(cijenaOd) > parseInt(cijenaDo)){
        alert("Pocetna cijena mora biti manja od krajnje cijene!");
        ponistiUnosCijene();
        return;
    }

    let cijene = document.getElementById("rangovi_cijena");
    let item = `${cijenaOd} - ${cijenaDo}`;
    ulDodajItem(cijene, item);

    ponistiUnosCijene();
    histogramCijeneData.push([parseInt(cijenaOd), parseInt(cijenaDo)]);
}

function iscrtajHistogram(histogram, periodi, rasponiCijena){
    const histogrami = document.getElementById("histogram");
    histogrami.innerHTML = "";

    periodi.forEach((period, indeksPerioda) => {
        const canvas = document.createElement("canvas");
        canvas.id = `histogram_${indeksPerioda}`;
        histogrami.appendChild(canvas);

        const periodData = histogram.filter(item => item.indeksPerioda === indeksPerioda);
        const labels = rasponiCijena.map((raspon, indeks) => `${raspon[0]} - ${raspon[1]}`);
        const podaci = Array(rasponiCijena.length).fill(0);
        
        periodData.forEach(item => {
            podaci[item.indeksRasponaCijena] = item.brojNekretnina;
        });

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Broj nekretnina u periodu (${period.od} - ${period.do})`,
                        data: podaci,
                        backgroundColor: "#f0c14b",
                        borderColor: "#000",
                        borderWidth: 1,
                    },
                ],
            },
            options:{
                responsive: true,
                plugins:{
                    title:{
                        display: true,
                        text: `Histogram za period (${period.od} - ${period.do})`,
                    },
                },
                scales:{
                    x:{
                        title:{
                            display: true,
                            text: 'Raspon cijena',
                        }
                    },
                    y:{
                        title:{
                            display: true,
                            text: 'Broj nekretnina',
                        },
                        ticks:{
                            stepSize: 1,
                            padding: 10,
                        },
                        beginAtZero: true,
                    },
                },
            },
        });
    });
}

function prikaziHistogram(){
    let periodi = [];
    let rasponiCijena = histogramCijeneData;
    let rasponiGodina = histogramGodinaData;

    if(rasponiCijena.length ===0 || rasponiGodina.length === 0){
        alert("Morate unijeti bar po jedan raspon cijena i godina!");
        return;
    }

    for(let i=0; i<rasponiGodina.length; i++){
        periodi.push({od: parseInt(rasponiGodina[i][0]), do: parseInt(rasponiGodina[i][1])});
    }

    let histogram = statistikaNekretnina.histogramCijena(periodi, rasponiCijena);
    iscrtajHistogram(histogram, periodi, rasponiCijena);
}