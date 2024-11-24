document.addEventListener('DOMContentLoaded', () => {
    const glavniElement = document.getElementById('upiti');
    const sviElementi = Array.from(document.querySelectorAll('.upit'));

    const prethodni = document.getElementById('prethodni');
    const sljedeci = document.getElementById('sljedeci');

    if(sviElementi.length <= 1){
        return;
    }

    const carousel = postaviCarousel(glavniElement, sviElementi);

    if(carousel){
        prethodni.addEventListener('click', carousel.fnLijevo);
        sljedeci.addEventListener('click', carousel.fnDesno);
    }
});