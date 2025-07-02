// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initStartButton();
    initControllerInteractions();
    initAnimations();
});

// Start Playing Button functionality
function initStartButton() {
    const startBtn = document.getElementById('startPlayingBtn');
    
    startBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'translateY(-3px) scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = 'translateY(-3px) scale(1)';
            // Redirect to options page
            window.location.href = './options/options.html';
        }, 150);
    });
    
    // Add hover effects
    startBtn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 8px 30px rgba(64, 224, 255, 0.6)';
    });
    
    startBtn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 20px rgba(64, 224, 255, 0.3)';
    });
}

// Controller interactions
function initControllerInteractions() {
    const controller = document.querySelector('.game-controller');
    const dpadBtns = document.querySelectorAll('.d-pad-btn');
    const actionBtns = document.querySelectorAll('.action-btn');
    
    // Add click effects to controller buttons
    [...dpadBtns, ...actionBtns].forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            this.style.boxShadow = '0 0 20px currentColor';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Controller hover effect
    if (controller) {
        controller.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
        });
        
        controller.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    }
}

// Initialize animations
function initAnimations() {
    // Title animation on load
    const title = document.querySelector('.hero-title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            title.style.transition = 'all 1s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Description animation
    const description = document.querySelector('.hero-description');
    if (description) {
        description.style.opacity = '0';
        description.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            description.style.transition = 'all 0.8s ease';
            description.style.opacity = '1';
            description.style.transform = 'translateY(0)';
        }, 600);
    }
    
    // Button animation
    const button = document.querySelector('.btn-primary');
    if (button) {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.8s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 900);
    }
}

// Particle system enhancement
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    document.querySelector('.bg-animation').appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 25000);
}

// Add more particles periodically
setInterval(createParticle, 4000);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Enter key on start button
    if (e.key === 'Enter' && document.activeElement === document.getElementById('startPlayingBtn')) {
        document.getElementById('startPlayingBtn').click();
    }
    
    // Arrow keys for controller simulation
    const keyMap = {
        'ArrowUp': '.d-pad-btn.up',
        'ArrowDown': '.d-pad-btn.down',
        'ArrowLeft': '.d-pad-btn.left',
        'ArrowRight': '.d-pad-btn.right'
    };
    
    if (keyMap[e.code]) {
        const btn = document.querySelector(keyMap[e.code]);
        if (btn) {
            btn.click();
        }
    }
});

// Mouse movement parallax effect (subtle)
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Subtle parallax effect on controller
    const controller = document.querySelector('.game-controller');
    if (controller) {
        const moveX = (mouseX - 0.5) * 10;
        const moveY = (mouseY - 0.5) * 10;
        controller.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Simple loading animation for page transitions
function showLoader() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #2d1b69 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(64, 224, 255, 0.3);
        border-top: 3px solid #40e0ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    
    // Fade in loader
    setTimeout(() => {
        loader.style.opacity = '1';
    }, 10);
    
    return loader;
}

// Enhanced start button with loading
document.getElementById('startPlayingBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Show loading animation
    const loader = showLoader();
    
    // Simulate loading time then redirect
    setTimeout(() => {
        window.location.href = './options/options.html';
    }, 1200);
});