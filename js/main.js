console.log("klasdnasdl");

const sprites = new Image(); //inicializa uma sprite
sprites.src = "./img/sprites.png"; //carrega a imagem base

const canvas = document.querySelector('canvas'); //retorna o primeiro elemento do seletor buscado
const ctx = canvas.getContext('2d');

console.log("adjfkjasfj")
function loop(){
    ctx.drawImage(sprites, 0, 0, 33, 24, 10, 50, 33, 24);
    //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    
    requestAnimationFrame(loop);
}

loop();
