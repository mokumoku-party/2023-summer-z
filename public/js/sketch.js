let fireworks = [];
let gravity;
let bgColor;

let graphicBuffers = [];
let raisingTrail = 15;
let kikuTrail = 30;
let botanTrail = 3;
const standardFrame = 60;

function FireworkMakeMode() {
  if (fireworks.length === 0) {
    const launchPos = createVector(random(width * 0.4, width * 0.6), height);
    const firework = new Firework(
      firework_colors,
      firework_types,
      graphicBuffers,
      launchPos
    );

    fireworks.push(firework);
  }
}

function FireworkContestMode() {
  if (random() < 0.3) {
    let firework;
    const _type = () => random(['菊', '牡丹']);
    const _color = () => color(random(255), 255, 255);

    firework = new Firework(
      [_color(), _color(), _color()],
      [_type(), _type(), _type()],
      graphicBuffers,
      createVector(random(0.1, 0.9) * width, height)
    );

    fireworks.push(firework);
  }
}

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

  frameRate(standardFrame);
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
    if (mode === 'make') {
      FireworkMakeMode();
    } else if (mode === 'contest') {
      FireworkContestMode();
    }

    //　花火の更新
    graphicBuffers[0].background(0, Math.ceil(255 / raisingTrail));
    graphicBuffers[1].background(0, Math.ceil(255 / botanTrail));
    graphicBuffers[2].background(0, Math.ceil(255 / kikuTrail));

    const delta = deltaTime;
    const currentFrame = frameRate();
    for (var i = fireworks.length - 1; i >= 0; i--) {
      // フレームレートを考慮して更新をかける
      fireworks[i].update(delta * currentFrame * 0.001);
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
let firework_types;
let firework_colors;
let mode;

function start(_mode) {
  loop();
  deltaTime = 0;
  isReady = true;
  mode = _mode;
}

function startMakeMode(types, colors) {
  start('make');

  firework_types = types;
  // TODO: 本来は引数をそのまま入れる
  firework_colors = colors;
}

function startContestMode() {
  start('contest');
}
