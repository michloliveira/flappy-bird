const sprites = new Image(); //inicializa uma sprite
sprites.src = "./img/sprites.png"; //carrega a imagem base

const canvas = document.querySelector('canvas'); //retorna o primeiro elemento do seletor buscado
const ctx = canvas.getContext('2d');

const hit = new Audio();
const flappy = new Audio();
const falls = new Audio();
const scoreUp = new Audio();
hit.src = "./audio/hit.wav"
flappy.src = "./audio/flappy.wav"
falls.src = "./audio/falls.wav"
scoreUp.src = "./audio/score.wav"

var inicio = true; //tela de inicio
var jump = false; //pular
var isDead = false; //retira o pulo

const bird = {
    sXY: [  // bird frames
        { sx: 0,sy: 0}, //asa para cima
        { sx: 0,sy: 26}, //asa para o meio
        { sx: 0,sy: 52},  //asa para baixo
        { sx: 0,sy: 26}, //asa para o meio        
    ],
    frame: 0, // frame do bird
    fps: 0, //controle do frame
    sWidth: 33, //origem largura - source width
    sHeight: 24, //origem altura - source height
    dx: 80, //destino X - destination X
    dy: 180, //destino Y - destination Y
    dWidth: 33, //destino largura - destination width
    dHeight: 24, //destino Altura = Destination height
    gravity: 0.27,
    velocity: 0,
    pulo: 4.6,
    draw(){
        ctx.drawImage(sprites, bird.sXY[bird.frame].sx, bird.sXY[bird.frame].sy, bird.sWidth, bird.sHeight, bird.dx, bird.dy, bird.dWidth, bird.dHeight); //desenha na tela
        if(bird.fps == 10 && ground.move){ //atualiza asa do bird a cada 10 fps e se o chão estiver se movendo
            bird.frame++;
            if(bird.frame > 3){
                bird.frame = 0;
            }
        }
        if(bird.fps > 10){ // zera o contador de fps a cada 10 fps
            bird.fps = 0;
        }
        bird.fps++; // incrementa o contador de fps

        //physic---------------------------------------------------------------------------
        if(inicio == false){//Jogando...
            if(bird.dy + bird.dHeight <= ground.dy){ //pulo
                if(jump == true && isDead == false && bird.dy > 0){
                    bird.velocity = - bird.pulo;
                    bird.dy = bird.dy + bird.velocity;
                    flappy.play();
                    jump = false; 
                    flappy.currentTime = 0;     
                }
                else{
                    bird.velocity = bird.velocity + bird.gravity;
                    bird.dy = bird.dy + bird.velocity;
                    jump = false;
                }
            }
            else{ // morreu
                if(isDead == false && score.show == true){ // somente se o score está exibido
                    hit.play();
                }
                gameOver();
                isDead = false;
            }
        }
        else{ //Tela de Início
            if(jump == true){
                inicio = false;
            }
            bird.dy = 180;
            bird.velocity = 0;
            ctx.drawImage(sprites, 134, 0, 174, 152, canvas.width/2 - 87, 110, 174, 152);
        }
    }
}
const ground = {
    sx: 0, //origem X - source x
    sy: 610, //origem Y - source y
    sWidth: 224, //origem largura - source width
    sHeight: 112, //origem altura - source height
    dx: 0, //destino X - destination X
    dy: canvas.height -112, //destino Y - destination Y
    dWidth: 224, //destino largura - destination width
    dHeight: 112, //destino Altura = Destination height
    move: 2, //velocidade de movimentação do chão
    
    draw(){
            ctx.drawImage(sprites, ground.sx, ground.sy, ground.sWidth, ground.sHeight, ground.dx, ground.dy, ground.dWidth, ground.dHeight);
            ctx.drawImage(sprites, ground.sx, ground.sy, ground.sWidth, ground.sHeight, ground.dx + ground.dHeight, ground.dy, ground.dWidth, ground.dHeight);
            
        if(ground.move == 2){ // movimenta o chão
            ground.dx = ground.dx - ground.move;
        }

        if(ground.dx < -13){ // limite em que o cenário começa a repetir 
            ground.dx = 0;
        }
    }
}
const background = {
    sx: 390, //origem X - source x
    sy: 0 ,//origem Y - source y
    sWidth: 275, //origem largura - source width
    sHeight: 204, //origem altura - source height
    dx: 0, //destino X - destination X
    dy: canvas.height -204, //destino Y - destination Y
    dWidth: 275, //destino largura - destination width
    dHeight: 204, //destino Altura = Destination height
    draw(){ // function draw
        ctx.fillStyle = "#70C5CE" //cor de fundo
        ctx.fillRect(0, 0, canvas.width, canvas.height); // x, y , largura , altura
        ctx.drawImage(sprites, background.sx, background.sy, background.sWidth, background.sHeight, background.dx, background.dy, background.dWidth, background.dHeight);
        ctx.drawImage(sprites, background.sx, background.sy, background.sWidth, background.sHeight, background.dx + ground.dHeight, background.dy, background.dWidth, background.dHeight);
    }
}
const pipe = { // cano
    sx: 52, //origem X - source x
    sy: 169 ,//origem Y - source y
    sWidth: 52, //origem largura - source width 104
    sHeight: 400, //origem altura - source height 400
    dx0: canvas.width + 134, //destino X - destination X cano 1
    dx1: canvas.width + 320, //destino X - destination X cano 2 //olhar amanha
    dy: -90, //destino Y - destination Y
    dWidth: 52, //destino largura - destination width
    dHeight: 400, //destino Altura = Destination height,
    alt : [0,0], //cano 1 , cano 2;
    move: 2,
    draw(){
        if( inicio == true){ //gerador de alturas aleatórias
            pipe.alt[0] = Math.floor(Math.random() * (-147 - -370 + 1)) + -370;
            pipe.alt[1] = Math.floor(Math.random() * (-147 - -370 + 1)) + -370;
            //Math.floor(Math.random() * (max - min + 1) + min);
        }

        if(inicio == false){
            //console.log(pipe.dx0);
            if(pipe.dx0 <= -52){ // se o cano sair da tela 
                console.log(pipe.dx0);
                pipe.dx0 = pipe.dx1 + 186; //era 83
                pipe.alt[0] = Math.floor(Math.random() * (-147 - -370 + 1)) + -370;
            }
            if(pipe.dx1 <= -52){ // se o cano sair da tela
                pipe.dx1 = pipe.dx0 + 186; //era 83
                pipe.alt[1] = Math.floor(Math.random() * (-147 - -370 + 1)) + -370;
            }
            ctx.drawImage(sprites, pipe.sx, pipe.sy, pipe.sWidth, pipe.sHeight, pipe.dx0, pipe.alt[0], pipe.dWidth, pipe.dHeight);
            ctx.drawImage(sprites, pipe.sx -52, pipe.sy, pipe.sWidth, pipe.sHeight, pipe.dx0, pipe.alt[0] + 485, pipe.dWidth, pipe.dHeight);
            
            ctx.drawImage(sprites, pipe.sx, pipe.sy, pipe.sWidth, pipe.sHeight, pipe.dx1,pipe.alt[1], pipe.dWidth, pipe.dHeight);
            ctx.drawImage(sprites, pipe.sx -52, pipe.sy, pipe.sWidth, pipe.sHeight, pipe.dx1, pipe.alt[1] + 485, pipe.dWidth, pipe.dHeight);
            if(collision()){
                if(isDead == false && ground.move != 0){ //som
                    hit.play();
                    setTimeout(()=>{
                        falls.play();
                    },500);
                }
                pipe.move = 0;
                ground.move = 0;
                isDead = true;
            }
            pipe.dx0 = pipe.dx0 - pipe.move;
            pipe.dx1 = pipe.dx1 - pipe.move;
        }
        else{
            pipe.dx0 = canvas.width + 134;
            pipe.dx1 = canvas.width + 320;
        }
    }
}
const score = {
    now: 0,
    best: 0,
    show: true,
    draw(){
        if(inicio == true){
            score.show = true;
            score.now = 0;
        }
        if(score.show == true){
            if(bird.dx == pipe.dx0 || bird.dx == pipe.dx1){  // score ++
                if(collision() != true){
                    score.now++;
                    scoreUp.play();
                }
                if(score.best < score.now){
                    score.best = score.now;
                }
            }    
            ctx.font = "50px 'Bebas Neue'";
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = "#000000";
            ctx.shadowOffsetX = "2"
            ctx.shadowOffsetY = "2"
            ctx.textAlign = "center"
            ctx.fillText(score.now,160,75); //desaplicando os efeitos
            ctx.shadowOffsetX = "0"
            ctx.shadowOffsetY = "0"
            ctx.textAlign = "center"
        }
    }
}
function collision(){
    if(bird.dx + 33 >= pipe.dx0  && bird.dx + 33 <= pipe.dx0 + 52 || bird.dx >= pipe.dx0  && bird.dx <= pipe.dx0 + 52){
        if(bird.dy >= pipe.alt[0] + 400 && bird.dy + bird.dHeight <= pipe.alt[0] + 485){
            return false;
        }
        else{
            return true;
        }
    }
    if(bird.dx + 33 >= pipe.dx1  && bird.dx + 33 <= pipe.dx1 + 52 || bird.dx >= pipe.dx1  && bird.dx <= pipe.dx1 + 52 ){
        if(bird.dy >= pipe.alt[1] + 400 && bird.dy <= pipe.alt[1] + 485){
            return false;
        }
        else{
            return true;
        }
    }
    else{
        return false;
    }
}

function gameOver(){
    score.show = false;
    pipe.move = 0;
    ground.move = 0;
    ctx.drawImage(sprites,134,153,226,200,(canvas.width /2) - 226 /2, 50,226,200);
    if(score.now >= 10 && score.now < 20){//bronze
        ctx.drawImage(sprites,47,123,45,45,72,135,45,45);
    }
    else if(score.now >= 20 && score.now < 30){//prata
        ctx.drawImage(sprites,47,78,45,45,72,135,45,45);
    }
    else if(score.now >= 30 && score.now < 40){ //ouro
        ctx.drawImage(sprites,0,123,45,45,72,135,45,45);
    }
    else if(score.now >= 40){ //platina
        ctx.drawImage(sprites,0,78,45,45,72,135,45,45);
    }
    
    //------score
    ctx.font = "30px 'Bebas Neue'";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000000";
    ctx.shadowOffsetX = "2"
    ctx.shadowOffsetY = "2"
    ctx.textAlign = "right"
    //ctx.shadowBlur = "10"
    //ctx.fillText
    ctx.fillText(score.now,246,148);
    ctx.fillText(score.best,246,190);
    ctx.shadowOffsetX = "0"
    ctx.shadowOffsetY = "0"

    if(jump == true){
        inicio = true; 
        pipe.move =2;
        ground.move = 2
        jump = false;
    }
}

window.addEventListener("click", function(){
        jump = true;
});
// event = keyup or keydown
document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
    //console.log('Space pressed')
    jump = true;
}
});
function loop(){
    background.draw();
    pipe.draw();
    ground.draw();
    bird.draw();
    score.draw();
    requestAnimationFrame(loop);
}

loop();