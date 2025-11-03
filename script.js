// Form Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');

// Chip Selection
const chips = document.querySelectorAll('.chip');
let selectedPreference = 'economy';

chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedPreference = chip.dataset.preference;
        
        // Add ripple effect
        createRipple(chip);
    });
});

function createRipple(element) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 20px;
        top: 0;
        left: 0;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    `;
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = loginForm.querySelector('.primary-button');
    const originalContent = submitButton.innerHTML;
    
    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="button-icon">⏳</span> Authenticating...';
    submitButton.style.opacity = '0.7';
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success
    submitButton.innerHTML = '<span class="button-icon">✅</span> Welcome back!';
    submitButton.style.background = 'rgba(76, 175, 80, 0.9)';
    
    showNotification('🚀 Login successful! Welcome aboard!', 'success');
    
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalContent;
        submitButton.style.opacity = '1';
        submitButton.style.background = '';
        loginForm.reset();
    }, 2000);
});

// Signup Form Submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = signupForm.querySelector('.primary-button');
    const originalContent = submitButton.innerHTML;
    
    // Get form values
    const formData = new FormData(signupForm);
    const password = signupForm.querySelector('input[type="password"]').value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('❌ Passwords do not match!', 'error');
        return;
    }
    
    // Validate password strength
    if (password.length < 6) {
        showNotification('❌ Password must be at least 6 characters!', 'error');
        return;
    }
    
    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="button-icon">⏳</span> Creating account...';
    submitButton.style.opacity = '0.7';
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Success
    submitButton.innerHTML = '<span class="button-icon">✅</span> Account created!';
    submitButton.style.background = 'rgba(76, 175, 80, 0.9)';
    
    showNotification(`🎉 Welcome to Space Travel! (${selectedPreference.toUpperCase()} class)`, 'success');
    
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalContent;
        submitButton.style.opacity = '1';
        submitButton.style.background = '';
        signupForm.reset();
        chips.forEach(c => c.classList.remove('active'));
        chips[0].classList.add('active');
    }, 2500);
});

// Toggle between Login and Signup
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    const loginCard = document.querySelector('.login-card');
    const signupCard = document.querySelector('.signup-card');
    
    loginCard.style.transform = 'scale(0.95)';
    loginCard.style.opacity = '0.5';
    signupCard.style.transform = 'scale(1.05)';
    signupCard.style.filter = 'brightness(1.1)';
    
    setTimeout(() => {
        loginCard.style.transform = '';
        loginCard.style.opacity = '';
        signupCard.style.transform = '';
        signupCard.style.filter = '';
    }, 500);
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    const loginCard = document.querySelector('.login-card');
    const signupCard = document.querySelector('.signup-card');
    
    signupCard.style.transform = 'scale(0.95)';
    signupCard.style.opacity = '0.5';
    loginCard.style.transform = 'scale(1.05)';
    loginCard.style.filter = 'brightness(1.1)';
    
    setTimeout(() => {
        signupCard.style.transform = '';
        signupCard.style.opacity = '';
        loginCard.style.transform = '';
        loginCard.style.filter = '';
    }, 500);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    
    const bgColor = type === 'success' ? 'rgba(76, 175, 80, 0.95)' : 
                    type === 'error' ? 'rgba(244, 67, 54, 0.95)' : 
                    'rgba(20, 20, 20, 0.95)';
    
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: ${bgColor};
        color: white;
        padding: 16px 32px;
        border-radius: 25px;
        font-size: 16px;
        z-index: 1000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
        max-width: 90%;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => notification.remove(), 500);
    }, 3500);
}

// Input Focus Effects
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Parallax effect for cards on mouse move
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 3;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Card Tilt Effect
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Animate Scene Elements
function animateSceneElements() {
    const spheres = document.querySelectorAll('.sphere');
    const orbs = document.querySelectorAll('.orb');
    
    spheres.forEach((sphere, index) => {
        const delay = index * 200;
        setTimeout(() => {
            sphere.style.animation = `float ${3 + index}s ease-in-out infinite`;
        }, delay);
    });
    
    orbs.forEach((orb, index) => {
        const delay = index * 300;
        setTimeout(() => {
            orb.style.animation = `glow ${4 + index}s ease-in-out infinite`;
        }, delay);
    });
}

// Add floating animation keyframes
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-15px);
        }
    }
    
    @keyframes glow {
        0%, 100% {
            opacity: 0.6;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(floatStyle);

// Planet Rotation Animation
const planetSurface = document.querySelector('.planet-surface');
if (planetSurface) {
    let rotation = 0;
    setInterval(() => {
        rotation += 0.3;
        planetSurface.style.transform = `rotate(${rotation}deg)`;
    }, 50);
}

// Initialize on Page Load
window.addEventListener('load', () => {
    animateSceneElements();
    
    // Fade in cards
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    console.log('🌙 Space Travel Authentication System loaded!');
    console.log('🚀 Ready for cosmic adventures!');
});

// Password Strength Indicator
const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const password = e.target.value;
        const strength = calculatePasswordStrength(password);
        
        if (password.length > 0) {
            input.style.borderColor = 
                strength === 'weak' ? 'rgba(244, 67, 54, 0.6)' :
                strength === 'medium' ? 'rgba(255, 152, 0, 0.6)' :
                'rgba(76, 175, 80, 0.6)';
        } else {
            input.style.borderColor = '';
        }
    });
});

function calculatePasswordStrength(password) {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
}

// Easter Egg: Space Launch Sequence
let clickCount = 0;
const glowOrb = document.querySelector('.glow-orb');

if (glowOrb) {
    glowOrb.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 5) {
            showNotification('🚀 Launch sequence initiated!', 'success');
            document.body.style.animation = 'launch 3s ease-in-out';
            
            const launchStyle = document.createElement('style');
            launchStyle.textContent = `
                @keyframes launch {
                    0% { transform: scale(1) translateY(0); }
                    50% { transform: scale(0.8) translateY(0); }
                    100% { transform: scale(2) translateY(-100vh); opacity: 0; }
                }
            `;
            document.head.appendChild(launchStyle);
            
            setTimeout(() => {
                document.body.style.animation = '';
                clickCount = 0;
            }, 3000);
        }
    });
}