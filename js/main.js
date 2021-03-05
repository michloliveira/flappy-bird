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
}


console.log("adjfkjasfj")
function loop(){
    ctx.drawImage(sprites, bird.sx, bird.sy, bird.sWidth, bird.sHeight, bird.dx, bird.dy, bird.dWidth, bird.dHeight);
    /*ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    disponível em : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    */
    requestAnimationFrame(loop);
}

loop();
