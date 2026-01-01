// Utility Functions

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');

    // Create container if it doesn't exist (failsafe, though HTML usually has it)
    if (!container) {
        // If we are on a page without the container, fallback or create it?
        // Let's rely on pages having it or failing gracefully to alert
        if (type === 'error') console.error(message);
        else console.log(message);
        // Fallback for simple pages
        // alert(message); 
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="flex-shrink: 0;">
            ${type === 'success'
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
        }
        </div>
        <div>${message}</div>
    `;

    container.appendChild(toast);

    // Auto remove after 3s
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
