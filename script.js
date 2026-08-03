/* =========================================
   GLOBAL STATE
   ========================================= */
const state = {
    currentScreen: 'loading',
    musicPlaying: false,
    friendsDodgeCount: 0,
    maxDodgeCount: 2,
    audioContext: null,
    isMobile: /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent),
    lastAnswer: null
};

/* =========================================
   INITIALIZATION
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    if (state.isMobile) {
        document.body.classList.add('mobile-device');
    }
    createStars();
    createParticles();
    createPetals();
    createFireflies();
    initCursorGlow();
    initLoadingSequence();
    initShareButtonVisibility();
    initEventListeners();
});

/* =========================================
   SHARE BUTTON VISIBILITY
   ========================================= */
function initShareButtonVisibility() {
    const shareBtn = document.getElementById('share-btn');
    if (!shareBtn) return;

    const show = () => shareBtn.classList.add('visible');
    const hide = () => shareBtn.classList.remove('visible');

    document.querySelectorAll('.screen').forEach(screen => {
        screen.addEventListener('transitionend', () => {
            if (screen.classList.contains('active')) {
                show();
            } else {
                hide();
            }
        });
    });

    show();
}

function getAnswerLabel(answer) {
    return answer === 'yes' ? '❤️ Yes' : "🤍 I'd rather stay friends";
}

/* =========================================
   STARS
   ========================================= */
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = state.isMobile ? 60 : 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

/* =========================================
   PARTICLES
   ========================================= */
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = state.isMobile ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        container.appendChild(particle);
    }
}

/* =========================================
   PETALS
   ========================================= */
function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = state.isMobile ? 10 : 20;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        petal.style.animationDelay = Math.random() * 10 + 's';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(petal);
    }
}

/* =========================================
   FIREFLIES
   ========================================= */
function createFireflies() {
    const container = document.getElementById('fireflies-container');
    const fireflyCount = state.isMobile ? 8 : 15;

    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.top = Math.random() * 100 + '%';
        firefly.style.setProperty('--fly-duration', (Math.random() * 8 + 6) + 's');
        firefly.style.setProperty('--fly-x', (Math.random() * 200 - 100) + 'px');
        firefly.style.setProperty('--fly-y', (Math.random() * 200 - 100) + 'px');
        firefly.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(firefly);
    }
}

/* =========================================
   CURSOR GLOW
   ========================================= */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || state.isMobile) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

/* =========================================
   LOADING SEQUENCE
   ========================================= */
function initLoadingSequence() {
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.querySelector('.loading-text');
    const loadingSubtext = document.getElementById('loading-subtext');

    const loadingPhases = [
        { text: 'Loading something special...', progress: 0 },
        { text: 'Loading something special...', progress: 30 },
        { text: 'Loading my courage...', progress: 60 },
        { text: 'Almost there...', progress: 85 },
        { text: 'Ready!', progress: 100 }
    ];

    let phaseIndex = 0;

    function updateLoading() {
        if (phaseIndex >= loadingPhases.length) {
            setTimeout(() => {
                transitionToScreen('home-page');
                showShareButton();
            }, 500);
            return;
        }

        const phase = loadingPhases[phaseIndex];
        loadingText.textContent = phase.text;
        loadingBar.style.width = phase.progress + '%';

        if (phase.progress === 100) {
            loadingSubtext.textContent = 'Ready!';
            loadingSubtext.style.opacity = '1';
        }

        phaseIndex++;
        setTimeout(updateLoading, 1200);
    }

    setTimeout(updateLoading, 500);
}

/* =========================================
   SCREEN TRANSITIONS
   ========================================= */
function transitionToScreen(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(screenId);

    if (currentScreen) {
        currentScreen.classList.add('fade-out');
        currentScreen.classList.remove('active');
    }

    setTimeout(() => {
        if (nextScreen) {
            nextScreen.classList.add('active');
            nextScreen.classList.remove('fade-out');
            state.currentScreen = screenId;

            if (screenId === 'flower-scene') {
                initFlowerScene();
            } else if (screenId === 'funny-section') {
                initFunnySection();
            } else if (screenId === 'meme-section') {
                initMemeSection();
            } else if (screenId === 'question-page') {
                initQuestionPage();
            }
        }
    }, 800);
}

/* =========================================
   EVENT LISTENERS
   ========================================= */
function initEventListeners() {
    document.getElementById('btn-continue-home').addEventListener('click', () => {
        transitionToScreen('flower-scene');
    });

    document.getElementById('btn-continue-scene').addEventListener('click', () => {
        transitionToScreen('funny-section');
    });

    document.getElementById('btn-continue-funny').addEventListener('click', () => {
        transitionToScreen('meme-section');
    });

    document.getElementById('btn-continue-meme').addEventListener('click', () => {
        transitionToScreen('question-page');
    });

    document.getElementById('music-toggle').addEventListener('click', toggleMusic);

    document.getElementById('btn-yes').addEventListener('click', handleYes);
    document.getElementById('btn-friends').addEventListener('click', handleFriends);

    document.getElementById('share-btn').addEventListener('click', shareWebsite);
}

/* =========================================
   SHARE FUNCTIONALITY
   ========================================= */
function shareWebsite() {
    const shareData = {
        title: 'A Little Surprise',
        text: 'I made something special for you',
        url: window.location.href
    };

    const fallback = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast('Link copied! Paste it anywhere to share');
            }).catch(() => showToast('Copy this page link and share it'));
        } else {
            showToast('Copy this page link and share it');
        }
    };

    if (navigator.share) {
        navigator.share(shareData).catch(fallback);
    } else {
        fallback();
    }
}

function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

/* =========================================
   FLOWER SCENE
   ========================================= */
function initFlowerScene() {
    const flower = document.getElementById('blooming-flower');
    const sceneText = document.getElementById('scene-text');
    const typewriterEl = sceneText.querySelector('.typewriter');
    const continueBtn = document.getElementById('btn-continue-scene');

    setTimeout(() => {
        flower.classList.add('bloomed');
    }, 300);

    const lines = [
        'Every flower begins as a tiny seed...',
        'Just like every friendship starts with a simple hello.'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function typeWriter() {
        if (lineIndex >= lines.length) {
            setTimeout(() => {
                continueBtn.classList.remove('hidden');
            }, 500);
            return;
        }

        const currentLine = lines[lineIndex];

        if (!isDeleting) {
            currentText = currentLine.substring(0, charIndex + 1);
            charIndex++;
            typewriterEl.textContent = currentText;
            typewriterEl.classList.add('visible');

            if (charIndex === currentLine.length) {
                lineIndex++;
                charIndex = 0;
                currentText = '';
                isDeleting = false;
                setTimeout(typeWriter, 1500);
                return;
            }
        }

        setTimeout(typeWriter, 50);
    }

    setTimeout(typeWriter, 2000);
}

/* =========================================
   FUNNY SECTION
   ========================================= */
function initFunnySection() {
    const cards = document.querySelectorAll('.funny-card');
    const continueBtn = document.getElementById('btn-continue-funny');

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');

            const loadingBars = card.querySelectorAll('.loading-bar-fill');
            loadingBars.forEach(bar => {
                bar.style.width = bar.parentElement.querySelector('.loading-bar-fill')?.style?.width || '100%';
            });

            if (index === cards.length - 1) {
                setTimeout(() => {
                    continueBtn.classList.remove('hidden');
                }, 800);
            }
        }, index * 600);
    });
}

/* =========================================
   MEME SECTION
   ========================================= */
function initMemeSection() {
    const cards = document.querySelectorAll('.meme-card');
    const continueBtn = document.getElementById('btn-continue-meme');

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 300);
    });

    setTimeout(() => {
        continueBtn.classList.remove('hidden');
    }, cards.length * 300 + 500);
}

/* =========================================
   QUESTION PAGE
   ========================================= */
function initQuestionPage() {
    const flower = document.getElementById('question-flower');
    setTimeout(() => {
        flower.classList.add('bloomed');
    }, 500);
}

/* =========================================
   MUSIC / BUILT-IN MELODY
   ========================================= */
const MelodyEngine = {
    audioContext: null,
    isPlaying: false,
    tempo: 140,
    currentNoteIndex: 0,
    timerId: null,
    nextNoteTime: 0,

    getOrCreateContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioContext;
    },

    playNote(freq, startTime, duration, type = 'sine', volume = 0.0001) {
        const ctx = this.getOrCreateContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(volume, startTime);
        gain.gain.exponentialRampToValueAtTime(volume * 0.7, startTime + duration * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
    },

    scheduleNotes(notes) {
        const ctx = this.getOrCreateContext();
        let t = ctx.currentTime + 0.1;
        const beat = 60 / this.tempo;

        notes.forEach(n => {
            const dur = (n.d || 1) * beat;
            const freq = n.f;

            this.playNote(freq, t, dur * 0.85, n.t || 'sine', 0.00008);

            if (n.chord) {
                (n.chord || []).forEach(c => {
                    this.playNote(c, t, dur * 0.85, n.t || 'sine', 0.00005);
                });
            }

            t += dur;
        });

        this.nextNoteTime = t;
        this.timerId = setTimeout(() => this.scheduleLoop(notes), (t - ctx.currentTime) * 1000 - 200);
    },

    scheduleLoop(notes) {
        if (!this.isPlaying) return;
        this.scheduleNotes(notes);
    },

    getMelody() {
        const E3 = 164.81, F3 = 174.61, G3 = 196.00, A3 = 220.00, B3 = 246.94;
        const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
        const C5 = 523.25, D5 = 587.33, E5 = 659.25;

        return [
            { f: E4, d: 0.75 },
            { f: G4, d: 0.25 },
            { f: A4, d: 1 },
            { f: G4, d: 0.5 },
            { f: E4, d: 0.5 },
            { f: C4, d: 1 },
            { f: D4, d: 0.75 },
            { f: E4, d: 0.25 },
            { f: F4, d: 0.75 },
            { f: E4, d: 0.25 },
            { f: D4, d: 1 },
            { f: C4, d: 0.5 },
            { f: E4, d: 0.5 },
            { f: G4, d: 1.5 },
            { f: A4, d: 0.5 },
            { f: G4, d: 1 },
            { f: E4, d: 1 },
            { f: D4, d: 0.75 },
            { f: E4, d: 0.25 },
            { f: C4, d: 2 },
        ];
    },

    start() {
        if (this.isPlaying) return;
        const ctx = this.getOrCreateContext();
        if (ctx.state === 'suspended') ctx.resume();

        this.isPlaying = true;
        this.scheduleNotes(this.getMelody());
    },

    stop() {
        this.isPlaying = false;
        if (this.timerId) clearTimeout(this.timerId);
        this.timerId = null;
    }
};

/* =========================================
   MUSIC TOGGLE
   ========================================= */
function toggleMusic() {
    const toggleBtn = document.getElementById('music-toggle');
    const label = toggleBtn ? toggleBtn.querySelector('.music-label') : null;

    if (state.musicPlaying) {
        MelodyEngine.stop();
        state.musicPlaying = false;
        if (label) label.textContent = 'Music OFF';
    } else {
        MelodyEngine.start();
        state.musicPlaying = true;
        if (label) label.textContent = 'Music ON';
    }
}

/* =========================================
   YES BUTTON HANDLER
   ========================================= */
function handleYes() {
    state.lastAnswer = 'yes';
    AnswerCollector.recordAnswer('yes');
    transitionToScreen('yes-page');

    setTimeout(() => {
        createConfetti();
        createFireworks();
        createHeartRain();
    }, 500);
}

/* =========================================
   FRIENDS BUTTON HANDLER
   ========================================= */
function handleFriends(e) {
    if (state.friendsDodgeCount < state.maxDodgeCount) {
        e.preventDefault();

        const btn = document.getElementById('btn-friends');
        const rect = btn.getBoundingClientRect();

        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        btn.style.position = 'fixed';
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
        btn.style.zIndex = '9998';

        state.friendsDodgeCount++;

        setTimeout(() => {
            btn.style.position = '';
            btn.style.left = '';
            btn.style.top = '';
            btn.style.zIndex = '';
        }, 1000);
    } else {
        state.lastAnswer = 'friends';
        AnswerCollector.recordAnswer('friends');
        transitionToScreen('friends-page');
    }
}

/* =========================================
   ANSWER COLLECTOR
   ========================================= */
const AnswerCollector = {
    repoOwner: 'BaldwinAdrianDelosSantos',
    repoName: 'LittleSurprise',

    getAnswerText(answer) {
        return answer === 'yes'
            ? '❤️ Yes'
            : "🤍 I'd rather stay friends";
    },

    async recordAnswer(answer) {
        const title = `New answer: ${this.getAnswerText(answer)}`;
        const body = `Someone answered: ${this.getAnswerText(answer)}\nURL: ${window.location.href}\nTime: ${new Date().toISOString()}`;

        try {
            await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/issues`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body, labels: ['answer'] })
            });
        } catch (e) {
            this.fallbackEmail(answer);
        }
    },

    fallbackEmail(answer) {
        const text = encodeURIComponent(`My answer is: ${this.getAnswerText(answer)} — see: ${window.location.href}`);
        window.location.href = `mailto:theprofrog1223@gmail.com?subject=My Answer to Your Surprise&body=${text}`;
    }
};

/* =========================================
   CONFETTI
   ========================================= */
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b9d', '#c084fc', '#fb7185', '#fbbf24', '#ffffff', '#f472b6'];
    const confettiCount = state.isMobile ? 80 : 150;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti rect';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }
}

/* =========================================
   FIREWORKS
   ========================================= */
function createFireworks() {
    const container = document.getElementById('fireworks-container');
    const colors = ['#ff6b9d', '#c084fc', '#fb7185', '#fbbf24', '#ffffff'];
    const fireworkCount = state.isMobile ? 5 : 8;

    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 80 + 10 + '%';
            firework.style.top = Math.random() * 50 + 20 + '%';

            const particleCount = 12;
            for (let j = 0; j < particleCount; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                const angle = (Math.PI * 2 / particleCount) * j;
                const distance = Math.random() * 80 + 40;
                particle.style.setProperty('--fx', Math.cos(angle) * distance + 'px');
                particle.style.setProperty('--fy', Math.sin(angle) * distance + 'px');
                firework.appendChild(particle);
            }

            container.appendChild(firework);
            setTimeout(() => firework.remove(), 1500);
        }, i * 400);
    }
}

/* =========================================
   HEART RAIN
   ========================================= */
function createHeartRain() {
    const container = document.getElementById('heart-rain');
    const hearts = ['❤️', '💖', '💕', '🌸', '✨', '💗'];
    const heartCount = state.isMobile ? 30 : 50;

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            container.appendChild(heart);

            setTimeout(() => heart.remove(), 6000);
        }, i * 100);
    }
}

/* =========================================
   UTILITY: DEBOUNCE
   ========================================= */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* =========================================
   SMOOTH SCROLLING (for mobile)
   ========================================= */
document.querySelectorAll('.screen').forEach(screen => {
    screen.addEventListener('wheel', (e) => {
        if (screen.scrollHeight > screen.clientHeight) {
            e.preventDefault();
            screen.scrollTop += e.deltaY;
        }
    }, { passive: false });
});
