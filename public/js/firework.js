class Firework {
  #color = color(random(255), 255, 255);
  #rasingParticle = new RasingParticle(
    createVector(random(width), height),
    this.#color,
  );
  #exploded = false;
  #particles = [];

  // 花火が打ち上がったのかをチェックする関数
  get done() {
    return (this.#exploded && this.#particles.length === 0);
  }

  // 花火が打ち上がったらどのように落ちて行くのかを設定
  update() {
    if (!this.#exploded) {
      this.#rasingParticle.applyForce(gravity); // gravity分だけ下に下げる関数(particle.jsで定義)
      this.#rasingParticle.update();
      if (this.#rasingParticle.velocity.y >= 0) {
        this.#exploded = true;
        this.explode();
      }
    }

    for (var i = this.#particles.length - 1; i >= 0; i--) {
      this.#particles[i].applyForce(createVector(0, 0.1));
      this.#particles[i].update();
      if (this.#particles[i].done) {
        this.#particles.splice(i, 1);
      }
    }
  }

  // 花火がどのように爆発して開くのかをチェックする関数
  explode() {
    const rPos = this.#rasingParticle.position;
    for (var i = 0; i < 300; i++) {
      var p = new ExplodeParticle(
        createVector(rPos.x, rPos.y),
        this.#color,
        3,
      );
      this.#particles.push(p);
    }
    for (var i = 0; i < 300; i++) {
      var p = new ExplodeParticle(
        createVector(rPos.x, rPos.y),
        this.#color,
        1,
      );
      this.#particles.push(p);
    }
  }

  // 花火を見せるための関数
  show() {
    if (!this.#exploded) {
      this.#rasingParticle.draw();
    }
    for (var i = 0; i < this.#particles.length; i++) {
      this.#particles[i].draw();
    }
  }
}
