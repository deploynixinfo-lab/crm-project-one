// DOM Elements
const timeTrackingModal = document.getElementById('timeTrackingModal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const timeForm = document.querySelector('.time-form');

// Modal Functions
function openModal() {
    timeTrackingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add animation class for smooth entrance
    setTimeout(() => {
        timeTrackingModal.querySelector('.modal').style.transform = 'scale(1)';
        timeTrackingModal.querySelector('.modal').style.opacity = '1';
    }, 10);
}

function closeModal() {
    timeTrackingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset modal transform
    timeTrackingModal.querySelector('.modal').style.transform = 'scale(0.9)';
    timeTrackingModal.querySelector('.modal').style.opacity = '0';
}

// Event Listeners
if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if (timeTrackingModal) {
    timeTrackingModal.addEventListener('click', (e) => {
        if (e.target === timeTrackingModal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && timeTrackingModal.classList.contains('active')) {
        closeModal();
    }
});

// Form Submission
if (timeForm) {
    timeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(timeForm);
        const timeSpent = document.getElementById('timeSpent').value;
        const date = document.getElementById('datePicker').value;
        const time = document.getElementById('timePicker').value;
        const description = document.getElementById('workDescription').value;
        
        // Validate form
        if (!timeSpent || !date || !time || !description.trim()) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Time logged successfully!', 'success');
        
        // Close modal after successful submission
        setTimeout(() => {
            closeModal();
            timeForm.reset();
        }, 1500);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Initialize modal transform
document.addEventListener('DOMContentLoaded', () => {
    if (timeTrackingModal) {
        const modal = timeTrackingModal.querySelector('.modal');
        modal.style.transform = 'scale(0.9)';
        modal.style.opacity = '0';
        modal.style.transition = 'all 0.3s ease';
    }
});

// Search functionality
const searchInputs = document.querySelectorAll('input[placeholder="Search..."]');
searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Add search logic here based on your needs
        console.log('Searching for:', searchTerm);
    });
});

// Profile dropdown functionality
const profileBtn = document.querySelector('.profile-btn');
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        // Toggle dropdown menu
        const dropdown = profileBtn.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.classList.toggle('active');
        } else {
            // Create dropdown if it doesn't exist
            createProfileDropdown();
        }
    });
}

function createProfileDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-menu';
    dropdown.innerHTML = `
        <a href="#" class="dropdown-item">
            <i class="fas fa-user"></i>
            Profile
        </a>
        <a href="#" class="dropdown-item">
            <i class="fas fa-cog"></i>
            Settings
        </a>
        <a href="#" class="dropdown-item">
            <i class="fas fa-sign-out-alt"></i>
            Logout
        </a>
    `;
    
    // Add dropdown styles
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 12px;
        padding: 8px 0;
        margin-top: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.2);
        min-width: 180px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;
    
    // Add dropdown item styles
    const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            color: #333;
            text-decoration: none;
            transition: background-color 0.3s ease;
            font-size: 14px;
        `;
        
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });
    });
    
    // Position the dropdown
    profileBtn.style.position = 'relative';
    profileBtn.appendChild(dropdown);
    
    // Show dropdown with animation
    setTimeout(() => {
        dropdown.style.opacity = '1';
        dropdown.style.transform = 'translateY(0)';
    }, 10);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target)) {
            dropdown.remove();
        }
    });
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('save-task-btn') || this.classList.contains('log-time-btn')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Reset button after 2 seconds (simulate loading)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.nav-item, .project-attachments i').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

console.log('Time Tracking application loaded successfully!'); 