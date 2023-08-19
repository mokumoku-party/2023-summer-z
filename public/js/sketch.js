var fireworks = [];
var gravity;

function setup(){
  createCanvas(1700, 1100); // canvasを作成
  colorMode(HSB); //花火を出す色の指定の仕方
  gravity = createVector(0,0.4);
  stroke(255);// 線の色を設定
  strokeWeight(4);// 線の太さ
  background(0);// 背景を黒く指定
}

function draw(){
  colorMode(RGB); // 花火を出す色の指定の仕方
  background(0, 0, 0,25);// 背景に少し透明なのを重ねてだんだん消えて行くように
  fireworks.push(new Firework());

  fireworks[0].update();
  fireworks[0].show();

  // if (random(1) < 0.15){
  //   fireworks.push(new Firework());// fireworksという配列にfirewokという関数の中身を追加する。
  // }
  // //　花火の見せ方
  // for (var i = fireworks.length-1; i >= 0; i--){
  //   fireworks[i].update();
  //   fireworks[i].show();
  //   if(fireworks[i].done()){
  //     fireworks.splice(i, 1);
  //   }
  // }
}
