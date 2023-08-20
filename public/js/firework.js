class Firework {
  color;
  rasingParticle;
  exploded = false;
  particles = [];

  constructor(color) {
    this.color = color;
    this.rasingParticle = new RasingParticle(
      createVector(random(width * .4, width * .6), height),
      this.color,
    );
  }

  explode() {}

  // 花火が打ち上がったのかをチェックする関数
  get done() {
    return (this.exploded && this.particles.length === 0);
  }

  // 花火が打ち上がったらどのように落ちて行くのかを設定
  update(delta) {
    if (!this.exploded) {
      this.rasingParticle.update(delta);
      if (this.rasingParticle.velocity.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
  }

  show() {
    if (!this.exploded) {
      this.rasingParticle.draw();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].draw();
    }
  }
}

class KikuFirework extends Firework {
  constructor(color) {
    super(color);
  }

  update() {
    const delta = deltaTime;
    super.update(delta);

    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(delta);
      if (this.particles[i].done) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    super.explode();

    const rPos = this.rasingParticle.position;
    for (var i = 0; i < 300; i++) {
      var p = new ExplodeParticle(
        createVector(rPos.x, rPos.y),
        this.color,
        3,
      );
      this.particles.push(p);
    }
    for (var i = 0; i < 300; i++) {
      var p = new ExplodeParticle(
        createVector(rPos.x, rPos.y),
        this.color,
        1,
      );
      this.particles.push(p);
    }
  }
}

class BotanFirework extends Firework {
  constructor(color) {
    super(color);
  }

  update() {
    const delta = deltaTime;
    super.update(delta);

    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(delta);
      if (this.particles[i].done) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    super.explode();

    const rPos = this.rasingParticle.position;

    for (var i = 0; i < 300; i++) {
      var p = new ExplodeParticle(
        createVector(rPos.x, rPos.y),
        this.color,
        random(5, 8),
        .99,
        200,
        p5.Vector.random2D().mult(6),
        5,
      );
      this.particles.push(p);
    }
  }
}
