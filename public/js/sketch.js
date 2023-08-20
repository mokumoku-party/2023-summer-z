var fireworks = [];
var gravity;

function setup() {
  const result = document.getElementById("canvas");
  const canvas = createCanvas(windowWidth, windowHeight * 4 /5); // canvasを作成
  canvas.parent(result);

  colorMode(HSB); //花火を出す色の指定の仕方
  gravity = createVector(0, 0.7);
  stroke(255); // 線の色を設定
  strokeWeight(4); // 線の太さ
  background(0); // 背景を黒く指定

  frameRate(120);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 4 /5);
}

function draw() {
  colorMode(RGB); // 花火を出す色の指定の仕方
  background(0, 0, 0, 25); // 背景に少し透明なのを重ねてだんだん消えて行くように
  colorMode(HSB);

  if (fireworks.length === 0) {
    fireworks.push(new KikuFirework(color(random(255), 255, 255)));
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
