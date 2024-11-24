function postaviCarousel(glavniElement, sviElementi, indeks=0) {
    if(glavniElement === null || sviElementi === undefined || sviElementi.length === 0) {
        return;
    }

    function fnLijevo(){
        if(indeks === 0) {
            indeks = sviElementi.length - 1;
        }
        else {
            indeks--;
        }
        glavniElement.innerHTML = sviElementi[indeks];
    }

    function fnDesno(){
        if(indeks === sviElementi.length - 1) {
            indeks = 0;
        }
        else {
            indeks++;
        }
        glavniElement.innerHTML = sviElementi[indeks];
    }
}