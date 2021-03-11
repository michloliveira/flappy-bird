console.log("Michel Tavares de Oliveira");
const sprites = new Image(); //inicializa uma sprite
sprites.src = "./img/sprites.png"; //carrega a imagem base

const canvas = document.querySelector('canvas'); //retorna o primeiro elemento do seletor buscado
const ctx = canvas.getContext('2d');

var inicio = true; //tela de inicio
var jump = false; //pular
var isDead = false;

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
    dx: 50, //destino X - destination X
    dy: 33, //destino Y - destination Y
    dWidth: 33, //destino largura - destination width
    dHeight: 24, //destino Altura = Destination height
    gravity: 0.25,
    velocity: 0,
    pulo: 4.5,
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
                    jump = false;          
                }
                else{
                    bird.velocity = bird.velocity + bird.gravity;
                    bird.dy = bird.dy + bird.velocity;
                    jump = false;
                }
            }
            else{ // morreu
                
                gameOver();
                isDead = false;
            }
        }
        else{ //Tela de Início
            if(jump == true){
                inicio = false;
            }
            bird.dy = 33;
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
    move: 1, //velocidade de movimentação do chão
    
    draw(){
            ctx.drawImage(sprites, ground.sx, ground.sy, ground.sWidth, ground.sHeight, ground.dx, ground.dy, ground.dWidth, ground.dHeight);
            ctx.drawImage(sprites, ground.sx, ground.sy, ground.sWidth, ground.sHeight, ground.dx + ground.dHeight, ground.dy, ground.dWidth, ground.dHeight);
            
        if(ground.move == 1){ // movimenta o chão
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
    dx0: canvas.width + 183, //destino X - destination X cano 1
    dx1: canvas.width + 366, //destino X - destination X cano 2 //olhar amanha
    dy: -90, //destino Y - destination Y
    dWidth: 52, //destino largura - destination width
    dHeight: 400, //destino Altura = Destination height,
    alt : [ 0,0], //cano 1 , cano 2;
    move: 1,
    draw(){
        if( inicio == true){ //gerador de alturas aleatórias
            pipe.alt[0] = Math.floor(Math.random() * (-140 - -370 + 1)) + -370;
            pipe.alt[1] = Math.floor(Math.random() * (-140 - -370 + 1)) + -370;
            //Math.floor(Math.random() * (max - min + 1) + min);
        }

        if(inicio == false){
            if(pipe.dx0 == -52){ // se o cano sair da tela 
                pipe.dx0 = pipe.dx1 + 183;
                pipe.alt[0] = Math.floor(Math.random() * (-140 - -370 + 1)) + -370;
            }
            if(pipe.dx1 == -52){ // se o cano sair da tela
                pipe.dx1 = pipe.dx0 + 183;
                pipe.alt[1] = Math.floor(Math.random() * (-140 - -370 + 1)) + -370;
            }
            ctx.drawImage(sprites, pipe.sx, pipe.sy, pipe.sWidth, pipe.sHeight, pipe.dx0, pipe.alt[0], pipe.dWidth, pipe.dHeight);
            ctx.drawImage(sprites, pipe.sx -52, pipe.sy, pipe.sWidth, pipe.sHeight, pipe.dx0, pipe.alt[0] + 480, pipe.dWidth, pipe.dHeight);
            
            ctx.drawImage(sprites, pipe.sx, pipe.sy, pipe.sWidth, pipe.sHeight, pipe.dx1,pipe.alt[1], pipe.dWidth, pipe.dHeight);
            ctx.drawImage(sprites, pipe.sx -52, pipe.sy, pipe.sWidth, pipe.sHeight, pipe.dx1, pipe.alt[1] + 480, pipe.dWidth, pipe.dHeight);
            if(collision()){
                isDead = true;
            }
            pipe.dx0 = pipe.dx0 - pipe.move;
            pipe.dx1 = pipe.dx1 - pipe.move;
        }
        else{
            pipe.dx0 = canvas.width + 183;
            pipe.dx1 = canvas.width + 366;
        }
    }
}
function collision(){
    if(bird.dx + 33 >= pipe.dx0  && bird.dx + 33 <= pipe.dx0 + 52 || bird.dx >= pipe.dx0  && bird.dx <= pipe.dx0 + 52){
        if(bird.dy >= pipe.alt[0] + 400 && bird.dy + bird.dHeight <= pipe.alt[0] + 480){
            return false;
        }
        else{
            return true;
        }
    }
    if(bird.dx + 33 >= pipe.dx1  && bird.dx + 33 <= pipe.dx1 + 52 || bird.dx >= pipe.dx1  && bird.dx <= pipe.dx1 + 52 ){
        if(bird.dy >= pipe.alt[1] + 400 && bird.dy <= pipe.alt[1] + 480){
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
    pipe.move = 0;
    ground.move = 0;
    ctx.drawImage(sprites,134,153,226,200,(canvas.width /2) - 226 /2, 50,226,200);
    if(jump == true){
        inicio = true; 
        pipe.move =1;
        ground.move = 1
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
    requestAnimationFrame(loop);
}

loop();
