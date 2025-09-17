// Simple Mobile-Compatible Audio System
// This is a simplified approach that works better on mobile devices

let audioContext = null;
let isAudioEnabled = false;
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let userHasInteracted = false;

console.log(`🎵 Loading Simple Mobile Audio System (Mobile: ${isMobile})`);

// Initialize simple audio system
function initSimpleAudio() {
    console.log('🔊 Initializing Simple Audio System...');
    
    const audioBtn = document.getElementById('audio-control-btn');
    if (audioBtn) {
        audioBtn.addEventListener('click', handleAudioToggle);
        
        // Update button to show it's ready
        updateAudioButton();
        
        console.log('✅ Simple audio controls ready');
    }
    
    // Add interaction detection for mobile
    if (isMobile) {
        addMobileInteractionDetection();
    }
}

// Handle audio toggle with simple Web Audio API
function handleAudioToggle() {
    if (!userHasInteracted) {
        userHasInteracted = true;
        console.log('👆 User interaction detected');
    }
    
    if (!isAudioEnabled) {
        startSimpleAudio();
    } else {
        stopSimpleAudio();
    }
}

// Start simple audio using Web Audio API
function startSimpleAudio() {
    try {
        // Try to create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        
        if (!AudioContext) {
            throw new Error('Web Audio API not supported');
        }
        
        if (!audioContext) {
            audioContext = new AudioContext();
            console.log('🎛️ Audio context created');
        }
        
        // Resume if suspended (required on mobile)
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('▶️ Audio context resumed');
                playSimpleTone();
            }).catch(e => {
                console.warn('⚠️ Failed to resume audio context:', e);
                showAudioNotification('Audio blocked by browser', 'fas fa-volume-off', 'text-yellow-400');
            });
        } else {
            playSimpleTone();
        }
        
    } catch (error) {
        console.warn('⚠️ Web Audio API failed:', error);
        // Fallback to HTML5 audio
        tryHTML5AudioFallback();
    }
}

// Play a simple ambient tone
function playSimpleTone() {
    if (!audioContext) return;
    
    try {
        // Create a simple oscillator for ambient sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set up a low-frequency ambient tone
        oscillator.frequency.setValueAtTime(110, audioContext.currentTime); // Low A
        oscillator.type = 'sine';
        
        // Set volume (very low for ambient effect)
        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
        
        // Start playing
        oscillator.start();
        
        // Set up looping by creating new oscillators
        let currentOscillator = oscillator;
        
        const createNextOscillator = () => {
            if (!isAudioEnabled) return;
            
            const nextOsc = audioContext.createOscillator();
            const nextGain = audioContext.createGain();
            
            nextOsc.connect(nextGain);
            nextGain.connect(audioContext.destination);
            
            nextOsc.frequency.setValueAtTime(110, audioContext.currentTime);
            nextOsc.type = 'sine';
            nextGain.gain.setValueAtTime(0.02, audioContext.currentTime);
            
            nextOsc.start();
            nextOsc.stop(audioContext.currentTime + 2); // Play for 2 seconds
            
            // Schedule next oscillator
            setTimeout(() => {
                if (isAudioEnabled) {
                    createNextOscillator();
                }
            }, 1800); // Slight overlap
            
            currentOscillator = nextOsc;
        };
        
        // Stop current and start loop
        oscillator.stop(audioContext.currentTime + 2);
        setTimeout(() => {
            if (isAudioEnabled) {
                createNextOscillator();
            }
        }, 1800);
        
        isAudioEnabled = true;
        updateAudioButton();
        showAudioNotification('Simple Audio Enabled', 'fas fa-volume-up', 'text-green-400');
        console.log('🔊 Simple audio playing');
        
    } catch (error) {
        console.error('❌ Failed to play simple tone:', error);
        showAudioNotification('Audio playback failed', 'fas fa-exclamation-circle', 'text-red-400');
    }
}

// Stop audio
function stopSimpleAudio() {
    isAudioEnabled = false;
    
    if (audioContext) {
        audioContext.suspend().then(() => {
            console.log('⏸️ Audio context suspended');
        }).catch(e => {
            console.warn('⚠️ Failed to suspend audio context:', e);
        });
    }
    
    updateAudioButton();
    showAudioNotification('Audio Disabled', 'fas fa-volume-mute', 'text-gray-400');
    console.log('🔇 Simple audio stopped');
}

// Fallback to HTML5 audio
function tryHTML5AudioFallback() {
    console.log('🔄 Trying HTML5 audio fallback...');
    
    const audio = document.getElementById('background-audio');
    if (audio) {
        // Set up a simple beep pattern
        audio.volume = 0.1;
        audio.muted = false;
        
        audio.play().then(() => {
            isAudioEnabled = true;
            updateAudioButton();
            showAudioNotification('HTML5 Audio Enabled', 'fas fa-music', 'text-blue-400');
            console.log('🎵 HTML5 audio fallback working');
        }).catch(e => {
            console.warn('⚠️ HTML5 audio also failed:', e);
            showAudioNotification('Audio not available', 'fas fa-volume-off', 'text-gray-400');
        });
    }
}

// Update audio button appearance
function updateAudioButton() {
    const audioBtn = document.getElementById('audio-control-btn');
    const audioIcon = document.getElementById('audio-icon');
    
    if (audioBtn && audioIcon) {
        if (isAudioEnabled) {
            audioIcon.className = 'fas fa-volume-up text-sm sm:text-lg group-hover:scale-110 transition-transform duration-300';
            audioBtn.title = 'Disable Audio (Press M)';
            audioBtn.classList.remove('animate-pulse');
        } else {
            audioIcon.className = 'fas fa-volume-mute text-sm sm:text-lg group-hover:scale-110 transition-transform duration-300';
            audioBtn.title = 'Enable Audio (Press M)';
            
            if (isMobile && !userHasInteracted) {
                audioBtn.classList.add('animate-pulse');
            }
        }
    }
}

// Add mobile interaction detection
function addMobileInteractionDetection() {
    const events = ['touchstart', 'click', 'keydown'];
    events.forEach(event => {
        document.addEventListener(event, () => {
            if (!userHasInteracted) {
                userHasInteracted = true;
                updateAudioButton();
                console.log('📱 Mobile user interaction detected');
            }
        }, { once: true, passive: true });
    });
}

// Show audio notification (reuse existing function)
function showAudioNotification(message, iconClass, textColorClass) {
    // Remove existing notification
    const existing = document.getElementById('audio-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.id = 'audio-notification';
    notification.className = `fixed top-20 right-4 z-50 bg-tron-black/90 backdrop-blur-sm border border-tron-red/50 rounded-lg px-4 py-2 flex items-center space-x-2 shadow-lg animate-fade-in`;
    notification.innerHTML = `
        <i class="${iconClass} ${textColorClass}"></i>
        <span class="text-white text-sm font-medium">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 2 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 2000);
}

// Keyboard shortcut (M key)
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'm' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
        const activeElement = document.activeElement;
        // Don't trigger if user is typing in an input
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            return;
        }
        
        event.preventDefault();
        handleAudioToggle();
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimpleAudio);
} else {
    initSimpleAudio();
}

// Show mobile welcome message
if (isMobile) {
    setTimeout(() => {
        if (!userHasInteracted) {
            showAudioNotification('Tap 🔊 for audio', 'fas fa-hand-pointer', 'text-blue-400');
        }
    }, 3000);
}

console.log('🎵 Simple Mobile Audio System loaded successfully!');