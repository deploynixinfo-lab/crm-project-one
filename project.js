// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeDashboard();
    
    function initializeDashboard() {
        // Check if we're on the tasks page
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage === 'medical-ios-tasks.html') {
            initializeTasksPage();
        } else {
            // Initialize regular dashboard functionality
            initializeSidebarNavigation();
            initializeTaskTabs();
            initializeSearch();
            initializeAddProjectButton();
            initializeDragAndDrop();
            initializeMobileMenu();
            initializeKeyboardShortcuts();
            initializeProjectClicks();
        }
        
        console.log('Medical App Project Dashboard initialized successfully!');
    }
    
    // Initialize tasks page functionality
    function initializeTasksPage() {
        initializeSidebarNavigation();
        initializeSearch();
        initializeAddProjectButton();
        initializeMobileMenu();
        initializeKeyboardShortcuts();
        initializeTimelineInteractions();
        
        console.log('Medical iOS Tasks page initialized successfully!');
    }
    
    // Initialize timeline interactions
    function initializeTimelineInteractions() {
        const timelineCells = document.querySelectorAll('.timeline-cell.active');
        
        timelineCells.forEach(cell => {
            cell.addEventListener('click', function() {
                const days = this.getAttribute('data-days');
                if (days) {
                    showNotification(`Task scheduled for days ${days}`, 'info');
                }
            });
            
            // Add tooltip on hover
            cell.addEventListener('mouseenter', function() {
                const days = this.getAttribute('data-days');
                if (days) {
                    this.title = `Task scheduled for days ${days}`;
                }
            });
        });
        
        // Add click functionality to project items on tasks page
        const projectItemsTasks = document.querySelectorAll('.project-item-tasks');
        projectItemsTasks.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all projects
                projectItemsTasks.forEach(pi => pi.classList.remove('active'));
                
                // Add active class to clicked project
                this.classList.add('active');
                
                // Show notification
                const projectTitle = this.querySelector('.project-title').textContent;
                showNotification(`Project "${projectTitle}" selected`, 'info');
            });
        });
    }
    
    // Initialize project click functionality for "View Details" toggle
    function initializeProjectClicks() {
        const projectItems = document.querySelectorAll('.project-item');
        
        projectItems.forEach(item => {
            item.addEventListener('click', function() {
                // Check if this is the Medical App project
                const projectTitle = this.querySelector('.project-title').textContent;
                if (projectTitle === 'Medical App (iOS native)') {
                    // Navigate to the tasks page
                    window.location.href = 'medical-ios-tasks.html';
                    return;
                }
                
                // Remove active class from all projects
                projectItems.forEach(pi => pi.classList.remove('active'));
                
                // Add active class to clicked project
                this.classList.add('active');
                
                // Hide all "View details" links
                const allLinks = document.querySelectorAll('.project-link');
                allLinks.forEach(link => {
                    link.style.display = 'none';
                });
                
                // Show "View details" for active project
                const activeLink = this.querySelector('.project-link');
                if (activeLink) {
                    activeLink.style.display = 'block';
                }
                
                // Log the selected project
                console.log(`Selected project: ${projectTitle}`);
                
                // Show notification
                showNotification(`Project "${projectTitle}" selected`, 'info');
            });
        });
    }
    
    // Initialize sidebar navigation
    function initializeSidebarNavigation() {
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        
        sidebarItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                sidebarItems.forEach(si => si.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Handle specific navigation
                const itemText = this.querySelector('span').textContent.toLowerCase();
                handleNavigation(itemText);
            });
        });
    }
    
    // Handle navigation based on sidebar item
    function handleNavigation(itemText) {
        switch(itemText) {
            case 'dashboard':
                window.location.href = 'CRM/dashboard.html';
                break;
            case 'projects':
                window.location.href = 'CRM/projects.html';
                break;
            case 'calendar':
                console.log('Navigate to Calendar');
                showNotification('Calendar navigation clicked', 'info');
                break;
            case 'vacations':
                console.log('Navigate to Vacations');
                showNotification('Vacations navigation clicked', 'info');
                break;
            case 'employees':
                console.log('Navigate to Employees');
                showNotification('Employees navigation clicked', 'info');
                break;
            case 'messenger':
                console.log('Navigate to Messenger');
                showNotification('Messenger navigation clicked', 'info');
                break;
            case 'info portal':
                console.log('Navigate to Info Portal');
                showNotification('Info Portal navigation clicked', 'info');
                break;
        }
    }
    
    // Initialize task tabs
    function initializeTaskTabs() {
        const taskTabs = document.querySelectorAll('.task-tab');
        
        taskTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                taskTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Handle tab switching
                const tabText = this.textContent;
                console.log(`Switched to ${tabText} tab`);
                
                // Update task content based on selected tab
                updateTaskContent(tabText);
                
                // Show notification
                showNotification(`Switched to ${tabText} tab`, 'info');
            });
        });
    }
    
    // Update task content based on selected tab
    function updateTaskContent(tabName) {
        const activeTasks = document.querySelector('.active-tasks');
        const backlogTasks = document.querySelector('.backlog-tasks');
        
        // Example: Show different content based on tab
        switch(tabName) {
            case 'To Do':
                activeTasks.style.display = 'block';
                backlogTasks.style.display = 'block';
                break;
            case 'In Progress':
                activeTasks.style.display = 'block';
                backlogTasks.style.display = 'none';
                break;
            case 'In Review':
                activeTasks.style.display = 'block';
                backlogTasks.style.display = 'none';
                break;
            case 'Done':
                activeTasks.style.display = 'none';
                backlogTasks.style.display = 'none';
                // You could show completed tasks here
                break;
        }
    }
    
    // Initialize search functionality
    function initializeSearch() {
        const searchInput = document.querySelector('.search-input');
        
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                performSearch(searchTerm);
            });
            
            // Clear search on escape key
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    this.value = '';
                    performSearch('');
                }
            });
        }
    }
    
    // Perform search through projects and tasks
    function performSearch(searchTerm) {
        // Search through projects
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            const projectTitle = item.querySelector('.project-title').textContent.toLowerCase();
            const projectId = item.querySelector('.project-id').textContent.toLowerCase();
            
            if (projectTitle.includes(searchTerm) || projectId.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Search through tasks
        const taskCards = document.querySelectorAll('.task-card');
        taskCards.forEach(card => {
            const taskTitle = card.querySelector('.task-title').textContent.toLowerCase();
            const taskId = card.querySelector('.task-id').textContent.toLowerCase();
            
            if (taskTitle.includes(searchTerm) || taskId.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show search notification
        if (searchTerm) {
            showNotification(`Searching for: "${searchTerm}"`, 'info');
        }
    }
    
    // Initialize add project button
    function initializeAddProjectButton() {
        const addProjectBtn = document.querySelector('.add-project-btn');
        
        if (addProjectBtn) {
            addProjectBtn.addEventListener('click', function() {
                showAddProjectModal();
            });
        }
    }
    
    // Show add project modal
    function showAddProjectModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Add New Project</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="add-project-form">
                        <div class="form-group">
                            <label for="project-name">Project Name</label>
                            <input type="text" id="project-name" required>
                        </div>
                        <div class="form-group">
                            <label for="project-description">Description</label>
                            <textarea id="project-description" rows="3"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="cancel-btn">Cancel</button>
                            <button type="submit" class="submit-btn">Add Project</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                backdrop-filter: blur(5px);
            }
            .modal {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-radius: 16px;
                padding: 0;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 10px 30px rgba(106, 90, 205, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 25px;
                border-bottom: 1px solid rgba(240, 240, 240, 0.5);
            }
            .modal-header h3 {
                margin: 0;
                color: #333333;
            }
            .close-btn {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999999;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            .close-btn:hover {
                background: rgba(106, 90, 205, 0.1);
                color: #6A5ACD;
            }
            .modal-body {
                padding: 25px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #333333;
            }
            .form-group input,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid rgba(224, 224, 224, 0.5);
                border-radius: 8px;
                font-size: 14px;
                transition: all 0.3s ease;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
            }
            .form-group input:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #6A5ACD;
                box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.1);
            }
            .form-actions {
                display: flex;
                gap: 15px;
                justify-content: flex-end;
                margin-top: 25px;
            }
            .cancel-btn,
            .submit-btn {
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .cancel-btn {
                background: rgba(240, 240, 240, 0.8);
                color: #666666;
                border: 1px solid rgba(224, 224, 224, 0.5);
            }
            .cancel-btn:hover {
                background: rgba(224, 224, 224, 0.9);
                transform: translateY(-1px);
            }
            .submit-btn {
                background: linear-gradient(135deg, #6A5ACD 0%, #8A7FD1 100%);
                color: white;
                border: 1px solid #6A5ACD;
            }
            .submit-btn:hover {
                background: linear-gradient(135deg, #5A4ACD 0%, #7A6FD1 100%);
                transform: translateY(-1px);
                box-shadow: 0 4px 16px rgba(106, 90, 205, 0.3);
            }
        `;
        
        document.head.appendChild(modalStyles);
        document.body.appendChild(modal);
        
        // Handle modal events
        const closeBtn = modal.querySelector('.close-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const form = modal.querySelector('#add-project-form');
        
        closeBtn.addEventListener('click', () => removeModal());
        cancelBtn.addEventListener('click', () => removeModal());
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                removeModal();
            }
        });
        
        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectName = document.getElementById('project-name').value;
            const projectDescription = document.getElementById('project-description').value;
            
            addProjectToList(projectName, projectDescription);
            removeModal();
        });
        
        function removeModal() {
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
        }
    }
    
    // Add project to list
    function addProjectToList(name, description) {
        const projectsList = document.querySelector('.projects-list');
        if (projectsList) {
            const newProject = document.createElement('div');
            newProject.className = 'project-item';
            newProject.setAttribute('data-project', `new-${Date.now()}`);
            newProject.innerHTML = `
                <div class="project-id">PN${Math.floor(Math.random() * 1000000).toString().padStart(7, '0')}</div>
                <div class="project-title">${name}</div>
                <div class="project-link" style="display: none;">
                    <a href="#" class="view-details">View details ></a>
                </div>
            `;
            
            // Add to the end of the list
            projectsList.appendChild(newProject);
            
            // Add click event to new project
            newProject.addEventListener('click', function() {
                // Remove active class from all projects
                const allProjects = document.querySelectorAll('.project-item');
                allProjects.forEach(pi => pi.classList.remove('active'));
                
                // Add active class to this project
                this.classList.add('active');
                
                // Hide all "View details" links
                const allLinks = document.querySelectorAll('.project-link');
                allLinks.forEach(link => {
                    link.style.display = 'none';
                });
                
                // Show "View details" for this project
                const link = this.querySelector('.project-link');
                if (link) {
                    link.style.display = 'block';
                }
                
                console.log(`Clicked on new project: ${name}`);
            });
            
            // Show success message
            showNotification(`Project "${name}" added successfully!`, 'success');
        }
    }
    
    // Initialize drag and drop functionality
    function initializeDragAndDrop() {
        const taskCards = document.querySelectorAll('.task-card');
        const taskTabs = document.querySelectorAll('.task-tab');
        
        taskCards.forEach(card => {
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragend', handleDragEnd);
        });
        
        taskTabs.forEach(tab => {
            tab.addEventListener('dragover', handleDragOver);
            tab.addEventListener('drop', handleDrop);
            tab.addEventListener('dragenter', handleDragEnter);
            tab.addEventListener('dragleave', handleDragLeave);
        });
    }
    
    // Drag and drop event handlers
    function handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.id || 'task-card');
        e.dataTransfer.effectAllowed = 'move';
    }
    
    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    function handleDragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drop-zone');
    }
    
    function handleDragLeave(e) {
        e.target.classList.remove('drop-zone');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        e.target.classList.remove('drop-zone');
        
        const draggedCard = document.querySelector('.dragging');
        if (draggedCard) {
            const tabName = e.target.textContent;
            console.log(`Task moved to ${tabName} tab`);
            
            // You can implement logic to move the task to a different status
            showNotification(`Task moved to ${tabName}`, 'info');
        }
    }
    
    // Initialize mobile menu
    function initializeMobileMenu() {
        // Create mobile menu toggle button
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        document.body.appendChild(mobileToggle);
        
        const sidebar = document.querySelector('.sidebar');
        
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            this.innerHTML = sidebar.classList.contains('open') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars">';
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 480 && 
                !sidebar.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Initialize keyboard shortcuts
    function initializeKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to close modals or clear search
            if (e.key === 'Escape') {
                const searchInput = document.querySelector('.search-input');
                if (searchInput && searchInput.value) {
                    searchInput.value = '';
                    performSearch('');
                }
                
                // Close mobile menu
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                    const mobileToggle = document.querySelector('.mobile-menu-toggle');
                    if (mobileToggle) {
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add notification styles
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 3000;
                display: flex;
                align-items: center;
                gap: 15px;
                animation: slideIn 0.3s ease;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            .notification-info {
                background: rgba(106, 90, 205, 0.9);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .notification-success {
                background: rgba(40, 167, 69, 0.9);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .notification-error {
                background: rgba(220, 53, 69, 0.9);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(notificationStyles);
        document.body.appendChild(notification);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
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
    
    // Add tooltips for better UX
    function initializeTooltips() {
        const elementsWithTooltips = document.querySelectorAll('[title]');
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.title;
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(51, 51, 51, 0.9);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    z-index: 1000;
                    pointer-events: none;
                    white-space: nowrap;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
                
                this._tooltip = tooltip;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this._tooltip) {
                    document.body.removeChild(this._tooltip);
                    this._tooltip = null;
                }
            });
        });
    }
    
    // Initialize tooltips
    initializeTooltips();
}); 