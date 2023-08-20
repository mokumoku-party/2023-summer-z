var fireworks = [];
var gravity;

function setup() {
  const result = document.getElementById("canvas");
  const canvas = createCanvas(windowWidth, windowHeight * 4 / 5); // canvasを作成
  canvas.parent(result);

  colorMode(HSB); //花火を出す色の指定の仕方
  gravity = createVector(0, 0.7);
  stroke(255); // 線の色を設定
  strokeWeight(4); // 線の太さ
  background(0); // 背景を黒く指定

  frameRate(120);
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 4 / 5);
}

function draw() {
  colorMode(RGB); // 花火を出す色の指定の仕方
  background(0, 0, 0); // 背景に少し透明なのを重ねてだんだん消えて行くように
  colorMode(HSB);

  if (isReady) {
    if (fireworks.length === 0) {
      let firework;
      if (firework_type === 0) {
        firework = new KikuFirework(firework_color);
      }
      if (firework_type === 1) {
        new BotanFirework(firework_color);
      }

      fireworks.push(firework);
    }
    //　花火の見せ方
    for (var i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
      if (fireworks[i].done) {
        fireworks.splice(i, 1);
      }
    }
  }
}

let isReady = false;
let firework_type;
let firework_color;

function start(type, color) {
  loop();
  deltaTime = 0;
  isReady = true;
  firework_type = type;
  firework_color = color;
}
