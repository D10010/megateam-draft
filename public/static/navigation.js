// Navigation JavaScript Functions
function toggleMobileMegateamMenu() {
  const submenu = document.getElementById('mobile-megateam-submenu');
  const arrow = document.getElementById('mobile-megateam-arrow');
  
  if (submenu && arrow) {
    if (submenu.classList.contains('hidden')) {
      submenu.classList.remove('hidden');
      arrow.classList.add('rotate-180');
    } else {
      submenu.classList.add('hidden');
      arrow.classList.remove('rotate-180');
    }
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('mobile-menu-toggle');
  
  if (menu && toggle) {
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      toggle.classList.add('active');
    } else {
      menu.classList.add('hidden');
      toggle.classList.remove('active');
    }
  }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Navigation JavaScript loaded');
  
  // Make functions globally available
  window.toggleMobileMegateamMenu = toggleMobileMegateamMenu;
  window.toggleMobileMenu = toggleMobileMenu;
});