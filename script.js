/* =========================================
   GLOBAL STATE
   ========================================= */
var state = {
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
document.addEventListener('DOMContentLoaded', function() {
    var isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    createStars();
    createParticles();
    createPetals();
    createFireflies();
    initCursorGlow();
    initLoadingSequence();
    initShareButtonVisibility();
    initMusicStopOnClose();
    initEventListeners();
});

/* =========================================
   STOP MUSIC WHEN TAB/APP CLOSES
   ========================================= */
function initMusicStopOnClose() {
    var music = document.getElementById('bg-music');

    window.addEventListener('beforeunload', function() {
        if (music && state.musicPlaying) {
            music.pause();
            music.currentTime = 0;
        }
    });
}

/* =========================================
   SHARE BUTTON VISIBILITY
   ========================================= */
function initShareButtonVisibility() {
    var shareBtn = document.getElementById('share-btn');
    if (!shareBtn) return;

    function show() {
        shareBtn.classList.add('visible');
    }

    function hide() {
        shareBtn.classList.remove('visible');
    }

    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
        screens[i].addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                show();
            } else {
                hide();
            }
        });
    }

    show();
}

function getAnswerLabel(answer) {
    return answer === 'yes' ? '❤️ Yes' : "🤍 I'd rather stay friends";
}

function getResponderName() {
    var input = document.getElementById('responder-name');
    if (!input) return '';
    var value = input.value.trim();
    return value || 'Anonymous';
}

function getIgHandle() {
    var input = document.getElementById('ig-handle');
    if (!input) return '';
    var value = input.value.trim();
    if (!value) return '';
    return value.startsWith('@') ? value : '@' + value;
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
    var currentScreen = document.querySelector('.screen.active');
    var nextScreen = document.getElementById(screenId);

    if (currentScreen) {
        currentScreen.classList.add('fade-out');
        currentScreen.classList.remove('active');
    }

    setTimeout(function() {
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
    document.getElementById('btn-continue-home').addEventListener('click', function() {
        transitionToScreen('flower-scene');
    });

    document.getElementById('btn-continue-scene').addEventListener('click', function() {
        transitionToScreen('funny-section');
    });

    document.getElementById('btn-continue-funny').addEventListener('click', function() {
        transitionToScreen('meme-section');
    });

    document.getElementById('btn-continue-meme').addEventListener('click', function() {
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
    var shareData = {
        title: 'A Little Surprise',
        text: 'I made something special for you',
        url: window.location.href
    };

    function fallback() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href).then(function() {
                showToast('Link copied! Paste it anywhere to share');
            }).catch(function() {
                showToast('Copy this page link and share it');
            });
        } else {
            showToast('Copy this page link and share it');
        }
    }

    if (navigator.share) {
        navigator.share(shareData).catch(fallback);
    } else {
        fallback();
    }
}

function showToast(message) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function() {
        toast.classList.add('show');
    });
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            toast.remove();
        }, 400);
    }, 3000);
}

/* =========================================
   FLOWER SCENE
   ========================================= */
function initFlowerScene() {
    var flower = document.getElementById('blooming-flower');
    var sceneText = document.getElementById('scene-text');
    var typewriterEl = sceneText.querySelector('.typewriter');
    var continueBtn = document.getElementById('btn-continue-scene');

    setTimeout(function() {
        flower.classList.add('bloomed');
    }, 300);

    var lines = [
        'Every flower begins as a tiny seed...',
        'Just like every friendship starts with a simple hello.'
    ];

    var lineIndex = 0;
    var charIndex = 0;
    var currentText = '';
    var isDeleting = false;

    function typeWriter() {
        if (lineIndex >= lines.length) {
            setTimeout(function() {
                continueBtn.classList.remove('hidden');
            }, 500);
            return;
        }

        var currentLine = lines[lineIndex];

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
    var cards = document.querySelectorAll('.funny-card');
    var continueBtn = document.getElementById('btn-continue-funny');

    for (var i = 0; i < cards.length; i++) {
        (function(index) {
            setTimeout(function() {
                cards[index].classList.add('visible');

                var loadingBars = cards[index].querySelectorAll('.loading-bar-fill');
                for (var j = 0; j < loadingBars.length; j++) {
                    var parentBars = loadingBars[j].parentElement.querySelectorAll('.loading-bar-fill');
                    if (parentBars.length > 0) {
                        loadingBars[j].style.width = parentBars[0].style.width || '100%';
                    }
                }

                if (index === cards.length - 1) {
                    setTimeout(function() {
                        continueBtn.classList.remove('hidden');
                    }, 800);
                }
            }, index * 600);
        })(i);
    }
}

/* =========================================
   MEME SECTION
   ========================================= */
function initMemeSection() {
    var cards = document.querySelectorAll('.meme-card');
    var continueBtn = document.getElementById('btn-continue-meme');

    for (var i = 0; i < cards.length; i++) {
        (function(index) {
            setTimeout(function() {
                cards[index].classList.add('visible');
            }, index * 300);
        })(i);
    }

    setTimeout(function() {
        continueBtn.classList.remove('hidden');
    }, cards.length * 300 + 500);
}

/* =========================================
   QUESTION PAGE
   ========================================= */
function initQuestionPage() {
    var flower = document.getElementById('question-flower');
    setTimeout(function() {
        flower.classList.add('bloomed');
    }, 500);
}

/* =========================================
   MUSIC TOGGLE
   ========================================= */
function toggleMusic() {
    var music = document.getElementById('bg-music');
    var toggleBtn = document.getElementById('music-toggle');
    var label = toggleBtn ? toggleBtn.querySelector('.music-label') : null;

    var source = music ? music.querySelector('source') : null;
    var hasSource = source && (source.src || source.getAttribute('src'));

    if (!music || !hasSource) {
        showToast('Music file not found. Add it to assets/music/');
        return;
    }

    if (state.musicPlaying) {
        fadeOutMusic(music, function() {
            music.pause();
            state.musicPlaying = false;
            if (label) label.textContent = 'Music OFF';
        });
    } else {
        music.volume = 0;
        music.play().then(function() {
            fadeInMusic(music);
            state.musicPlaying = true;
            if (label) label.textContent = 'Music ON';
        }).catch(function() {
            showToast('Tap anywhere to enable music');
        });
    }
}

function fadeInMusic(music, targetVolume, step) {
    targetVolume = targetVolume || 0.25;
    step = step || 0.02;
    function fade() {
        if (music.volume < targetVolume) {
            music.volume = Math.min(targetVolume, music.volume + step);
            requestAnimationFrame(fade);
        }
    };
    fade();
}

function fadeOutMusic(music, callback, step) {
    step = step || 0.02;
    function fade() {
        if (music.volume > 0) {
            music.volume = Math.max(0, music.volume - step);
            requestAnimationFrame(fade);
        } else if (callback) {
            callback();
        }
    };
    fade();
}

/* =========================================
   YES BUTTON HANDLER
   ========================================= */
function handleYes() {
    state.lastAnswer = 'yes';
    AnswerCollector.recordAnswer('yes');
    transitionToScreen('yes-page');

    setTimeout(function() {
        createConfetti();
        createFireworks();
        createHeartRain();
        showToast('Thank you! 💖');
    }, 500);
}

/* =========================================
   FRIENDS BUTTON HANDLER
   ========================================= */
function handleFriends(e) {
    if (state.friendsDodgeCount < state.maxDodgeCount) {
        e.preventDefault();

        var btn = document.getElementById('btn-friends');
        var rect = btn.getBoundingClientRect();

        var maxX = window.innerWidth - rect.width;
        var maxY = window.innerHeight - rect.height;

        var newX = Math.random() * maxX;
        var newY = Math.random() * maxY;

        btn.style.position = 'fixed';
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
        btn.style.zIndex = '9998';

        state.friendsDodgeCount++;

        setTimeout(function() {
            btn.style.position = '';
            btn.style.left = '';
            btn.style.top = '';
            btn.style.zIndex = '';
        }, 1000);
    } else {
        state.lastAnswer = 'friends';
        AnswerCollector.recordAnswer('friends');
        transitionToScreen('friends-page');
        showToast('Thank you for your honesty 😊');
    }
}

/* =========================================
   ANSWER COLLECTOR
   ========================================= */
var AnswerCollector = {
    storageKey: 'little_surprise_answers',

    getAnswerText: function(answer) {
        return answer === 'yes' ? '❤️ Yes' : "🤍 I'd rather stay friends";
    },

    saveLocally: function(answer) {
        try {
            var name = getResponderName();
            var igHandle = getIgHandle();
            var answers = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
            answers.push({
                answer: answer,
                text: this.getAnswerText(answer),
                name: name,
                igHandle: igHandle,
                url: window.location.href,
                time: new Date().toISOString()
            });
            localStorage.setItem(this.storageKey, JSON.stringify(answers));
        } catch (e) {
            // ignore storage errors
        }
    },

    sendByEmail: function(answer) {
        var answerText = this.getAnswerText(answer);
        var name = getResponderName();
        var igHandle = getIgHandle();
        var igLine = igHandle ? 'Instagram: ' + igHandle : '';
        var bodyText = 'New answer from the surprise website:\n\nName: ' + name + '\nAnswer: ' + answerText + '\n' + igLine + '\n\nLink: ' + window.location.href + '\nTime: ' + new Date().toLocaleString();
        var subject = encodeURIComponent('Surprise Website Answer');
        var body = encodeURIComponent(bodyText);

        var mailto = 'mailto:theprofrog1223@gmail.com?subject=' + subject + '&body=' + body;

        if (navigator.share) {
            navigator.share({
                title: 'Surprise Website Answer',
                text: bodyText,
                url: window.location.href
            }).catch(function() {
                window.open(mailto, '_blank');
            });
        } else {
            window.open(mailto, '_blank');
        }

        showToast('Answer sent! Check your email.');
    },

    recordAnswer: function(answer) {
        this.saveLocally(answer);
        var self = this;
        setTimeout(function() {
            self.sendByEmail(answer);
        }, 2000);
    }
};

/* =========================================
   CONFETTI
   ========================================= */
function createConfetti() {
    var container = document.getElementById('confetti-container');
    var colors = ['#ff6b9d', '#c084fc', '#fb7185', '#fbbf24', '#ffffff', '#f472b6'];
    var confettiCount = state.isMobile ? 80 : 150;

    for (var i = 0; i < confettiCount; i++) {
        (function(index) {
            setTimeout(function() {
                var confetti = document.createElement('div');
                confetti.className = 'confetti rect';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                container.appendChild(confetti);

                setTimeout(function() {
                    confetti.remove();
                }, 5000);
            }, index * 20);
        })(i);
    }
}

/* =========================================
   FIREWORKS
   ========================================= */
function createFireworks() {
    var container = document.getElementById('fireworks-container');
    var colors = ['#ff6b9d', '#c084fc', '#fb7185', '#fbbf24', '#ffffff'];
    var fireworkCount = state.isMobile ? 5 : 8;

    for (var i = 0; i < fireworkCount; i++) {
        (function(index) {
            setTimeout(function() {
                var firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * 80 + 10 + '%';
                firework.style.top = Math.random() * 50 + 20 + '%';

                var particleCount = 12;
                for (var j = 0; j < particleCount; j++) {
                    var particle = document.createElement('div');
                    particle.className = 'firework-particle';
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    var angle = (Math.PI * 2 / particleCount) * j;
                    var distance = Math.random() * 80 + 40;
                    particle.style.setProperty('--fx', Math.cos(angle) * distance + 'px');
                    particle.style.setProperty('--fy', Math.sin(angle) * distance + 'px');
                    firework.appendChild(particle);
                }

                container.appendChild(firework);
                setTimeout(function() {
                    firework.remove();
                }, 1500);
            }, index * 400);
        })(i);
    }
}

/* =========================================
   HEART RAIN
   ========================================= */
function createHeartRain() {
    var container = document.getElementById('heart-rain');
    var hearts = ['❤️', '💖', '💕', '🌸', '✨', '💗'];
    var heartCount = state.isMobile ? 30 : 50;

    for (var i = 0; i < heartCount; i++) {
        (function(index) {
            setTimeout(function() {
                var heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
                heart.style.animationDelay = Math.random() * 2 + 's';
                heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
                container.appendChild(heart);

                setTimeout(function() {
                    heart.remove();
                }, 6000);
            }, index * 100);
        })(i);
    }
}

/* =========================================
   UTILITY: DEBOUNCE
   ========================================= */
function debounce(func, wait) {
    var timeout;
    return function executedFunction() {
        var args = Array.prototype.slice.call(arguments);
        var later = function() {
            clearTimeout(timeout);
            func.apply(null, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* =========================================
   SMOOTH SCROLLING (for mobile)
   ========================================= */
var screens = document.querySelectorAll('.screen');
for (var i = 0; i < screens.length; i++) {
    screens[i].addEventListener('wheel', function(e) {
        if (this.scrollHeight > this.clientHeight) {
            e.preventDefault();
            this.scrollTop += e.deltaY;
        }
    }, { passive: false });
}
