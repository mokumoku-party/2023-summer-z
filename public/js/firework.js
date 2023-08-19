function Firework() {
  this.hu = random(255); // 花火の色相
  this.rasingParticle = new RasingParticle(random(width), height, this.hu);
  this.exploded = false;
  this.particles = [];

  // 花火が打ち上がったのかをチェックする関数
  this.done = function () {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // 花火が打ち上がったらどのように落ちて行くのかを設定
  this.update = function () {
    if (!this.exploded) {
      this.rasingParticle.applyForce(gravity); // gravity分だけ下に下げる関数(particle.jsで定義)
      this.rasingParticle.update();
      if (this.rasingParticle.velocity.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(createVector(0, 0.1));
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  };

  // 花火がどのように爆発して開くのかをチェックする関数
  this.explode = function () {
    for (var i = 0; i < 300; i++) {
      var p = new ExplodeParticle(
        this.rasingParticle.position.x,
        this.rasingParticle.position.y,
        this.hu,
        3
      );
      this.particles.push(p);
    }
    for (var i = 0; i < 300; i++) {
      var p = new ExplodeParticle(
        this.rasingParticle.position.x,
        this.rasingParticle.position.y,
        this.hu,
        1
      );
      this.particles.push(p);
    }
  };

  // 花火を見せるための関数
  this.show = function () {
    if (!this.exploded) {
      this.rasingParticle.draw();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].draw();
    }
  };
}
