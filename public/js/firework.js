class Firework {
  color;
  rasingParticle;
  exploded = false;
  particles = [];
  graphicBuffer = createGraphics(width, height);
  trailSize;

  constructor(color) {
    this.color = color;
    this.rasingParticle = new RasingParticle(
      this.graphicBuffer,
      createVector(random(width * 0.4, width * 0.6), height),
      this.color
    );
  }

  explode() {}

  clear() {
    this.graphicBuffer.remove();
  }

  // 花火が打ち上がったのかをチェックする関数
  get done() {
    return this.exploded && this.particles.length === 0;
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
    colorMode(RGB);
    this.graphicBuffer.background(0, this.trailSize);
    colorMode(HSB);

    if (!this.exploded) {
      this.rasingParticle.draw();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].draw();
    }

    image(this.graphicBuffer, 0, 0);
  }
}

class KikuFirework extends Firework {
  constructor(color) {
    super(color);

    this.trailSize = 10;
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
        this.graphicBuffer,
        createVector(rPos.x, rPos.y),
        this.color,
        random() < 0.5 ? 3 : 1
      );
      this.particles.push(p);
    }
  }
}

class BotanFirework extends Firework {
  constructor(color) {
    super(color);
    this.trailSize = 50;
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

    for (var i = 0; i < 200; i++) {
      var p = new ExplodeParticle(
        this.graphicBuffer,
        createVector(rPos.x, rPos.y),
        this.color,
        random(5, 8),
        0.97,
        300,
        p5.Vector.random3D().mult(6),
        5,
        createVector(0, 0)
      );
      this.particles.push(p);
    }
  }
}
