// Main Initialization Logic

document.addEventListener('DOMContentLoaded', () => {
    // Common Init
    updateCartMetadata();
    updateThemeIcon(document.body.classList.contains('dark-mode'));
    renderAuthUI();

    // Attach Theme Toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Auth Page Init
    if (document.getElementById('login-form')) {
        initAuthPage();
    }

    // Render Cars Grid (cars.html)
    const carsGrid = document.getElementById('cars-grid');
    if (carsGrid && typeof cars !== 'undefined') {
        carsGrid.innerHTML = cars.map(car => `
      <div class="car-card animate-fade-in">
        <div class="car-image">
          <img src="${car.image}" alt="${car.name}">
        </div>
        <div class="car-details">
          <h3 class="car-title">${car.name}</h3>
          <p class="car-specs">${car.specs.join(' • ')}</p>
          <span class="car-price">₹${car.price}/day</span>
          <button class="btn btn-primary" style="width: 100%" onclick="addToCart(${car.id})">
            Add to Rental Cart
          </button>
        </div>
      </div>
    `).join('');
    }

    // Render Cart Items (cart.html)
    if (document.getElementById('cart-items-container')) {
        initDates(); // Initialize dates before first render
        renderCart();
    }

    // Feedback Logic (feedback.html)
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const rating = document.getElementById('rating').value;
            const date = new Date().toLocaleString();

            const content = `FEEDBACK REPORT\n----------------\nName: ${name}\nEmail: ${email}\nRating: ${rating}/5\n\nMessage:\n${message}\n----------------\nDate: ${date}`;

            // 1. User Download (Individual File)
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `feedback-${name.replace(/\s+/g, '-').toLowerCase()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // 2. Company Record (Background Storage)
            const feedbackEntry = {
                name,
                email,
                rating,
                message,
                date
            };

            const history = JSON.parse(localStorage.getItem('qwertyFeedbackHistory')) || [];
            history.push(feedbackEntry);
            localStorage.setItem('qwertyFeedbackHistory', JSON.stringify(history));

            alert('Thank you for your feedback! The file has been downloaded.');
            feedbackForm.reset();
        });

        // Admin Export Listener
        const exportBtn = document.getElementById('admin-export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const history = JSON.parse(localStorage.getItem('qwertyFeedbackHistory')) || [];
                if (history.length === 0) {
                    alert('No company records found.');
                    return;
                }

                let masterContent = "COMPANY FEEDBACK MASTER RECORD\n================================\n\n";
                history.forEach((entry, index) => {
                    masterContent += `RECORD #${index + 1}\n`;
                    masterContent += `Date: ${entry.date}\n`;
                    masterContent += `Name: ${entry.name} (${entry.email})\n`;
                    masterContent += `Rating: ${entry.rating}/5\n`;
                    masterContent += `Message: ${entry.message}\n`;
                    masterContent += `--------------------------------\n\n`;
                });

                const blob = new Blob([masterContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `company_feedback_master_${new Date().toISOString().slice(0, 10)}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }
    }

    // Checkout Form Logic
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        if (getCart().length === 0) {
            alert("Your cart is empty.");
            window.location.href = 'index.html';
            return;
        }

        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Start your engines! Order placed successfully. \nThank you for choosing QwertyCars.');

            // Clear cart
            localStorage.setItem(cartKey, JSON.stringify([]));
            window.location.href = 'index.html';
        });
    }
});
