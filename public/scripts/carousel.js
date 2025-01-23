function postaviCarousel(glavniElement, sviElementi, indeks=0) {
    if(glavniElement === null || glavniElement === undefined || 
        !Array.isArray(sviElementi) || sviElementi.length === 0 || 
        indeks < 0 || indeks >= sviElementi.length) {
            return null;
    }

    let page = 0;
    let dobavljeniSvi = false;

    function prikaziTrenutniElement(){
        /*glavniElement.innerHTML=sviElementi[indeks].outerHTML;*/
        const element = sviElementi[indeks];
        glavniElement.innerHTML = `
            <div class="upit">
                <p><strong>Id korisnika: </strong>${element.korisnik_id}</p>
                <p><strong>Tekst upita: </strong>${element.tekst_upita}</p>
            </div>
        `;
    }

    function fnLijevo(){
        indeks=(indeks - 1 + sviElementi.length) % sviElementi.length;
        
        if(sviElementi.length % 3 == 0 && !dobavljeniSvi && indeks == 0){
            page++;
            PoziviAjax.getNextUpiti(getNekretninaIdFromUrl(), page, (error, data) =>{
                if(error){
                    if(error == "Not Found"){
                        //prazna lista upita
                        dobavljeniSvi = true;
                        return;
                    }
                }
                
                sviElementi.push(...data);
            });
        }

        prikaziTrenutniElement();
    }

    function fnDesno(){
        indeks=(indeks + 1) % sviElementi.length;

        if(sviElementi.length % 3 == 0 && !dobavljeniSvi && indeks == sviElementi.length - 1){
            page++;
            PoziviAjax.getNextUpiti(getNekretninaIdFromUrl(), page, (error, data) =>{
                if(error){
                    if(error == "Not Found"){
                        //prazna lista upita
                        dobavljeniSvi = true;
                        return;
                    }
                }
                
                sviElementi.push(...data);
            });
        }

        prikaziTrenutniElement();
    }

    prikaziTrenutniElement();

    return{fnLijevo, fnDesno};
}