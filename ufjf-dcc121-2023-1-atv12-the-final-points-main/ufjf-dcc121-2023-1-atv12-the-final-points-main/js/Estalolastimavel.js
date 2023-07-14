import { calculateEnergyPlayer, contabilizaNoCampo, getCard, getDeckInicial, getDeckPlayer, getPlayer, jogaCartaComputer, passaRound } from "./regras.js";



const cartaNaMao = document.querySelector(".cartaNaMao");
const botaoPassaRound = document.querySelector(".passaRound")
botaoPassaRound.addEventListener("click",passarDeRound)

let elemArrastado = null;


function comecaArrastar(e) {

    elemArrastado = e.target;


}

function recebeAlgo(e) {
    if (elemArrastado) {
        if (!e.target.hasChildNodes() && e.target.classList.contains("cartaBaixada")) {
            console.log(elemArrastado)
            let idNaMaoPLayer = elemArrastado.dataset.posicao
            console.log(`id na mao do player${idNaMaoPLayer}`)
            let deckPlayer = getDeckPlayer()
            if (calculateEnergyPlayer(deckPlayer[idNaMaoPLayer])) {
                e.target.appendChild(elemArrastado);
                console.log(`moveu a carta`)
                elemArrastado.draggable = false
                elemArrastado = null
                jogaCartaComputer()
                console.log(e.target.id)
                contabilizaNoCampo(deckPlayer[idNaMaoPLayer], e.target.id)
            }


        }
    }
}

function passarDeRound() {
    
    let verificaFimJogo=passaRound();
    if(!verificaFimJogo){
        const maoDoPlayer = getDeckPlayer();
        const eCarta = document.createElement('div');
        const eCartaImg = new Image(100, 100);
        eCartaImg.classList.add('image')
        const carta = getCard(maoDoPlayer[maoDoPlayer.length-1])
        console.log(carta)
        if (carta.elemento == 'Fogo') {
            eCarta.classList.add('cartaF');
            eCartaImg.src = `../Fogo.jpg`;
            eCarta.appendChild(eCartaImg);
        } else if (carta.elemento == 'Agua') {
            eCarta.classList.add('cartaA');
            eCartaImg.src = `../agua.jpg`;
            eCarta.appendChild(eCartaImg);
        } else if (carta.elemento == 'Terra') {
            eCarta.classList.add('cartaT');
            eCartaImg.src = `../terra.jpg`;
            eCarta.appendChild(eCartaImg);
        } else if (carta.elemento == 'Ar') {
            eCarta.classList.add('cartaAr');
            eCartaImg.src = `../ar.jpg`;
            eCarta.appendChild(eCartaImg);
        }
        eCartaImg.draggable = false;
        eCarta.draggable = true;
        eCarta.addEventListener('dragstart', comecaArrastar);
        eCarta.dataset.posicao = maoDoPlayer.length-1;
        console.log(cartaNaMao);
        cartaNaMao.appendChild(eCarta);
    }else{
        botaoPassaRound.disabled = true;
        cartaNaMao.remove();
    }
    
}


function passouPor(e) {
    e.preventDefault();
    //console.log(e)
}

function setup() {

    criaCasa()
    const maoDoPlayer = getDeckInicial();
    console.log(maoDoPlayer)

    for (let i = 0; i < maoDoPlayer.length; i++) {
        const eCarta = document.createElement('div');
        const eCartaImg = new Image(100, 100);
        eCartaImg.classList.add('image')
        const carta = getCard(maoDoPlayer[i])
        console.log(carta)
        if (carta.elemento == 'Fogo') {
            eCarta.classList.add('cartaF');
            eCartaImg.src = `../Fogo.jpg`;
            eCarta.appendChild(eCartaImg);
        } else if (carta.elemento == 'Agua') {
            eCarta.classList.add('cartaA');
            eCartaImg.src = `../agua.jpg`;
            eCarta.appendChild(eCartaImg);
        } else if (carta.elemento == 'Terra') {
            eCarta.classList.add('cartaT');
            eCartaImg.src = `../terra.jpg`;
            eCarta.appendChild(eCartaImg);
        } else if (carta.elemento == 'Ar') {
            eCarta.classList.add('cartaAr');
            eCartaImg.src = `../ar.jpg`;
            eCarta.appendChild(eCartaImg);
        }
        eCartaImg.draggable = false;
        eCarta.draggable = true;
        eCarta.addEventListener('dragstart', comecaArrastar);
        eCarta.dataset.posicao = i;
        console.log(cartaNaMao);
        cartaNaMao.appendChild(eCarta);
    }
}

function criaCasa() {
    // const campoCartaBaixada11 = campoJogador.getElementsByClassName('.campoCartaBaixada11')
    // const campoCartaBaixada12 = campoJogador.getElementsByClassName('.campoCartaBaixada12')
    // const campoCartaBaixada21 = campoJogador.getElementsByClassName('.campoCartaBaixada21')
    // const campoCartaBaixada22 = campoJogador.getElementsByClassName('.campoCartaBaixada22')
    // const campoCartaBaixada31 = campoJogador.getElementsByClassName('.campoCartaBaixada31')
    // const campoCartaBaixada32 = campoJogador.getElementsByClassName('.campoCartaBaixada32')
    for (let index = 0; index < 12; index++) {
        let id = index + 1
        const cartaBaixada = document.getElementById(id)
        console.log(cartaBaixada)
        cartaBaixada.addEventListener('dragover', passouPor);
        cartaBaixada.addEventListener('drop', recebeAlgo);
    }
}

setup()