const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.life -= this.decay;
    }
    
    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.type === 'heart' ? '#ff1493' : '#ffd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function addParticles(type, count = 30) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(
            canvas.width / 2,
            canvas.height / 2,
            type
        ));
    }
}

function celebrateEid() {
    addParticles('star', 50);
}

function heartRain() {
    addParticles('heart', 50);
}

function magicEffect() {
    addParticles('magic', 100);
}

function auroraToggle() {
    // Toggle aurora effect
    document.querySelector('.aurora').style.opacity = 
        document.querySelector('.aurora').style.opacity === '0' ? '1' : '0';
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        } else {
            particles[i].draw();
        }
    }
    
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});