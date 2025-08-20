// Projects Page Interactivity
// Sidebar active state, profile dropdown, project panel selection, and drag-and-drop for tasks

document.addEventListener('DOMContentLoaded', function () {
  // Sidebar active highlight
  document.querySelectorAll('.sidebar-menu li').forEach(function (li) {
    li.addEventListener('click', function () {
      document.querySelectorAll('.sidebar-menu li').forEach(function (el) {
        el.classList.remove('active');
      });
      li.classList.add('active');
    });
  });

  // Profile dropdown toggle
  const profileDropdown = document.querySelector('.profile-dropdown');
  if (profileDropdown) {
    const btn = profileDropdown.querySelector('.dropdown-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      profileDropdown.classList.remove('open');
    });
  }

  // Project panel selection and navigation
  document.querySelectorAll('.project-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      document.querySelectorAll('.project-item').forEach(function (el) {
        el.classList.remove('active');
      });
      item.classList.add('active');
      // Navigate to medical-ios.html if Medical App (iOS native) is clicked
      if (item.querySelector('.project-title') && item.querySelector('.project-title').textContent.trim() === 'Medical App (iOS native)') {
        window.location.href = 'medical-ios.html';
      }
    });
  });

  // Add Project button hover effect (ripple)
  const addProjectBtn = document.querySelector('.add-project-btn');
  if (addProjectBtn) {
    addProjectBtn.addEventListener('mousedown', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = e.offsetX + 'px';
      ripple.style.top = e.offsetY + 'px';
      addProjectBtn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  }
  // --- Drag and Drop for Task Cards ---
  const draggables = document.querySelectorAll('.task-card');
  const columns = document.querySelectorAll('.tasks-cards');
  const backlog = document.querySelector('.backlog-section .tasks-table-rows');

  draggables.forEach(card => {
    card.addEventListener('dragstart', function (e) {
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.dataset.id);
    });
    card.addEventListener('dragend', function () {
      card.classList.remove('dragging');
    });
  });

  function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
  }
  function handleDragLeave() {
    this.classList.remove('drag-over');
  }
  function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const card = document.querySelector('.task-card[data-id="' + id + '"]');
    if (card) this.appendChild(card);
  }

  columns.forEach(col => {
    col.addEventListener('dragover', handleDragOver);
    col.addEventListener('dragleave', handleDragLeave);
    col.addEventListener('drop', handleDrop);
  });
  if (backlog) {
    backlog.addEventListener('dragover', handleDragOver);
    backlog.addEventListener('dragleave', handleDragLeave);
    backlog.addEventListener('drop', handleDrop);
  }
});

// Optional: Add ripple effect styles in CSS if desired
