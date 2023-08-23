let fireworks = [];
let gravity;
let bgColor;

let graphicBuffers = [];
let raisingTrail = 15;
let kikuTrail = 15;
let botanTrail = 5;

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

  graphicBuffers = [
    createGraphics(width, height),
    createGraphics(width, height),
    createGraphics(width, height),
  ];

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
        // TODO: 本来は三種類設定される
        if (firework_type === '菊') {
          firework = new Firework(
            firework_colors,
            ['牡丹', '菊', '菊'],
            graphicBuffers
          );
        }
        if (firework_type === '牡丹') {
          firework = new Firework(
            firework_colors,
            ['菊', '牡丹', '牡丹'],
            graphicBuffers
          );
        }

        fireworks.push(firework);
      }
    }

    //　花火の更新
    graphicBuffers[0].background(0, 255 / raisingTrail);
    graphicBuffers[1].background(0, 255 / botanTrail);
    graphicBuffers[2].background(0, 255 / kikuTrail);

    const delta = deltaTime;
    for (var i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update(delta);
      fireworks[i].show();
      if (fireworks[i].done) {
        fireworks[i].dispose();
        fireworks.splice(i, 1);
      }
    }

    // canvasに反映
    blendMode(SCREEN);
    for (let i = 0; i < graphicBuffers.length; i++) {
      graphicBuffers[i].background(0, 1);

      image(graphicBuffers[i], 0, 0);
    }
    blendMode(BLEND);
  }
}

let isReady = false;
let firework_type;
let firework_colors;

function start(type, colors) {
  loop();
  deltaTime = 0;
  isReady = true;
  firework_type = type;

  // TODO: 本来は引数をそのまま入れる
  firework_colors = [colors, color(35, 255, 255), color(200, 255, 255)];
}
