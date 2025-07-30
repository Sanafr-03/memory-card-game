document.addEventListener('DOMContentLoaded', function() {
    // Start button functionality - show setup section and scroll to it
    const startBtn = document.getElementById('startBtn');
    const gameSetup = document.getElementById('gameSetup');
    
    startBtn.addEventListener('click', function() {
        // Show the game setup section
        gameSetup.classList.add('visible');
        
        // Scroll to it smoothly
        gameSetup.scrollIntoView({
            behavior: 'smooth'
        });
        
        // Enable scrolling on the page
        document.body.classList.add('game-started');
    });
    
    // Initialize card effects
    initializeCardEffects();
    
    // Animate title characters one by one
    animateTitle();
    
    // Add hover effects to game setup buttons
    document.querySelectorAll('.grid-option, .theme-option').forEach(btn => {
        btn.style.cssText = `
            padding: 10px 20px;
            background: #111111;
            border: 2px solid #8a2be2;
            border-radius: 8px;
            color: #00bfff;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Orbitron', sans-serif;
        `;
        
        btn.addEventListener('mouseover', () => {
            btn.style.background = 'linear-gradient(145deg, #8a2be2, #00bfff)';
            btn.style.color = '#ffffff';
            btn.style.transform = 'translateY(-3px)';
            btn.style.boxShadow = '0 0 15px rgba(138, 43, 226, 0.5)';
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.background = '#111111';
            btn.style.color = '#00bfff';
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
        });
    });
    
    // Tooltip functionality
    const tooltip = document.getElementById('tooltip');
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            tooltip.textContent = e.target.dataset.tooltip;
            tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
            tooltip.style.top = `${rect.top - 35}px`;
            tooltip.style.opacity = '1';
        });
        
        el.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
    
    // Make HUD corners interactive
    document.querySelectorAll('.hud-corner').forEach(corner => {
        corner.addEventListener('mouseenter', () => {
            corner.style.borderImage = 'linear-gradient(45deg, #00bfff, #8a2be2) 1';
        });
        
        corner.addEventListener('mouseleave', () => {
            corner.style.borderImage = 'linear-gradient(45deg, #8a2be2, #00bfff) 1';
        });
    });
    
    // Touch support for mobile devices
    setupTouchSupport();
    
    // Start game button functionality
    const startGameBtn = document.getElementById('startGameBtn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            const gridSize = document.getElementById('gridSize').value;
            const cardTheme = document.getElementById('cardTheme').value;
            
            // Add loading animation
            const originalContent = startGameBtn.innerHTML;
            startGameBtn.innerHTML = 'Initializing... <span class="btn-icon">🌀</span>';
            startGameBtn.disabled = true;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            startGameBtn.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
            
            // Simulate loading (replace with actual game start)
            setTimeout(() => {
                startGameBtn.innerHTML = originalContent;
                startGameBtn.disabled = false;
                
                // Show success animation
                startGameBtn.classList.add('success-animation');
                setTimeout(() => {
                    startGameBtn.classList.remove('success-animation');
                }, 2000);
                
                console.log(`Starting game with Grid: ${gridSize}x${gridSize}, Theme: ${cardTheme}`);
            }, 2000);
        });
    }
});

function initializeCardEffects() {
    document.querySelectorAll('.floating-card').forEach(card => {
        // Get current rotation from transform
        const transform = card.style.transform;
        const rotationMatch = transform.match(/rotate\(([-\d.]+)deg\)/);
        const rotation = rotationMatch ? parseFloat(rotationMatch[1]) : 0;
        
        // Click effect
        card.addEventListener('click', () => {
            card.style.transform = `rotate(${rotation + 10}deg) scale(1.2)`;
            setTimeout(() => {
                card.style.transform = `rotate(${rotation}deg) scale(1)`;
            }, 300);
        });
    });
}

function animateTitle() {
    const chars = document.querySelectorAll('.title-char');
    chars.forEach((char, index) => {
        char.style.animationDelay = `${1.5 + index * 0.1}s`;
        char.style.animation = 'decodeChar 0.5s forwards';
    });
}

function setupTouchSupport() {
    // Add touch support for mobile devices
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach(card => {
        // Touch start (equivalent to hover)
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('touch-active');
        }, { passive: false });
        
        // Touch end (remove hover effect)
        card.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
        
        // Prevent default behavior for touch events
        card.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        // Click effect for touch devices
        card.addEventListener('click', function(e) {
            if ('ontouchstart' in window) {
                e.preventDefault();
                const transform = this.style.transform;
                const rotationMatch = transform.match(/rotate\(([-\d.]+)deg\)/);
                const rotation = rotationMatch ? parseFloat(rotationMatch[1]) : 0;
                
                this.style.transform = `rotate(${rotation + 10}deg) scale(1.2)`;
                setTimeout(() => {
                    this.style.transform = `rotate(${rotation}deg) scale(1)`;
                }, 300);
            }
        });
    });
    
    // Also add touch support for other interactive elements
    document.querySelectorAll('.game-icon, .control-btn, .diamond, .royal-corner').forEach(el => {
        el.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = getComputedStyle(this).transform + ' scale(1.1)';
        }, { passive: false });
        
        el.addEventListener('touchend', function() {
            this.style.transform = this.style.transform.replace(' scale(1.1)', '');
        });
    });
}



document.addEventListener('DOMContentLoaded', function() {
    // Start button functionality
    const startBtn = document.getElementById('startBtn');
    const gameSetup = document.getElementById('gameSetup');
    
    startBtn.addEventListener('click', function() {
        // Show the game setup section
        gameSetup.classList.add('visible');
        
        
        
        // Enable scrolling
        document.body.classList.add('game-started');
        
        // Animate elements
        animateGlassCard();
        animateCircuitLines();
    });
    
    // Update the startGameBtn click handler
startGameBtn.addEventListener('click', function() {
    const gridSize = document.getElementById('gridSize').value;
    const cardTheme = document.getElementById('cardTheme').value;
    
    // Add loading effect
    startGameBtn.innerHTML = `
        <span class="btn-text">INITIALIZING</span>
        <span class="btn-icon">⚡</span>
        <span class="btn-loading-bar"></span>
    `;
    startGameBtn.disabled = true;
    
    // After loading completes (2.5s), transition to game page
    setTimeout(() => {
        startGameBtn.innerHTML = `
            <span class="btn-text">SYSTEM READY</span>
            <span class="btn-icon">✓</span>
        `;
        
        // Flash effect before transition
        startGameBtn.classList.add('cyber-flash');
        
        setTimeout(() => {
            // Store selections in localStorage
            localStorage.setItem('gameSettings', JSON.stringify({
                gridSize,
                cardTheme
            }));
            
            // Redirect to game page
            window.location.href = `${cardTheme}.html`;
        }, 1000);
    }, 2500);
});
    
    // Enhanced select box interaction
    const selectBoxes = document.querySelectorAll('.select-box');
    selectBoxes.forEach(select => {
        select.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(0, 191, 255, 0.5)';
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.borderColor = 'rgba(138, 43, 226, 0.8)';
        });
        
        select.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
            this.parentElement.style.transform = 'translateY(0)';
            this.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        // Add change animation
        select.addEventListener('change', function() {
            const arrow = this.nextElementSibling;
            arrow.style.transform = 'translateY(-50%) rotate(180deg)';
            arrow.style.color = '#8a2be2';
            setTimeout(() => {
                arrow.style.transform = 'translateY(-50%)';
                arrow.style.color = '#00bfff';
            }, 300);
            
            // Create confirmation effect
            const confirmation = document.createElement('span');
            confirmation.className = 'select-confirmation';
            confirmation.textContent = '✓';
            this.parentElement.appendChild(confirmation);
            
            setTimeout(() => {
                confirmation.remove();
            }, 1000);
        });
    });
});

function animateGlassCard() {
    // Animate rules list items with staggered delay
    const rulesItems = document.querySelectorAll('.rules-list li');
    rulesItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            item.style.textShadow = '0 0 8px rgba(0, 191, 255, 0.7)';
            
            // Add pulsing animation to bullet points
            const bullet = item.querySelector('::before') || item;
            bullet.style.animation = 'bulletPulse 2s infinite';
        }, 200 + (index * 150));
    });
    
    // Create microchip particles
    createMicrochipParticles();
}

// Add corner spark elements
const glassCard = document.querySelector('.setup-glass-card');
for (let i = 2; i <= 4; i++) {
    const spark = document.createElement('div');
    spark.className = `corner-spark-${i}`;
    glassCard.appendChild(spark);
}

function animateCircuitLines() {
    const circuitLines = document.querySelectorAll('.circuit-line');
    circuitLines.forEach((line, index) => {
        // Randomize animation duration slightly
        const duration = 3 + Math.random();
        line.style.animationDuration = `${duration}s`;
        
        // Add electricity effect
        setInterval(() => {
            if (Math.random() > 0.7) {
                line.style.boxShadow = `0 0 25px rgba(138, 43, 226, 0.8),
                                       0 0 50px rgba(0, 191, 255, 0.5)`;
                setTimeout(() => {
                    line.style.boxShadow = `0 0 15px rgba(138, 43, 226, 0.5),
                                           0 0 30px rgba(0, 191, 255, 0.3)`;
                }, 200);
            }
        }, 1000);
    });
}

function createMicrochipParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.querySelector('.setup-glass-card').appendChild(particlesContainer);
    
    // Create microchip-like particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'microchip-particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const color = Math.random() > 0.5 ? '#8a2be2' : '#00bfff';
        const shape = Math.random() > 0.5 ? 'rect' : 'circle';
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            background-color: ${color};
            ${shape === 'circle' ? 'border-radius: 50%;' : ''}
            opacity: ${Math.random() * 0.4 + 0.1};
            animation: microchipFloat ${duration}s linear ${delay}s infinite;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
    @keyframes microchipFloat {
        0% { transform: translate(0, 0); opacity: 0.1; }
        25% { transform: translate(10px, -20px); opacity: 0.3; }
        50% { transform: translate(0, -40px); opacity: 0.1; }
        75% { transform: translate(-10px, -20px); opacity: 0.3; }
        100% { transform: translate(0, 0); opacity: 0.1; }
    }
    
    @keyframes bulletPulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
    }
    
    .btn-digital-ripple {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(138, 43, 226, 0.3), 
            transparent);
        transform: translateX(-100%) skewX(-15deg);
        animation: digitalRipple 1.5s ease-out;
        pointer-events: none;
    }
    
    @keyframes digitalRipple {
        to { transform: translateX(100%) skewX(-15deg); }
    }
    
    .btn-loading-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #8a2be2, #00bfff);
        animation: loadingBar 2.5s linear;
    }
    
    @keyframes loadingBar {
        from { width: 0%; }
        to { width: 100%; }
    }
    
    .cyber-flash {
        animation: cyberFlash 0.3s ease-out;
    }
    
    @keyframes cyberFlash {
        0% { box-shadow: 0 0 10px rgba(138, 43, 226, 0.5); }
        50% { box-shadow: 0 0 50px rgba(0, 191, 255, 0.8); }
        100% { box-shadow: 0 0 10px rgba(138, 43, 226, 0.5); }
    }
    
    .select-confirmation {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #00ff88;
        font-weight: bold;
        text-shadow: 0 0 5px rgba(0, 255, 136, 0.7);
        animation: confirmFade 1s ease-out;
    }
    
    @keyframes confirmFade {
        0% { opacity: 0; transform: translateY(-50%) scale(0.5); }
        50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
        100% { opacity: 0; transform: translateY(-50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.select-box').forEach(select => {
    // Change animation
    select.addEventListener('change', function() {
        const arrow = this.nextElementSibling;
        arrow.style.transform = 'translateY(-50%) rotate(180deg)';
        arrow.style.color = '#8a2be2';
        setTimeout(() => {
            arrow.style.transform = 'translateY(-50%)';
            arrow.style.color = '#00bfff';
        }, 300);
        
        // Create confirmation effect
        const confirmation = document.createElement('span');
        confirmation.className = 'select-confirmation';
        confirmation.textContent = '✓';
        this.parentElement.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.remove();
        }, 1000);
    });
    
    // Focus/blur effects
    select.addEventListener('focus', function() {
        this.parentElement.style.borderColor = 'rgba(0, 191, 255, 0.8)';
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(0, 191, 255, 0.3)';
    });
    
    select.addEventListener('blur', function() {
        this.parentElement.style.borderColor = 'rgba(138, 43, 226, 0.5)';
        this.parentElement.style.boxShadow = 'none';
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
const headerContainer = document.querySelector('.header-container');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
        backToTopBtn.classList.add('pulse');
    } else {
        backToTopBtn.classList.remove('visible');
        backToTopBtn.classList.remove('pulse');
    }
});

// Scroll to top when clicked
backToTopBtn.addEventListener('click', () => {
    headerContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Add a cool effect on click
    backToTopBtn.classList.remove('pulse');
    backToTopBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        backToTopBtn.style.transform = 'scale(1) translateY(-5px)';
        setTimeout(() => {
            backToTopBtn.classList.add('pulse');
        }, 300);
    }, 200);
});


document.addEventListener('DOMContentLoaded', function() {
            if (window.location.hash === "#gameSetup") {
                const setupSection = document.getElementById("gameSetup");
                if (setupSection) {
                    setupSection.scrollIntoView({ behavior: "smooth" });
                }
            }
        });