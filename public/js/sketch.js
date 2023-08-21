let fireworks = [];
let gravity;
let bgColor;

function setup() {
  const result = document.getElementById('canvas');
  const canvas = createCanvas(windowWidth, (windowHeight * 4) / 5); // canvasを作成
  canvas.parent(result);

  bgColor = color(34, 34, 51);

  background(bgColor); // 背景を黒く指定
  colorMode(HSB); //花火を出す色の指定の仕方
  gravity = createVector(0, 0.7);
  stroke(255); // 線の色を設定
  strokeWeight(4); // 線の太さ

  frameRate(120);
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, (windowHeight * 4) / 5);
}

function draw() {
  colorMode(RGB); // 花火を出す色の指定の仕方
  background(bgColor); // 背景に少し透明なのを重ねてだんだん消えて行くように
  colorMode(HSB);

  if (isReady) {
    if (fireworks.length === 0) {
      for (let i = 0; i < 1; i++) {
        let firework;
        if (firework_type === '菊') {
          firework = new KikuFirework(firework_color);
        }
        if (firework_type === '牡丹') {
          firework = new BotanFirework(firework_color);
        }

        fireworks.push(firework);
      }
    }

    //　花火の見せ方
    blendMode(SCREEN);
    for (var i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
      if (fireworks[i].done) {
        fireworks[i].clear();
        fireworks.splice(i, 1);
      }
    }
    blendMode(BLEND);
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
