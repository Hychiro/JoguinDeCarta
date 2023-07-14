
const cards = 
[{elemento : 'Fogo', energia:2  ,poder: 3},
{elemento : 'Terra', energia: 4 ,poder: 4},
{elemento : 'Ar', energia: 1 ,poder: 1},
{elemento : 'Agua', energia: 3 ,poder: 2},
{elemento : 'Fogo', energia: 2  ,poder: 3},
{elemento : 'Ar', energia : 1  ,poder: 1},
{elemento : 'Agua', energia : 3 ,poder: 2},
{elemento : 'Terra', energia : 4 ,poder: 4},
{elemento : 'Agua', energia : 3 ,poder: 2},
{elemento : 'Fogo', energia : 2 ,poder: 3},
{elemento : 'Ar', energia:1 ,poder: 1},                                        
{elemento : 'Terra', energia:4 ,poder: 4}]

const contaRodada = document.querySelector('.contaRodada');
const energiaPlayer = document.querySelector('.energiaPlayer');

const player  = {ordem: [1,2,3,4,5,6,7,8,9,10,11,12], energy: 2}
const computer  = {ordem: [1,2,3,4,5,6,7,8,9,10,11,12], energy: 2}
let contadorRodada = 0
const deckPlayer = []
const deckComputador = []
const cartasJogadasComputador = []
let sequenciaJogadasPc = []
let numCartasJogadasPc = 0
let cardCont = 0


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

export function getDeckInicial(){

    player.ordem = shuffle(player.ordem);
    computer.ordem = shuffle(computer.ordem);
    sequenciaJogadasPc = shuffle(computer.ordem);
    let index = 0
    for (index = 0; index < 4; index++) {
        deckPlayer.push(player.ordem[index]);
        deckComputador.push(computer.ordem[index]);
        cardCont = cardCont+1;
    }
    deckPlayer.push(player.ordem[index]);
    contaRodada.innerText = `Rodada ${contadorRodada+1}`;
    energiaPlayer.innerText = `${player.energy}`;
    return deckPlayer;
}

export function getDeckPlayer(){
    return deckPlayer;
}

export function getDeckComputer(){
    return deckComputador;
}

export function gettabuleiroJogador(){
    return tabuleiroJogador;
}

export function gettabuleiroComputer(){
    return tabuleiroComputador;
}


export function getCard(id){
    return cards[id-1];
}

export function passaRound(){
   
    contadorRodada = contadorRodada + 1;
    contaRodada.innerText = `Rodada ${contadorRodada+1}`;
    let verificaFim=verificaFimDeJogo();
    player.energy =  contadorRodada+2;
    energiaPlayer.innerText = `${player.energy}`;
    computer.energy = contadorRodada+2;
    compraCard();
   return verificaFim;
}

export function compraCard(){
    cardCont = cardCont+1;
    deckPlayer.push(player.ordem[cardCont]);
    deckComputador.push(computer.ordem[cardCont]);


}

export function calculateEnergyPlayer(cardNum){
    console.log(`numero da carta${cardNum-1}`)
    console.log(`energia player ${player.energy} -  energia carta ${cards[cardNum-1].energia}`)
    if (cards[cardNum-1].energia <= player.energy){
        player.energy =  player.energy - cards[cardNum-1].energia
        energiaPlayer.innerText = `${player.energy}`;
        if(player.energy == 0 ){
            console.log("jogador gastou toda a energia")
        }
        return true
    }
    return false
}

function criaCardDoPcNaCasa(cartaAnalisada)
{
    numCartasJogadasPc = numCartasJogadasPc+1;
    const eCasa = document.getElementById(sequenciaJogadasPc[numCartasJogadasPc]+12);
    const cartaAserJogada = document.createElement('div');
    const cartaAserJogadaImg = new Image(100, 100);
    cartaAserJogadaImg.classList.add('image')
    const carta = getCard(cartaAnalisada)
    if (carta.elemento == 'Fogo') {
        cartaAserJogada.classList.add('cartaF');
        cartaAserJogadaImg.src = `../Fogo.jpg`;
        cartaAserJogada.appendChild(cartaAserJogadaImg);
    } else if (carta.elemento == 'Agua') {
        cartaAserJogada.classList.add('cartaA');
        cartaAserJogadaImg.src = `../agua.jpg`;
        cartaAserJogada.appendChild(cartaAserJogadaImg);
    } else if (carta.elemento == 'Terra') {
        cartaAserJogada.classList.add('cartaT');
        cartaAserJogadaImg.src = `../terra.jpg`;
        cartaAserJogada.appendChild(cartaAserJogadaImg);
    } else if (carta.elemento == 'Ar') {
        cartaAserJogada.classList.add('cartaAr');
        cartaAserJogadaImg.src = `../ar.jpg`;
        cartaAserJogada.appendChild(cartaAserJogadaImg);
    }
    cartaAserJogadaImg.draggable = false;
    cartaAserJogada.draggable = false;
    eCasa.append(cartaAserJogada);
    contabilizaNoCampo(cartaAnalisada, sequenciaJogadasPc[numCartasJogadasPc]+12)
}

export function jogaCartaComputer(){
    let deck = getDeckComputer();
    for (let index = 0; index < deck.length; index++) {
        const cartaAnalisada = deck[index];
        if (!cartasJogadasComputador.find(element => element == cartaAnalisada)){
            if(getCard(cartaAnalisada).energia <= getComputer().energy){
                getComputer().energy =  getComputer().energy - getCard(cartaAnalisada).energia;
                cartasJogadasComputador.push(cartaAnalisada);
                criaCardDoPcNaCasa(cartaAnalisada);

            }
        }
        if(getComputer().energy == 0 ){
            console.log("pc gastou toda a energia")
            break;
        }
        
    }
}

export function contabilizaNoCampo(idCarta, idPosicao){
    console.log(`index da carta contabilizada${idCarta-1}`);
    if(idPosicao<=4){
        const pontuacaoJogadorCampo1 = document.querySelector(".campo1J");
        pontuacaoJogadorCampo1.textContent = `${cards[idCarta-1].poder+ Number(pontuacaoJogadorCampo1.textContent)}`
    }else if( idPosicao> 4 & idPosicao<=8){
        const pontuacaoJogadorCampo2 = document.querySelector(".campo2J");
        pontuacaoJogadorCampo2.textContent = `${cards[idCarta-1].poder+ Number(pontuacaoJogadorCampo2.textContent)}`
    }else if( idPosicao> 8 & idPosicao<=12){
        const pontuacaoJogadorCampo3 = document.querySelector(".campo3J");
        pontuacaoJogadorCampo3.textContent = `${cards[idCarta-1].poder+ Number(pontuacaoJogadorCampo3.textContent)}`
    }else if( idPosicao> 12 & idPosicao<=16){
        const pontuacaoComputadorCampo1 = document.querySelector(".campo1C");
        pontuacaoComputadorCampo1.textContent = `${cards[idCarta-1].poder+ Number(pontuacaoComputadorCampo1.textContent)}`
    }else if( idPosicao> 16 & idPosicao<=20){
        const pontuacaoComputadorCampo2 = document.querySelector(".campo2C");
        pontuacaoComputadorCampo2.textContent = `${cards[idCarta-1].poder+ Number(pontuacaoComputadorCampo2.textContent)}`
    }else if( idPosicao> 20 & idPosicao<=24){
        const pontuacaoComputadorCampo3 = document.querySelector(".campo3C");
        pontuacaoComputadorCampo3.textContent = `${cards[idCarta-1].poder+ Number(pontuacaoComputadorCampo3.textContent)}`
    }
}

export function getPlayer(){
    return player;
}

export function getComputer(){
    return computer;
}

function verificaFimDeJogo(){
    
    if(contadorRodada>=6){
        let comparaCampos = [0,0,0]
        for (let index = 1; index <=3; index++) {
            comparaCampos[index-1] = verificaVencedorCampo(index);
        }

        if(verificaVencedorJogo(comparaCampos)){
            window.alert("Parabéns por vencer. Caso queira jogar mais reinicie a página.");
           
        }else{
            window.alert("Infelizmente não foi dessa vez. Caso queira jogar mais reinicie a página.");
        }
        return true
    }
    return false
}

export function verificaVencedorCampo(indice){
    let valor = 0;
    if(indice == 1){
        const pontuacaoJogadorCampo1 = document.querySelector(".campo1J");
        const pontuacaoComputadorCampo1 = document.querySelector(".campo1C");
        valor = `${Number(pontuacaoJogadorCampo1.textContent) - Number(pontuacaoComputadorCampo1.textContent)}`;
    }else if(indice == 2){
        const pontuacaoJogadorCampo2 = document.querySelector(".campo2J");
        const pontuacaoComputadorCampo2 = document.querySelector(".campo2C");
        valor = `${Number(pontuacaoJogadorCampo2.textContent) - Number(pontuacaoComputadorCampo2.textContent)}`;
    }else if(indice == 3){
        const pontuacaoJogadorCampo3 = document.querySelector(".campo3J");
        const pontuacaoComputadorCampo3 = document.querySelector(".campo3C");
        valor = `${Number(pontuacaoJogadorCampo3.textContent) - Number(pontuacaoComputadorCampo3.textContent)}`;
    }
    return valor;
}

export function verificaVencedorJogo(resultadoDosCampos){
    let contadorDeVitoriasJogador = 0
    for (let index = 0; index < resultadoDosCampos.length; index++) {
        if(resultadoDosCampos[index]>0){
            contadorDeVitoriasJogador = contadorDeVitoriasJogador+1
        }else if(resultadoDosCampos[index] <0){
            contadorDeVitoriasJogador = contadorDeVitoriasJogador-1
        }else{
            contadorDeVitoriasJogador = contadorDeVitoriasJogador-1
        }
        
    }

    if(contadorDeVitoriasJogador>0){
        console.log("player Venceu");
        return true;
    }else{
        console.log("player Perdeu");
        return false;
    }

}