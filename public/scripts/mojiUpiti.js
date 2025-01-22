function prikaziMojeUpite(){
    let listaUpita = PoziviAjax.getMojiUpiti((error, data) =>{
        if(error){
            document.getElementById("upiti").innerHTML = `<p>${error}</p>`;
            return;
        }
        if(data.length == 0){
            document.getElementById("upiti").innerHTML = "<p>Niste poslali nijedan upit za nekretnine.</p>";
            return;
        }
        let table = "<table>";
        for(let i = 0; i < data.length; i++){
            table += `<tr><td>Nekretnina ${data[i].id_nekretnine}: ${data[i].tekst_upita}</td></tr>`;
        }
        table += "</table>";
        document.getElementById("upiti").innerHTML = table;
    });
    return listaUpita;
}

prikaziMojeUpite();