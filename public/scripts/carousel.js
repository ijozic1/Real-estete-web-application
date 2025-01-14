function postaviCarousel(glavniElement, sviElementi, indeks=0) {
    if(glavniElement === null || glavniElement === undefined || 
        !Array.isArray(sviElementi) || sviElementi.length === 0 || 
        indeks < 0 || indeks >= sviElementi.length) {
            return null;
    }

    function prikaziTrenutniElement(){
        glavniElement.innerHTML=sviElementi[indeks].outerHTML;

    }

    function fnLijevo(){
        indeks=(indeks - 1 + sviElementi.length) % sviElementi.length;	
        prikaziTrenutniElement();
    }

    function fnDesno(){
        indeks=(indeks + 1) % sviElementi.length;
        prikaziTrenutniElement();
    }

    return{fnLijevo, fnDesno};
}