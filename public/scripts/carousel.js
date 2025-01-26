function postaviCarousel(glavniElement, sviElementi, indeks=0) {
    if(glavniElement === null || glavniElement === undefined || 
        !Array.isArray(sviElementi) || sviElementi.length === 0 || 
        indeks < 0 || indeks >= sviElementi.length) {
            return null;
    }

    function prikaziTrenutniElement(){
        const element = sviElementi[indeks];
        glavniElement.innerHTML = `
            <div class="upit">
                <p><strong>ID korisnika: </strong>${element.korisnikId}</p>
                <p><strong>ID upita: </strong>${element.id}</p>
                <p><strong>Tekst upita: </strong>${element.tekst}</p>
            </div>
        `;
    }

    function fnLijevo(){
        indeks=(indeks - 1 + sviElementi.length) % sviElementi.length;
        prikaziTrenutniElement();
    }

    function fnDesno(){
        indeks=(indeks + 1) % sviElementi.length;
        prikaziTrenutniElement();
    }

    prikaziTrenutniElement();
    return{fnLijevo, fnDesno};
}

function postaviCarouselZahtjevi(glavniElement, sviElementi, indeks=0) {
    if(glavniElement === null || glavniElement === undefined || 
        !Array.isArray(sviElementi) || sviElementi.length === 0 || 
        indeks < 0 || indeks >= sviElementi.length) {
            return null;
    }

    function prikaziTrenutniElementZahtjevi(){
        const element = sviElementi[indeks];
        let status = element.odobren ? "odobren" : "odbijen";
        if(element.odobren == null){
            status = "na čekanju";
        }
        glavniElement.innerHTML = `
            <div class="zahtjev">
                <p><strong>ID korisnika: </strong>${element.korisnikId}</p>
                <p><strong>ID zahtjeva: </strong>${element.id}</p>
                <p><strong>Tekst zahtjeva: </strong>${element.tekst}</p>
                <p><strong>Datum zahtjeva: </strong>${element.trazeniDatum}</p> 
                <p><strong>Status zahtjeva: </strong>${status}</p>
            </div>
        `;
    }

    function fnLijevoZahtjev(){
        indeks=(indeks - 1 + sviElementi.length) % sviElementi.length;
        prikaziTrenutniElementZahtjevi();
    }

    function fnDesnoZahtjev(){
        indeks=(indeks + 1) % sviElementi.length;
        prikaziTrenutniElementZahtjevi();
    }

    prikaziTrenutniElementZahtjevi();
    return{fnLijevoZahtjev, fnDesnoZahtjev};
}

function postaviCarouselPonude(admin, glavniElement, sviElementi, indeks=0) {
    if(glavniElement === null || glavniElement === undefined || 
        !Array.isArray(sviElementi) || sviElementi.length === 0 || 
        indeks < 0 || indeks >= sviElementi.length) {
            return null;
    }

    function prikaziTrenutniElementPonuda(){
        const element = sviElementi[indeks];
        let status = element.odbijenaPonuda ? "odbijena" : "odobrena";
        if(element.odobren == null){
            status = "na čekanju";
        }

        let cijena = element.cijenaPonude ? element.cijenaPonude : "nije Vaša ponuda";

        if(admin){
            glavniElement.innerHTML = `
            <div class="ponuda">
                <p><strong>ID korisnika: </strong>${element.korisnikId}</p>
                <p><strong>ID ponude: </strong>${element.id}</p>
                <p><strong>Tekst ponude: </strong>${element.tekst}</p>
                <p><strong>Status ponude: </strong>${status}</p>
                <p><strong>Cijena ponude: </strong>${cijena}</p>
                <p><strong>Datum ponude: </strong>${element.datumPonude}</p>
                <p><strong>ID vezane ponude: </strong>${element.parent_offerId ? element.parent_offerId : "Korijenska"}</p>
            </div>
        `;
        }
        else{
            glavniElement.innerHTML = `
            <div class="ponuda">
                <p><strong>ID ponude: </strong>${element.id}</p>
                <p><strong>Tekst ponude: </strong>${element.tekst}</p>
                <p><strong>Status ponude: </strong>${status}</p>
                <p><strong>Cijena ponude: </strong>${cijena}</p>
            </div>
        `;
        }
        
    }

    function fnLijevoPonuda(){
        indeks=(indeks - 1 + sviElementi.length) % sviElementi.length;
        prikaziTrenutniElementPonuda();
    }

    function fnDesnoPonuda(){
        indeks=(indeks + 1) % sviElementi.length;
        prikaziTrenutniElementPonuda();
    }

    prikaziTrenutniElementPonuda();
    return{fnLijevoPonuda, fnDesnoPonuda};
}