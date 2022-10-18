/*************************** Criação das variáveis utilziadas no código ***************************/
var canvas, context,
    barraWidth, barraHeigth,
    jogadorPosX, jogadorPosY,
    teclaCimaPressionada1, teclaBaixoPressionada1,
    teclaCimaPressionada2, teclaBaixoPressionada2,

    oponentePosX, oponentePosY,
    oponenteParaCima,
    bolaRaio,
    bolaPosX, bolaPosY,
    bolaParaDireita,
    bolaAngulo,
    bolaTempo,
    velocidadeJogador, velocidadeOponente,
    velocidadeBola,
    pontosJogador, pontosOponente;


function iniciarJogo() {

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    //Configurações de largura, tamanho e posicionamento da barra
    barraWidth = 30;
    barraHeigth = 90;
    jogadorPosX = 0;
    jogadorPosY = (canvas.height - barraHeigth) / 2;
    teclaBaixoPressionada = false;
    teclaCimaPressionada = false;

    oponentePosX = canvas.width - barraWidth;
    oponentePosY = 0;
    oponenteParaCima = false;

    //Configuração da dimensão e posicionamento inicial da bola
    bolaRaio = 10;
    bolaPosX = canvas.width / 2;
    bolaPosY = canvas.height / 2;

    bolaParaDireita = false;
    bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
    bolaTempo = 0;
    velocidadeJogador = 15;
    velocidadeOponente = 15;
    velocidadeBola = 20;
    pontosJogador = 0;
    pontosOponente = 0;

    //Mantém a tecla como "falso" para não realizar ação
    document.addEventListener('keyup', keyUp1, false);
    document.addEventListener('keydown', keyDown1, false);
    document.addEventListener('keyup', keyDown2, false);
    document.addEventListener('keydown', keyUp2, false);

    setInterval(loopGame, 30);
}

//Verificação - Pressionando as teclas (Consulte as keys) cima e baixo
function keyUp1(e) {
    if (e.keyCode == 38) {
        teclaCimaPressionada1 = false;
    } else if (e.keyCode == 40) {
        teclaBaixoPressionada1 = false;
    }
}

function keyDown1(e) {
    if (e.keyCode == 38) {
        teclaCimaPressionada1 = true;
    } else if (e.keyCode == 40) {
        teclaBaixoPressionada1 = true;
    }
}
//Verificação - Pressionando as teclas (Consulte as keys) W e S

function keyUp2(e) {
    if (e.keyCode == 83) {
        teclaCimaPressionada2 = false;
    } else if (e.keyCode == 87) {
        teclaBaixoPressionada2 = false;
    }
}

function keyDown2(e) {
    if (e.keyCode == 83) {
        teclaCimaPressionada2 = true;
    } else if (e.keyCode == 87) {
        teclaBaixoPressionada2 = true;
    }
}

function loopGame() {

    /****************************** DESENHO DA TELA *****************************/  
   context.clearRect(0, 0, canvas.width, canvas.height); // limpar a tela antes de desenhar


   /****************************** JOGADOR & OPONENTE *****************************/  
   context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeigth); // desenha jogador
   context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeigth); // desenha ioponente


   /****************************** BOLA *****************************/  
   context.beginPath(); // modo desenho 
   context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o circulo com coordenadas no centro
   context.closePath(); // finaliza o caminho / não é obrigatório
   //context.fillStyle = "#ffffff";
   context.fill();


    /****************************** JOGADOR1 *****************************/  
    if (teclaCimaPressionada1 != teclaBaixoPressionada1) { // se o usuário precionar para cima
        if (teclaCimaPressionada1) { // se for para cima pressionado
            if (jogadorPosY > 0) { // se a bola não sair da tela
                jogadorPosY -= velocidadeJogador; // muda posição do jogador
            }
        }
        else { // se for para baixo 
            if (jogadorPosY < (canvas.height - barraHeigth)) { // se a bola não saiu da tela
                jogadorPosY += velocidadeJogador; // muda posição
            }
        }
    }

    /****************************** JOGADOR2 *****************************/  
        if (teclaCimaPressionada2 != teclaBaixoPressionada2) { // se o usuário precionar para cima
            if (teclaCimaPressionada2) { // se for para cima pressionado
                if (oponentePosY > 0) { // se a bola não sair da tela
                    oponentePosY -= velocidadeOponente; // muda posição do jogador
                }
            }
            else { // se for para baixo 
                if (oponentePosY < (canvas.height - barraHeigth)) { // se a bola não saiu da tela
                    oponentePosY += velocidadeOponente; // muda posição
                }
            }
        }




    /****************************** BOLA *****************************/  
    if (bolaTempo <= 0) // caso a bola estiver em jogo, o tempo  e zerado apos marcar ponto, abola ficará invisivel por um tempo
    {
        if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) { // caso o jogador encoste na bola no eixo X
            if ((bolaPosY + bolaRaio > jogadorPosY) && (bolaPosY - bolaRaio < jogadorPosY + barraHeigth)) { // caso o jogador encoste na bola no eixo Y
                bolaParaDireita = true;
                if (teclaBaixoPressionada1) { // se o usuário estiver indo para baixo e tocar na bola
                    bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                }
                else {
                    bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                }
            if (teclaBaixoPressionada2) { // se o usuário estiver indo para baixo e tocar na bola
                    bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                }
                else {
                    bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                }
            }
        }
        else {
            if ((bolaPosX + bolaRaio) >= oponentePosX) { // se o oponente encostar na bola no eixo X
                if ((bolaPosY + bolaRaio) > oponentePosY && (bolaPosY - bolaRaio < oponentePosY + barraHeigth)) { // se o oponente encostar na bola no eixo Y

                    bolaParaDireita = false;
                    if (oponenteParaCima) { // caso oponetne estiver indo para cima ao tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                    }
                    else { // caso o oponente estiver indo para baixo quando tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                    }
                }
            }
        }

        if ((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)) { // se a bola estiver indo para cima ou para baixo na tela
            bolaAngulo = bolaAngulo * -1; // multiplicamos por - 1 para inverter a direção da bola no eixo y
        }
        bolaPosY += bolaAngulo; // move bola para cima ou para baixo de acordo com o calculo acima

        if (bolaParaDireita) {
            bolaPosX += velocidadeBola; // move a bola para direita
        }
        else {
            bolaPosX -= velocidadeBola; // move a bola para esquerda
        }
    }

    if ((bolaPosX <= -bolaRaio) || (bolaPosX > canvas.width)) { // se a bola saiu da tela
        if (bolaTempo >= 50) { // se o tempo de deixar a bola invisível passou 
            if (bolaPosX <= - bolaRaio) { // se bola saiu na esquerda 
                pontosOponente++;
            }
            else { // se bola saiu na direita 
                pontosJogador++;
            }

            bolaPosX = canvas.width / 2; // coloca bola no centro da tela
            bolaPosY = canvas.height / 2; // coloca bola no centro da tela

            bolaParaDireita = false;
            bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
            bolaTempo = 0; // zera o tempo de deixar a bola invisível e coloca novamente em jogo
        }
        else { // caso o tempo de deixar a bola invisível não acabou 
            bolaTempo++;
        }
    }


    /****************************** PLACAR *****************************/  
    var pontosA = pontosJogador; // variéveis temporarias para alterar pontuação
    var pontosB = pontosOponente;

    if (pontosA < 10) { // coloca zero a esquerda se for menor que 10 a pontuação 
        pontosA = "0" + pontosA;
    }

    if (pontosB < 10) { // voloca zero a esquerda se for menor que 10 a pontuação 
        pontosB = "0" + pontosB;
    }
    if(pontosA==10){
        alert("JOGADOR A VENCEU! ")
        pontosJogador=0;
        pontosOponente=0;
        
    }
    if(pontosB==10){
        alert("JOGADOR B VENCEU! ")
        pontosJogador=0;
        pontosOponente=0;
    
    }

    context.font = "38pt Arial"; // tamanho e fonte
    context.fillStyle = "#000000"; //Seleciona a cor
    context.fillText(pontosA + "  " + pontosB, (canvas.width / 2) - 70 , 70); // escrevendo texto no centro da tela no top


    /****************************** LINHA DIVISÓRIA *****************************/ 
    context.beginPath();
    context.moveTo(canvas.width / 2, 0); // arrumar lápis para fazere a escrita da linha
    context.lineTo(canvas.width / 2, canvas.height);// faz risco na tela no centro
    context.strokeStyle = "#CD0046";
    context.stroke();
    context.closePath();
}


/****************************** FUNÇÃO DO JQUERY *****************************/ 
$(function () {
    iniciarJogo();
});
