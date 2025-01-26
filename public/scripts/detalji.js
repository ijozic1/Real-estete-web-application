function getNekretninaIdFromUrl() {
    const params = new URLSearchParams(window.location.search); // Uzima parametre iz URL-a
    return params.get('id'); // vrijednost parametra `id`
}

document.addEventListener('DOMContentLoaded', () => {
    const glavniElement = document.getElementById('upiti');
    const glavniElementZahtjevi = document.getElementById('zahtjevi');
    const glavniElementPonude = document.getElementById('ponude');

    const prethodni = document.getElementById('prethodni');
    const sljedeci = document.getElementById('sljedeci');

    const prethodniZahtjevi = document.getElementById('prethodni_zahtjevi');
    const sljedeciZahtjevi = document.getElementById('sljedeci_zahtjevi');

    const prethodniPonude = document.getElementById('prethodni_ponude');
    const sljedeciPonude = document.getElementById('sljedeci_ponude');

    const idNekretnine = getNekretninaIdFromUrl();
    let upiti = [];
    let zahtjevi = [];
    let ponude = [];

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



        PoziviAjax.get_getInteresovanja(idNekretnine, (error, data) =>{
            if(error){
                glavniElement.innerHTML = `<div class="greske"><p>Došlo je do greške.</p>`;
                glavniElementPonude.innerHTML = `<div class="greske"><p>Došlo je do greške.</p>`;
                glavniElementZahtjevi.innerHTML = `<div class="greske"><p>Došlo je do greške.</p>`;
                //console.log('Greška prilikom dohvatanja interesovanja:', error);
                return;
            }

            upiti = data.upiti;
            zahtjevi = data.zahtjevi;
            ponude = data.ponude;

            //upiti
            if(upiti.length == 0){
                document.getElementById("upiti").innerHTML = `<div class="greske"><p>Nema postavljenih upita za ovu nekretninu.</p>`;
                prethodni.style.display = 'none';
                sljedeci.style.display = 'none';
            }
            else if(upiti.length == 1){
                glavniElement.innerHTML = `
                    <div class="upit">
                        <p><strong>Id korisnika: </strong>${upiti[0].korisnikId}</p>
                        <p><strong>Id upita: </strong>${upiti[0].id}</p>
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

            //zahtjevi
            if(zahtjevi.length == 0){
                document.getElementById("zahtjevi").innerHTML = `<div class="greske"><p>Nema postavljenih zahtjeva za ovu nekretninu.</p>`;
                prethodniZahtjevi.style.display = 'none';
                sljedeciZahtjevi.style.display = 'none';
            }
            else if(zahtjevi.length == 1){
                let status = zahtjevi[0].odobren ? "odobren" : "odbijen";
                if(zahtjevi[0].odobren == null){
                    status = "na čekanju";
                }
                glavniElementZahtjevi.innerHTML = `
                    <div class="zahtjev">
                        <p><strong>Id korisnika: </strong>${zahtjevi[0].korisnikId}</p>
                        <p><strong>Id zahtjeva: </strong>${zahtjevi[0].id}</p>
                        <p><strong>Tekst zahtjeva: </strong>${zahtjevi[0].tekst}</p>
                        <p><strong>Datum zahtjeva: </strong>${zahtjevi[0].trazeniDatum}</p> 
                        <p><strong>Status zahtjeva: </strong>${status}</p>
                    </div>
                `;
                prethodniZahtjevi.style.display = 'none';
                sljedeciZahtjevi.style.display = 'none';
            }
            else{
                //mora tu jer inace se zavrsi prije nego se dobave zahtjevi
                const carouselZahtjevi = postaviCarouselZahtjevi(glavniElementZahtjevi, zahtjevi);
    
                if(carouselZahtjevi){
                    prethodniZahtjevi.addEventListener('click', carouselZahtjevi.fnLijevoZahtjev);
                    sljedeciZahtjevi.addEventListener('click', carouselZahtjevi.fnDesnoZahtjev);
                }
            }

            //ponude
            if(ponude.length == 0){
                document.getElementById("ponude").innerHTML = `<div class="greske"><p>Nema postavljenih ponuda za ovu nekretninu.</p>`;
                prethodniPonude.style.display = 'none';
                sljedeciPonude.style.display = 'none';
            }
            else if(ponude.length == 1){
                let status = ponude[0].odbijenaPonuda ? "odbijena" : "odobrena";
                if(ponude[0].odbijenaPonuda == null){
                    status = "na čekanju";
                }
                glavniElementPonude.innerHTML = `
                    <div class="ponuda">
                        <!--<p><strong>Id korisnika: </strong>${ponude[0].korisnikId}</p>
                        <p><strong>Id ponude: </strong>${ponude[0].id}</p>-->
                        <p><strong>Tekst ponude: </strong>${ponude[0].tekst}</p>
                        <p><strong>Status ponude: </strong>${status}</p>
                    </div>
                `;
                prethodniPonude.style.display = 'none';
                sljedeciPonude.style.display = 'none';
            }
            else{
                //mora tu jer inace se zavrsi prije nego se dobave zahtjevi
                const carouselPonude = postaviCarouselPonude(glavniElementPonude, ponude);
    
                if(carouselPonude){
                    prethodniPonude.addEventListener('click', carouselPonude.fnLijevoPonuda);
                    sljedeciPonude.addEventListener('click', carouselPonude.fnDesnoPonuda);
                }
            }


        });
        


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
                let prikaz=`<br><h3 style="text-align:center">POSLJEDNJIH 5 OBJAVLJENIH NEKRETNINA NA ISTOJ LOKACIJI</h3><br><ul>`;
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

        document.getElementById('tipInteresovanja').addEventListener('change', (event) => {
            const tip = event.target.value;
            const dinamickiDiv = document.getElementById('sadrzaj-dinamicki');
            dinamickiDiv.innerHTML = '';

            if (tip === 'upit' || tip === 'zahtjev') {
                dinamickiDiv.innerHTML = `
                    <label for="tekst">Tekst:</label>
                    <textarea id="tekst" name="tekst" required></textarea>
                `;
                if (tip === 'zahtjev') {
                    dinamickiDiv.innerHTML += `
                        <label for="trazeniDatum">Traženi datum:</label>
                        <input type="date" id="trazeniDatum" name="trazeniDatum" required>
                    `;
                }
            } 
            else if (tip === 'ponuda') {
                let dropdownHtml = `<label for="vezanaPonuda">Id vezane ponude:</label>
                    <select id="vezanaPonuda" name="vezanaPonuda"></select>`;
                dinamickiDiv.innerHTML = `
                    ${dropdownHtml}
                    <label for="tekst">Tekst:</label>
                    <textarea id="tekst" name="tekst" required></textarea>
                `;
        
                // Popunjavanje dropdown-a za vezane ponude
                //ovdje proci kroz sve ponude i izvuci vezane za korisnikovu ili sve ako je admin
                //treba moci unijeti cijenu
                /*const vezanaPonudaDropdown = document.getElementById('vezanaPonuda');
                if (error || ponude.length === 0) {
                        vezanaPonudaDropdown.innerHTML = '<option disabled selected>Nema dostupnih ponuda</option>';
                        vezanaPonudaDropdown.disabled = true;
                        return;
                    }
                    ponude.forEach(ponuda => {
                        vezanaPonudaDropdown.innerHTML += `<option value="${ponuda.id}">${ponuda.id}</option>`;
                    });
                });*/
            }
        });
        /*U UI treba omoguciti adminu da odobri zahtjev ili ponudu i useru da odbiju ponude koje su dodane kao child na njegovu*/

        document.getElementById('novaForma').addEventListener('submit', (event) => {
            event.preventDefault();
        
            const tip = document.getElementById('tipInteresovanja').value;            

            if(tip === 'upit'){
                const tekst = document.getElementById('tekst').value;
                if(!tekst){
                    alert('Unesite tekst upita!');
                    return;
                }
                PoziviAjax.mpl_postUpit(idNekretnine, tekst, (error, response) => {
                    if (error) {
                        alert('Greška prilikom dodavanja upita.');
                        return;
                    }
                    console.log('Upit uspješno postavljen!');
                    window.location.reload();
                });
            }

            else if(tip === 'zahtjev'){
                const tekst = document.getElementById('tekst').value;
                const trazeniDatum = document.getElementById('trazeniDatum').value;
                if(!tekst || !trazeniDatum){
                    alert('Unesite tekst zahtjeva i datum!');
                    return;
                }
                PoziviAjax.postNekretninaZahtjev(idNekretnine, tekst, trazeniDatum, (error, response) => {
                    if (error) {
                        alert('Greška prilikom dodavanja zahtjeva.');
                        return;
                    }
                    console.log('Zahtjev uspješno postavljen!');
                    window.location.reload();
                });
            }

            else{
                const tekst = document.getElementById('tekst').value;
                const vezanaPonuda = document.getElementById('vezanaPonuda').value;
                const cijenaPonude = document.getElementById('cijenaPonude').value;
                if(!tekst || !cijenaPonude){
                    alert('Unesite tekst ponude i cijenu poruke!');
                    return;
                }
                PoziviAjax.postNekretninaPonuda(idNekretnine, tekst, cijenaPonude, new Date(), vezanaPonuda, (error, response) => {
                    if (error) {
                        alert('Greška prilikom dodavanja ponude.');
                        return;
                    }
                    console.log('Ponuda uspješno postavljena!');
                    window.location.reload();
                });
            }
        });

        return data;
    });
});