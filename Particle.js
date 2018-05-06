function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.r = 4 * strength;
    if (this.r > 2) {
        this.r = 2;
    }
    this.loc = createVector(this.x, this.y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.update = function() {
        this.x += random(-1 * this.r, this.r);
        this.y += random(-1 * this.r, this.r);
        if (this.r > 0) {
            this.r -= 0.1;
        } else {
            this.r = 0;
        }
    };
}
