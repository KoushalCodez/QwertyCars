# QwertyCars - Premium Car Rental Platform 🚗✨

A modern, responsive, and feature-rich static web application for a luxury car rental service. Built with Vanilla HTML, CSS, and JavaScript, focusing on client-side logic and a premium user experience.

![Project Preview](assets/hero-bg.jpg)
*(Note: Replace `assets/hero-bg.jpg` with a real screenshot of your app if desired)*

## 🌟 Features

### 🔐 Advanced Authentication (Client-Side)
- **Registration & Login**: Users can create accounts and log in securely (simulated via `localStorage`).
- **Session Management**: Persistent login sessions.
- **Strict Cart Permissions**: Users must be logged in to rent cars.
- **Smart Validation**: Email duplicate checks and secure password handling (mock).

### 🛒 Dynamic Shopping Cart
- **Real-time Calculations**: Automatically calculates rental duration (Days/Hours) and total cost.
- **Gated Access**: Cart restricts actions for non-logged-in users.
- **Auto-Cleanup**: Cart data is automatically cleared upon logout for privacy.
- **Smart UI**: Hides complex details when the cart is empty for a cleaner look.

### 🌓 UI/UX & Theming
- **Glassmorphism Design**: High-end, translucent aesthetic.
- **Dark/Light Mode**: Fully toggleable theme with persistent preference storage.
- **Toast Notifications**: Replaces intrusive browser alerts with smooth, animated custom toasts.
- **Responsive Layout**: Works seamlessly on desktop and mobile.

### 📝 Feedback & Admin System
- **User Feedback**: Users can submit feedback and download a confirmation file.
- **Company Records**: All feedback is silently stored in the background.
- **Admin Export**: Hidden "Admin" functionality to export a master file of all submitted feedback.

## 🛠️ Technology Stack
- **HTML5**: Semantic structure.
- **CSS3**: Custom variables, keyframe animations, glassmorphism, responsive Grid/Flexbox.
- **JavaScript (ES6+)**: Modular architecture (`auth.js`, `cart.js`, `theme.js`, etc.) with `localStorage` for state management.

## 📂 Project Structure
```
/
├── index.html        # Landing page
├── cars.html         # Fleet listing
├── cart.html         # Shopping cart & checkout logic
├── login.html        # Auth portal (Login/Register)
├── feedback.html     # User feedback form
├── css/
│   └── style.css     # Global styles & themes
└── js/
    ├── main.js       # App entry point
    ├── auth.js       # Authentication logic
    ├── cart.js       # Cart & Rental logic
    ├── theme.js      # Theme toggling
    ├── utils.js      # Helpers (Toasts, etc.)
    ├── data.js       # Car data (mock database)
    └── constants.js  # Global configuration
```

## 🚀 How to Run
Since this is a static application, no backend server is required!

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/car-rental-QwertyCars.git
    ```
2.  **Open in Browser**:
    Simply double-click `index.html` to launch the application.
3.  **For Best Experience**:
    Use VS Code with the "Live Server" extension to handle local routing smoothly.

## 🧪 How to Use

### 1. Register a User
- Go to `Login` > `Create Account`.
- Sign up with your details.
- You will be auto-redirected to Login.

### 2. Rent a Car
- Go to `Fleet` (`cars.html`).
- Click "Add to Rental Cart".
- Go to `Cart` (`cart.html`).
- Select your Pick-up and Return dates.
- Watch the price update automatically!

### 3. Admin Features
- Go to `Feedback` (`feedback.html`).
- Scroll to the bottom to find the "Export Company Records" button.

## 📄 License
This project is open-source and available for educational purposes.

---
*Built with ❤️ by [Your Name]*
