function prikaziMojeUpite(){
    let listaUpita = PoziviAjax.getMojiUpiti((error, data) =>{
        if(error){
            if(error == "Not Found"){
                //ako je prazna lista upita
                document.getElementById("upiti").innerHTML = `<div class="greske"><p>Niste poslali nijedan upit za nekretnine.</p>`;
                return;
            }
            else if(error == "Unauthorized"){
                document.getElementById("upiti").innerHTML = `<div class="greske"><p>Morate biti prijavljeni kako biste vidjeli svoje upite.</p></div>`;
                return;
            }
        }
        /*if(data.length == 0){
            document.getElementById("upiti").innerHTML = "<p>Niste poslali nijedan upit za nekretnine.</p>";
            return;
        }*/
        let table = "<table>";
        for(let i = 0; i < data.length; i++){
            table += `<tr><td><div class = "upit">Nekretnina ${data[i].id_nekretnine}: ${data[i].tekst_upita}</div></td></tr>`;
        }
        table += "</table>";
        document.getElementById("upiti").innerHTML = table;
    });
    return listaUpita;
}

prikaziMojeUpite();