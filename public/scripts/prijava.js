window.onload =function(){
    var username=document.getElementById("username")
    var password=document.getElementById("password")
    
    let dugme=document.getElementById("dugme")
    
    dugme.onclick = function(){
        
        PoziviAjax.postLogin(username.value,password.value,function(err,data){
            if(err != null){
                const errResponse = JSON.parse(err);
                if(errResponse.greska && errResponse.greska.includes("Pokusajte ponovo za")){
                    var divElement=document.getElementById("areaBelow");
                    divElement.innerHTML=`<h2>${JSON.parse(err).greska}</h2>`;
                    window.alert(JSON.parse(err).greska);

                }
                else{
                    window.alert(err);
                }
                
            }
            else{
                var message=JSON.parse(data)
                if(message.poruka=="Neuspješna prijava"){
                    var divElement=document.getElementById("areaBelow")
                    divElement.innerHTML="<h2>Neispravni podaci</h2>"
                }
                else{
                    window.location.href="http://localhost:3000/nekretnine.html"
                }
            }
        })
    }
}