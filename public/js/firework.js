function Firework(){
  this.hu = random(255); // 花火の色相
  this.firework = new Particle(random(width), height, this.hu, true);
  this.exploded = false;
  this.particles = [];

// 花火が打ち上がったのかをチェックする関数
  this.done = function(){
    if (this.exploded && this.particles.length === 0){
      return true;
    }else{
      return false;
    }
  }

// 花火が打ち上がったらどのように落ちて行くのかを設定
  this.update = function(){
    if (!this.exploded){
      this.firework.applyForce(gravity);// gravity分だけ下に下げる関数(particle.jsで定義)
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    for (var i = this.particles.length-1; i >= 0; i--){
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if(this.particles[i].done()){
        this.particles.splice(i, 1);
      }
    }
  }

// 花火がどのように爆発して開くのかをチェックする関数
  this.explode = function(){
    for (var i = 0; i < 100; i++){
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
      this.particles.push(p);
    }
  }

// 花火を見せるための関数
  this.show = function(){
    if (!this.exploded){
      this.firework.show();
    }
    for (var i = 0; i < this.particles.length; i++){
      this.particles[i].show();
    }
  }
}
