const dodajCijenuBtn = document.getElementById("cijena_dodaj_opseg");
const dodajGodinuBtn = document.getElementById("godina_dodaj_opseg");
const resetBtn = document.getElementById("reset");
const prikaziHistoBtn = document.getElementById("prikazi_histogram");
/*const resetOstaloBtn = document.getElementById("reset_ostalo");*/
/*const prikaziOstaloBtn = document.getElementById("prikazi_podatke");*/

const histogramCijeneData = [];
const histogramGodinaData = [];

dodajCijenuBtn.addEventListener("click", dodajCijenu);
dodajGodinuBtn.addEventListener("click", dodajGodinu);
resetBtn.addEventListener("click", izbrisiFormuZaHistogram)
prikaziHistoBtn.addEventListener("click", prikaziHistogram);
/*resetOstaloBtn.addEventListener("click", izbrisiFormuZaOstalo)*/
/*prikaziOstaloBtn.addEventListener("click", prikaziPodatkeOstalo);*/

const statistikaNekretnina = StatistikaNekretnina();

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
                korisnik_id: 1,
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
]

function popuniDropdownKorisnik(idDropdown) {
    const dropdown = document.getElementById(idDropdown);

    if (!dropdown) {
        console.error(`Element sa ID '${idDropdown}' nije pronađen.`);
        return;
    }

    listaKorisnika.forEach(korisnik => {
        const opcija = document.createElement("option");
        opcija.value = korisnik.id; 
        opcija.textContent = `${korisnik.ime} ${korisnik.prezime} (${korisnik.username})`;
        dropdown.appendChild(opcija);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    popuniDropdownKorisnik("korisnici_dropdown");
});

izbrisiFormuZaHistogram();
//izbrisiFormuZaOstalo();

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

/*function izbrisiFormuZaOstalo(){
    document.getElementById("stan").checked = false;
    document.getElementById("kuca").checked = false;
    document.getElementById("poslovni_prostor").checked = false;

    document.getElementById("min_kvadratura").value = "";
    document.getElementById("max_kvadratura").value = "";

    document.getElementById("lokacija").value = "";
    
    document.getElementById("plin").checked=false;
    document.getElementById("toplana").checked=false;
    document.getElementById("struja").checked=false;

    document.getElementById("godina_izgradnje").value = "";

    document.getElementById("cijena_od_ostalo").value = "";
    document.getElementById("cijena_do_ostalo").value = "";

    document.getElementById("korisnici_dropdown").value = "";

    //document.getElementById("ostalo").innerHTML = "";
}*/

function prikaziPodatkeOstalo(){

}


function ponistiUnosGodine(){
    document.getElementById("godina_od").value = "";
    document.getElementById("godina_do").value = "";
}

function ponistiUnosCijene(){
    document.getElementById("cijena_od").value = "";
    document.getElementById("cijena_do").value = "";
}

function ulDodajItem(div, item){
    let li = document.createElement("li");
    li.innerHTML = item;
    li.id = "li_";
    div.appendChild(li);
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