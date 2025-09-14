// Profile Page JavaScript

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile page loaded successfully!');
    
    // Add event listeners
    setupEventListeners();
    
    // Load user preferences
    loadUserPreferences();
});

// Setup all event listeners
function setupEventListeners() {
    // Save buttons
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', handleSave);
    });
    
    // Change photo button
    const changePhotoBtn = document.querySelector('.change-photo-btn');
    changePhotoBtn.addEventListener('click', handleChangePhoto);
    
    // Toggle switches
    const toggles = document.querySelectorAll('input[type="checkbox"]');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', handleToggleChange);
    });
    
    // Form inputs
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
        input.addEventListener('change', handleInputChange);
    });
}

// Handle save button clicks
function handleSave(event) {
    const button = event.target;
    const section = button.closest('.settings-section');
    const sectionTitle = section.querySelector('h3').textContent;
    
    // Show loading state
    button.textContent = '💾 Saving...';
    button.disabled = true;
    
    // Simulate save operation
    setTimeout(() => {
        button.textContent = '✅ Saved!';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = '💾 Save Changes';
            button.disabled = false;
        }, 2000);
        
        showNotification(`${sectionTitle} updated successfully!`, 'success');
    }, 1000);
}

// Handle photo change
function handleChangePhoto() {
    const avatars = ['👨‍💼', '👩‍💼', '👨‍🔧', '👩‍🔧', '👨‍🚀', '👩‍🚀', '🧑‍💻', '👨‍🎓', '👩‍🎓'];
    const currentAvatar = document.querySelector('.avatar');
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    
    currentAvatar.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        currentAvatar.textContent = randomAvatar;
        currentAvatar.style.transform = 'scale(1)';
    }, 150);
    
    showNotification('Profile photo updated!', 'success');
}

// Handle toggle changes
function handleToggleChange(event) {
    const toggle = event.target;
    const label = toggle.closest('.toggle-label').textContent.trim();
    const isEnabled = toggle.checked;
    
    // Apply dark mode if toggled
    if (toggle.id === 'darkMode') {
        document.body.classList.toggle('dark-mode', isEnabled);
    }
    
    // Save preference
    localStorage.setItem(toggle.id, isEnabled);
    
    showNotification(`${label} ${isEnabled ? 'enabled' : 'disabled'}`, 'info');
}

// Handle input changes
function handleInputChange(event) {
    const input = event.target;
    
    // Save to localStorage
    localStorage.setItem(input.id, input.value);
    
    // Update display name if it's the name field
    if (input.id === 'fullName') {
        document.getElementById('userName').textContent = input.value;
    }
}

// Load user preferences from localStorage
function loadUserPreferences() {
    const preferences = [
        'soundAlerts', 'emailNotifications', 'darkMode', 'refreshInterval',
        'fullName', 'email', 'phone', 'department', 'shift'
    ];
    
    preferences.forEach(pref => {
        const element = document.getElementById(pref);
        if (element) {
            const savedValue = localStorage.getItem(pref);
            if (savedValue !== null) {
                if (element.type === 'checkbox') {
                    element.checked = savedValue === 'true';
                    if (pref === 'darkMode' && element.checked) {
                        document.body.classList.add('dark-mode');
                    }
                } else {
                    element.value = savedValue;
                    if (pref === 'fullName') {
                        document.getElementById('userName').textContent = savedValue;
                    }
                }
            }
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '1000',
        animation: 'slideIn 0.3s ease'
    });
    
    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Update stats (simulate real-time updates)
function updateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    const stats = [
        { element: statValues[0], base: 847, variance: 5 },
        { element: statValues[1], base: 234, variance: 2 },
        { element: statValues[2], base: 98.5, variance: 0.3, isPercentage: true },
    ];
    
    stats.forEach(stat => {
        if (stat.element) {
            const variation = (Math.random() - 0.5) * stat.variance;
            const newValue = stat.base + variation;
            
            if (stat.isPercentage) {
                stat.element.textContent = newValue.toFixed(1) + '%';
            } else {
                stat.element.textContent = Math.round(newValue);
            }
        }
    });
}

// Update stats every 30 seconds
setInterval(updateStats, 30000);