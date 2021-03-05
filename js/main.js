console.log("klasdnasdl");

const sprites = new Image(); //inicializa uma sprite
sprites.src = "./img/sprites.png"; //carrega a imagem base

const canvas = document.querySelector('canvas'); //retorna o primeiro elemento do seletor buscado
const ctx = canvas.getContext('2d');

const bird = {
    sx: 0, //origem X - source x
    sy: 0, //origem Y - source y
    sWidth: 33, //origem largura - source width
    sHeight: 24, //origem altura - source height
    dx: 50, //destino X - destination X
    dy: 33, //destino Y - destination Y
    dWidth: 33, //destino largura - destination width
    dHeight: 24, //destino Altura = Destination height
    draw(){
        ctx.drawImage(sprites, bird.sx, bird.sy, bird.sWidth, bird.sHeight, bird.dx, bird.dy, bird.dWidth, bird.dHeight);
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
    draw(){
        ctx.drawImage(sprites, ground.sx, ground.sy, ground.sWidth, ground.sHeight, ground.dx, ground.dy, ground.dWidth, ground.dHeight);
        ctx.drawImage(sprites, ground.sx, ground.sy, ground.sWidth, ground.sHeight, ground.dx + ground.dHeight, ground.dy, ground.dWidth, ground.dHeight);
    }
}

function loop(){
    bird.draw();
    ground.draw();
    requestAnimationFrame(loop);
}

loop();
