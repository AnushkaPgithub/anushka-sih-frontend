// Simple Train Dashboard JavaScript

class SimpleTrainDashboard {
    constructor() {
        this.isPlaying = false;
        this.currentTime = new Date();
        this.currentTime.setHours(14, 32, 15);
        
        this.init();
    }
    
    init() {
        this.setupControls();
        this.startClock();
        this.setupAlerts();
        this.startSimulation();
    }
    
    // Setup play/pause controls
    setupControls() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        playBtn.addEventListener('click', () => this.play());
        pauseBtn.addEventListener('click', () => this.pause());
    }
    
    play() {
        this.isPlaying = true;
        console.log('Simulation started');
    }
    
    pause() {
        this.isPlaying = false;
        console.log('Simulation paused');
    }
    
    // Update clock every second
    startClock() {
        setInterval(() => {
            if (this.isPlaying) {
                this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
            }
            this.updateTimeDisplay();
        }, 1000);
    }
    
    updateTimeDisplay() {
        const timeStr = this.currentTime.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('currentTime').textContent = timeStr;
    }
    
    // Setup alert resolution
    setupAlerts() {
        const resolveButtons = document.querySelectorAll('.resolve-btn');
        
        resolveButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.resolveAlert(e.target));
        });
    }
    
    resolveAlert(button) {
        const alert = button.closest('.alert');
        
        // Change button text
        button.textContent = '✅ Resolved';
        button.style.background = '#6b7280';
        button.disabled = true;
        
        // Fade out alert after 2 seconds
        setTimeout(() => {
            alert.style.opacity = '0.5';
            alert.style.transform = 'scale(0.95)';
        }, 2000);
        
        // Update delay counter
        this.updateDelayCount();
        
        console.log('Alert resolved');
    }
    
    updateDelayCount() {
        const delayElement = document.getElementById('delayValue');
        let currentCount = parseInt(delayElement.textContent);
        if (currentCount > 0) {
            delayElement.textContent = currentCount - 1;
            this.animateValue(delayElement);
        }
    }
    
    animateValue(element) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#10b981';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#1e40af';
        }, 300);
    }
    
    // Start simulation updates
    startSimulation() {
        setInterval(() => {
            if (this.isPlaying) {
                this.updateRandomValues();
            }
        }, 3000); // Update every 3 seconds
    }
    
    updateRandomValues() {
        // Randomly update passenger count
        if (Math.random() < 0.3) {
            const passengerElement = document.getElementById('passengerValue');
            const currentCount = parseInt(passengerElement.textContent.replace(',', ''));
            const change = Math.floor(Math.random() * 20) - 10; // -10 to +10
            const newCount = Math.max(1000, currentCount + change);
            passengerElement.textContent = newCount.toLocaleString();
            this.animateValue(passengerElement);
        }
        
        // Randomly update on-time percentage
        if (Math.random() < 0.2) {
            const onTimeElement = document.getElementById('onTimeValue');
            const currentPercent = parseFloat(onTimeElement.textContent);
            const change = (Math.random() - 0.5) * 2; // -1 to +1
            const newPercent = Math.max(85, Math.min(99, currentPercent + change));
            onTimeElement.textContent = newPercent.toFixed(1) + '%';
            this.animateValue(onTimeElement);
        }
    }
}

// Start the dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SimpleTrainDashboard();
    console.log('Simple Train Dashboard loaded successfully!');
});