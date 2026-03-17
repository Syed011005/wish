// Advanced Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        
        if (!this.canvas) {
            console.error('Particle canvas not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.isAnimating = false;
        
        this.resizeCanvas();
        this.init();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    createParticles(x, y, count, color = null) {
        const colors = ['#ff6b9d', '#c44569', '#ff1493', '#ff69b4', '#ff007f'];
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const velocity = Math.random() * 8 + 3;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                radius: Math.random() * 4 + 2,
                color: color || colors[Math.floor(Math.random() * colors.length)],
                life: 1,
                decay: Math.random() * 0.015 + 0.010,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            });
        }
    }

    createFireworks(x, y) {
        const burstCount = 40;
        for (let i = 0; i < burstCount; i++) {
            const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.3;
            const velocity = Math.random() * 12 + 6;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                radius: Math.random() * 3 + 1,
                color: ['#ff6b9d', '#c44569', '#ff1493', '#ffb6c1'][Math.floor(Math.random() * 4)],
                life: 1,
                decay: Math.random() * 0.02 + 0.015,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.3
            });
        }
    }

    animate() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0)';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update physics
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.vx *= 0.98; // air resistance
            p.life -= p.decay;
            p.rotation += p.rotationSpeed;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.life);
            this.ctx.fillStyle = p.color;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}

// Global particle system variable
let particleSystem = null;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (!particleSystem) {
                particleSystem = new ParticleSystem();
                console.log('Particle system initialized!');
            }
        }, 100);
    });
} else {
    if (!particleSystem) {
        particleSystem = new ParticleSystem();
        console.log('Particle system initialized!');
    }
}
