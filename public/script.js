// TrainOps Control Dashboard JavaScript

class TrainOpsControl {
    constructor() {
        this.isPlaying = false;
        this.speed = 2;
        this.currentTime = new Date();
        this.currentTime.setHours(14, 32, 15);
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startSimulation();
        this.updateTrainPositions();
    }
    
    setupEventListeners() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const speedSelect = document.querySelector('.speed-select');
        const applyBtns = document.querySelectorAll('.apply-btn:not(.applied)');
        
        playBtn.addEventListener('click', () => this.play());
        pauseBtn.addEventListener('click', () => this.pause());
        speedSelect.addEventListener('change', (e) => this.setSpeed(e.target.value));
        
        applyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.applyResolution(e.target));
        });
        
        // Station hover effects
        const stations = document.querySelectorAll('.station');
        stations.forEach(station => {
            station.addEventListener('mouseenter', () => this.showStationDetails(station));
            station.addEventListener('mouseleave', () => this.hideStationDetails(station));
        });
    }
    
    play() {
        this.isPlaying = true;
        document.getElementById('playBtn').style.opacity = '0.5';
        document.getElementById('pauseBtn').style.opacity = '1';
    }
    
    pause() {
        this.isPlaying = false;
        document.getElementById('playBtn').style.opacity = '1';
        document.getElementById('pauseBtn').style.opacity = '0.5';
    }
    
    setSpeed(speed) {
        this.speed = parseInt(speed);
    }
    
    startSimulation() {
        setInterval(() => {
            if (this.isPlaying) {
                this.currentTime.setSeconds(this.currentTime.getSeconds() + this.speed);
                this.updateSimTime();
                this.updateTrainPositions();
                this.updateKPIs();
            }
        }, 1000);
    }
    
    updateSimTime() {
        const timeStr = this.currentTime.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.querySelector('.sim-time').textContent = timeStr;
    }
    
    updateTrainPositions() {
        const trains = document.querySelectorAll('.train-marker');
        trains.forEach(train => {
            const currentLeft = parseFloat(train.style.left);
            const newLeft = Math.min(currentLeft + 0.1, 95);
            train.style.left = newLeft + '%';
            
            // Reset position when train reaches end
            if (newLeft >= 95) {
                train.style.left = '5%';
            }
        });
    }
    
    updateKPIs() {
        // Simulate KPI changes
        const kpiValues = document.querySelectorAll('.kpi-value');
        const random = Math.random();
        
        if (random < 0.1) { // 10% chance to update
            kpiValues.forEach((kpi, index) => {
                const currentValue = kpi.textContent;
                let newValue = currentValue;
                
                switch (index) {
                    case 0: // Platform Utilization
                        const util = parseFloat(currentValue);
                        newValue = (util + (Math.random() - 0.5) * 2).toFixed(1) + '%';
                        break;
                    case 1: // On-time Performance
                        const perf = parseFloat(currentValue);
                        newValue = (perf + (Math.random() - 0.5) * 0.5).toFixed(1) + '%';
                        break;
                    case 2: // Conflicts Resolved
                        const conflicts = parseInt(currentValue);
                        newValue = Math.max(0, conflicts + (Math.random() > 0.5 ? 1 : -1));
                        break;
                }
                
                if (newValue !== currentValue) {
                    kpi.textContent = newValue;
                    this.animateKPI(kpi);
                }
            });
        }
    }
    
    animateKPI(element) {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.15s ease-out';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }
    
    applyResolution(button) {
        button.textContent = 'Applied ✓';
        button.classList.add('applied');
        button.disabled = true;
        
        // Animate button
        button.style.transform = 'scale(1.05)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Update KPIs
        const conflictKPI = document.querySelectorAll('.kpi-value')[2];
        const currentConflicts = parseInt(conflictKPI.textContent);
        conflictKPI.textContent = Math.max(0, currentConflicts - 1);
        this.animateKPI(conflictKPI);
        
        // Remove advisory after delay
        setTimeout(() => {
            const advisoryItem = button.closest('.advisory-item');
            advisoryItem.style.opacity = '0';
            advisoryItem.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                advisoryItem.remove();
            }, 300);
        }, 2000);
    }
    
    showStationDetails(station) {
        const platforms = station.querySelector('.platforms');
        platforms.style.opacity = '1';
        platforms.style.transform = 'translateY(-2px)';
    }
    
    hideStationDetails(station) {
        const platforms = station.querySelector('.platforms');
        platforms.style.opacity = '0';
        platforms.style.transform = 'translateY(0)';
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TrainOpsControl();
});