function Particle(x, y, hu, firework){
  this.pos = createVector(x,y);
  this.firework = firework; // 基本的にtrue
  this.lifespan = 255;
  this.hu = hu; //friework.jsで定義した色相をここでも代入

  //ランダムにベクトルを定義
  if (this.firework){
    this.vel = createVector(0,random(-29, -15));
  }else{
    this.vel = p5.Vector.random2D(); // ランダムにベクトルを定義
    this.vel.mult(random(5, 35));
  }
  this.acc = createVector(0,0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function(){
    if (!this.firework){
      this.vel.mult(0.85);
      this.lifespan -= 6;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function(){
    if(this.lifespan < 0){
      return true;
    }else {
      return false;
    }
  }

  this.show = function(){
    colorMode(HSB);
    if(!this.firework){
      strokeWeight(3);
      stroke(hu, 255, 255, this.lifespan);// hsbの定義で線を描画
    }else{
      strokeWeight(6);
      stroke(hu, 255,255)// hsbの定義で線を描画
    }
    point(this.pos.x, this.pos.y);//点を描画
  }

}

