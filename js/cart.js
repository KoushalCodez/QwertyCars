// Cart Management

const getCart = () => {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
};

const addToCart = (carId) => {
    if (!isAuthenticated()) {
        if (typeof showToast === 'function') {
            showToast("Please login to add items to cart.", "error");
        } else {
            alert("Please login to add items to cart.");
        }
        setTimeout(() => window.location.href = 'login.html', 1000);
        return;
    }

    const cart = getCart();
    // 'cars' global variable comes from data.js
    const car = cars.find(c => c.id === carId);
    if (car) {
        cart.push(car);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartMetadata();
        if (typeof showToast === 'function') {
            showToast(`${car.name} added to cart!`);
        } else {
            alert(`${car.name} added to cart!`);
        }
    }
};

const removeFromCart = (index) => {
    const cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    renderCart();
    updateCartMetadata();
};

const updateCartMetadata = () => {
    const count = getCart().length;
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
};

// Rental Logic
const getRentalDuration = () => {
    const pDate = document.getElementById('pickup-date')?.value;
    const pTime = document.getElementById('pickup-time')?.value;
    const rDate = document.getElementById('return-date')?.value;
    const rTime = document.getElementById('return-time')?.value;

    if (!pDate || !rDate) return { days: 1, hours: 0, isValid: false };

    const start = new Date(`${pDate}T${pTime || '10:00'}`);
    const end = new Date(`${rDate}T${rTime || '10:00'}`);

    const diffMs = end - start;
    if (diffMs <= 0) return { days: 0, hours: 0, isValid: false };

    const totalHours = diffMs / (1000 * 60 * 60);
    const days = Math.floor(totalHours / 24);
    const hours = Math.floor(totalHours % 24);

    return { days, hours, totalHours, isValid: true };
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const summary = document.getElementById('cart-total');
    const cart = getCart();

    // DOM Elements
    const rentalSec = document.getElementById('rental-details-section');
    const summarySec = document.getElementById('order-summary-section');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
        <div style="text-align:center; padding: 2rem;">
            <p style="color:#888; font-size: 1.2rem; margin-bottom: 1rem;">Your cart is empty.</p>
            <a href="cars.html" class="btn btn-primary">Browse Fleet</a>
        </div>
    `;
        if (summary) summary.innerText = '₹0';

        // Hide details
        if (rentalSec) rentalSec.style.display = 'none';
        if (summarySec) summarySec.style.display = 'none';

        return;
    }

    // Show details if not empty
    if (rentalSec) rentalSec.style.display = 'block';
    if (summarySec) summarySec.style.display = 'block';

    // Calculate Duration
    const duration = getRentalDuration();
    const durationEl = document.getElementById('duration-display');

    if (duration.isValid) {
        if (durationEl) durationEl.innerText = `Duration: ${duration.days} Days, ${duration.hours} Hours`;
    } else {
        if (durationEl) durationEl.innerText = `Please select valid dates (Minimum 1 hour). Showing base daily rate.`;
    }

    // Calculate effective multiplier
    const multiplier = duration.isValid ? (duration.totalHours / 24) : 1;

    let total = 0;
    container.innerHTML = cart.map((car, index) => {
        // Car Cost for this duration
        const carCost = Math.round(car.price * multiplier);
        total += carCost;

        const priceDisplay = duration.isValid
            ? `₹${carCost} <span style="font-size:0.8em; color:#888;">(for ${duration.days}d ${duration.hours}h)</span>`
            : `₹${car.price}/day`;

        return `
      <div class="cart-item">
        <div class="flex items-center gap-1">
          <img src="${car.image}" alt="${car.name}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 4px;">
          <div>
            <div style="font-weight: 600">${car.name}</div>
            <div style="font-size: 0.85rem; color: #666">${priceDisplay}</div>
          </div>
        </div>
        <button class="btn-danger-outline" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    }).join('');

    if (summary) summary.innerText = '₹' + Math.round(total);
}

// Global calculate wrapper for event listeners
window.calculateTotal = () => {
    renderCart(); // Re-render to update prices
};

// Initialize dates with validation
const initDates = () => {
    const pDate = document.getElementById('pickup-date');
    const rDate = document.getElementById('return-date');

    if (pDate && rDate) {
        // Set min date for pickup to today
        const today = new Date().toISOString().split('T')[0];
        pDate.setAttribute('min', today);

        // Function to update return date constraints
        const updateReturnConstraints = () => {
            // Return date cannot be before pickup date
            rDate.setAttribute('min', pDate.value);

            // If return date is now invalid (less than pickup), reset it
            if (rDate.value < pDate.value) {
                rDate.value = pDate.value;
            }
            calculateTotal();
        };

        // Attach listener
        pDate.addEventListener('change', updateReturnConstraints);

        // Initial setup if empty
        if (!pDate.value) {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);

            pDate.valueAsDate = now;
            rDate.valueAsDate = tomorrow;
        }

        // Apply constraints initially
        updateReturnConstraints();
    }
}

// Checkout Navigation Guard
window.proceedToCheckout = (e) => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty! Please add a car to proceed.");
        return;
    }

    // Validate Dates
    const duration = getRentalDuration();
    if (!duration.isValid) {
        alert("Please select a valid return date (Return date must be after pickup date).");
        return;
    }

    if (!isAuthenticated()) {
        alert("Please login to complete your reservation.");
        window.location.href = 'login.html';
        return;
    }

    window.location.href = 'checkout.html';
};
