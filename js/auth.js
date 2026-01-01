// Authentication Logic

function isAuthenticated() {
    return !!localStorage.getItem(authKey);
}

function renderAuthUI() {
    // We need to find where to put the Login/Logout button in the nav.
    // The nav structure is: .nav-links > [Home, Fleet, Feedback, ThemeBtn, Cart]

    let authBtn = document.getElementById('nav-auth-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!navLinks) return;

    // Create if doesn't exist
    if (!authBtn) {
        authBtn = document.createElement('a');
        authBtn.id = 'nav-auth-btn';
        authBtn.className = 'btn-sm';
        authBtn.style.marginLeft = '1rem';
        authBtn.style.cursor = 'pointer';

        // Insert before the theme button or append
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            navLinks.insertBefore(authBtn, cartIcon);
        } else {
            navLinks.appendChild(authBtn);
        }
    }

    if (isAuthenticated()) {
        const user = JSON.parse(localStorage.getItem(authKey));
        authBtn.textContent = `Logout (${user.name})`;
        authBtn.href = "#";
        authBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem(authKey);
            localStorage.removeItem(cartKey); // Clear cart on logout

            if (document.getElementById('toast-container')) {
                showToast("Logged out successfully.");
                setTimeout(() => window.location.href = 'index.html', 1000);
            } else {
                alert("Logged out successfully.");
                window.location.href = 'index.html';
            }
        };
        // Style as outline or text
        authBtn.style.background = 'transparent';
        authBtn.style.border = '1px solid var(--text-main)'; // using variable from CSS? Need to check if JS can access. Assuming var exists or fallback
        authBtn.style.color = 'var(--text-main)';
        authBtn.style.padding = '0.4rem 0.8rem';
        authBtn.style.borderRadius = 'var(--radius-sm)';
    } else {
        authBtn.textContent = "Login";
        authBtn.href = "login.html";
        authBtn.onclick = null;
        // Style as primary
        authBtn.style.background = 'var(--primary)';
        authBtn.style.border = 'none';
        authBtn.style.color = 'white';
        authBtn.style.padding = '0.4rem 1rem';
        authBtn.style.borderRadius = 'var(--radius-sm)';
    }
}

// Form Toggling (for login.html)
window.toggleAuthMode = () => {
    const loginSec = document.getElementById('login-section');
    const regSec = document.getElementById('register-section');

    if (loginSec.style.display === 'none') {
        loginSec.style.display = 'block';
        loginSec.classList.add('animate-fade-in-up');
        regSec.style.display = 'none';
    } else {
        loginSec.style.display = 'none';
        regSec.style.display = 'block';
        regSec.classList.add('animate-fade-in-up');
    }
};

// Login/Register Form Handlers
const initAuthPage = () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const users = JSON.parse(localStorage.getItem(usersKey)) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Success
                const sessionUser = { name: user.name, email: user.email };
                localStorage.setItem(authKey, JSON.stringify(sessionUser));

                showToast(`Welcome back, ${user.name}!`, 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // Failure
                showToast('Invalid email or password.', 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            // Validation
            if (password.length < 6) {
                showToast('Password must be at least 6 characters.', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem(usersKey)) || [];

            // Duplicate check
            if (users.some(u => u.email === email)) {
                showToast('Email already registered. Please login.', 'error');
                return;
            }

            // Register
            users.push({ name, email, password });
            localStorage.setItem(usersKey, JSON.stringify(users));

            showToast('Account created successfully! Please sign in.', 'success');

            // Switch to login
            toggleAuthMode();

            // Pre-fill login
            document.getElementById('login-email').value = email;
        });
    }
};
