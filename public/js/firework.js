const onFireworkExplode = new CustomEvent('onFireworkExplode');

const onFireworkDispose = new CustomEvent('onFireworkDispose');

class Firework {
  colors;
  rasingParticle;
  exploded = false;
  particles = [];
  graphicBuffer = createGraphics(width, height);
  trailSize;

  constructor(colors) {
    this.colors = colors;
    this.rasingParticle = new RasingParticle(
      this.graphicBuffer,
      createVector(random(width * 0.4, width * 0.6), height),
      this.colors[0]
    );
  }

  explode() {}

  dispose() {
    document.dispatchEvent(onFireworkDispose);
    this.graphicBuffer.remove();
  }

  // 花火が打ち上がったのかをチェックする関数
  get done() {
    return this.exploded && this.particles.length === 0;
  }

  // 花火が打ち上がったらどのように落ちて行くのかを設定
  update(delta) {
    const delta = deltaTime;

    if (!this.exploded) {
      this.rasingParticle.update(delta);
      if (this.rasingParticle.velocity.y >= 0) {
        document.dispatchEvent(onFireworkExplode);
        this.exploded = true;
        this.explode();
      }
    }

    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(delta);
      if (this.particles[i].done) {
        this.particles.splice(i, 1);
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

  selectColor(vector) {
    let xyMag = vector.x * vector.x + vector.y * vector.y;
    if (xyMag < 0.3) {
      return this.colors[0];
    } else if (xyMag < 0.6) {
      return this.colors[1];
    } else {
      return this.colors[2];
    }
  }
}

class KikuFirework extends Firework {
  constructor(colors) {
    super(colors);

    this.trailSize = 10;
  }

  explode() {
    super.explode();

    const rPos = this.rasingParticle.position;
    for (var i = 0; i < 300; i++) {
      const vec = p5.Vector.random3D();
      const color = this.selectColor(vec);

      var p = new ExplodeParticle(
        this.graphicBuffer,
        createVector(rPos.x, rPos.y),
        color,
        random() < 0.5 ? 3 : 1,
        0.99,
        250,
        vec.mult(10)
      );
      this.particles.push(p);
    }
  }
}

class BotanFirework extends Firework {
  constructor(colors) {
    super(colors);
    this.trailSize = 50;
  }

  explode() {
    super.explode();

    const rPos = this.rasingParticle.position;
    for (let i = 0; i < 200; i++) {
      const vec = p5.Vector.random3D();
      let star_color = this.selectColor(vec);

      var p = new ExplodeParticle(
        this.graphicBuffer,
        createVector(rPos.x, rPos.y),
        star_color,
        random(5, 8),
        0.97,
        300,
        vec.mult(6),
        5,
        createVector(0, 0)
      );

      this.particles.push(p);
    }
  }
}
