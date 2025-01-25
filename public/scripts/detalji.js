function getNekretninaIdFromUrl() {
    const params = new URLSearchParams(window.location.search); // Uzima parametre iz URL-a
    return params.get('id'); // vrijednost parametra `id`
}

document.addEventListener('DOMContentLoaded', () => {
    const glavniElement = document.getElementById('upiti');
    //const sviElementi = Array.from(document.querySelectorAll('.upit'));

    const prethodni = document.getElementById('prethodni');
    const sljedeci = document.getElementById('sljedeci');

    const idNekretnine = getNekretninaIdFromUrl();
    let upiti = [];

    PoziviAjax.getNekretnina(idNekretnine, (error, data) =>{
        if(error){
            document.getElementById('osnovno').innerHTML = `<div class="greske"><p>Došlo je do greške.</p>`;
            return;
        }
        document.getElementById('slika').src = `../Resources/${data.id}.jpg`;
        document.getElementById('naziv').innerHTML = `<strong>Naziv:</strong> ${data.naziv}`;
        document.getElementById('kvadratura').innerHTML = `<strong>Kvadratura:</strong> ${data.kvadratura}`;
        document.getElementById('cijena').innerHTML = `<strong>Cijena:</strong> ${data.cijena}`;
        document.getElementById('tip_grijanja').innerHTML = `<strong>Tip grijanja:</strong> ${data.tip_grijanja}`;
        document.getElementById('lokacija').innerHTML = `
            <strong>Lokacija:</strong> 
            <a href="#" id="lokacija-link">${data.lokacija}</a>
        `;
        document.getElementById('godina_izgradnje').innerHTML = `<strong>Godina izgradnje:</strong> ${data.godina_izgradnje}`;
        document.getElementById('datum_objave').innerHTML = `<strong>Datum objave:</strong> ${data.datum_objave.slice(-5,-1)}`;
        document.getElementById('opis').innerHTML = `<p><strong>Opis:</strong> ${data.opis}</p>`;

        upiti = data.upiti;

        if(upiti.length == 0){
            document.getElementById("upiti").innerHTML = `<div class="greske"><p>Nema postavljenih upita za ovu nekretninu.</p>`;
            prethodni.style.display = 'none';
            sljedeci.style.display = 'none';
        }
        else if(upiti.length == 1){
            glavniElement.innerHTML = `
                <div class="upit">
                    <p><strong>Id korisnika: </strong>${upiti[0].korisnikId}</p>
                    <p><strong>Tekst upita: </strong>${upiti[0].tekst}</p>
                </div>
            `;
            prethodni.style.display = 'none';
            sljedeci.style.display = 'none';
        }
        else{
            //mora tu jer inace se zavrsi prije nego se dobave upiti
            const carousel = postaviCarousel(glavniElement, upiti);

            if(carousel){
                prethodni.addEventListener('click', carousel.fnLijevo);
                sljedeci.addEventListener('click', carousel.fnDesno);
            }
        }
        


        //lokacija
        document.getElementById('lokacija-link').addEventListener('click', (e) => {
            e.preventDefault();
            const lokacija = data.lokacija;
    
            PoziviAjax.getTop5Nekretnina(lokacija, (err, nekretnine) => {
                if (err) {
                    console.error('Greška prilikom dohvatanja top 5 nekretnina:', err);
                    return;
                }
    
                const top5Div = document.getElementById('top5-nekretnine');
                let prikaz=`<br><h2>Posljednjih 5 objavljenih nekretnina na istoj lokaciji</h2><br><ul>`;
                nekretnine.forEach(nekretnina => {
                    prikaz += `
                        <li><div class="nekretnina">
                            <h3>${nekretnina.naziv}</h3>
                            <p>Kvadratura: ${nekretnina.kvadratura} m²</p>
                            <p>Cijena: ${nekretnina.cijena} BAM</p>
                            <a href="detalji.html?id=${nekretnina.id}" class="detalji-dugme">Detalji</a>
                        </div></li>
                    `;
                });
                prikaz += `</ul>`;
                top5Div.innerHTML = prikaz;
            });
        });

        return data;
    });
});