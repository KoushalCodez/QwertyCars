# QwertyCars

A premium, static web application for luxury car rentals. Built with modern web technologies, QwertyCars offers a seamless user experience with advanced client-side functionality, persistent authentication, and a refined glassmorphism aesthetic.

![Banner](assets/hero-bg.jpg)

## Features

### Authentication & Security
*   **Client-Side Authentication**: Secure-feel login and registration system using LocalStorage.
*   **Session Persistence**: Users remain logged in across page reloads.
*   **Access Control**: Protected routes and actions (e.g., adding to cart) require active authentication.
*   **Input Validation**: Duplicate email detection and credential verification.

### Core Functionality
*   **Dynamic Cart System**: Real-time calculation of rental costs based on duration (days/hours).
*   **Smart State Management**: Cart automatically clears upon logout to ensure privacy.
*   **Interactive UI**: Elements respond dynamically to user state (e.g., empty cart illustrations, auth-gated buttons).
*   **Feedback System**: Users can submit feedback which is stored locally and generated as a downloadable record.

### User Interface
*   **Responsive Design**: Fully responsive layout optimized for all device sizes.
*   **Theme Engine**: Built-in dark mode with persistent user preference.
*   **Visual Feedback**: Custom toast notification system replacing standard browser alerts.

## Technology Stack
*   **HTML5**
*   **CSS3** (Variables, Flexbox, Grid, Animations)
*   **JavaScript ES6+** (Modular architecture)

## Installation & Usage

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/car-rental-QwertyCars.git
    ```

2.  **Run the Application**
    *   Navigate to the project directory.
    *   Open `index.html` in any modern web browser.
    *   *Recommendation*: Use VS Code's **Live Server** extension for the best experience.

## Project Structure

```
/
├── assets/             # Images and static resources
├── css/
│   └── style.css       # Global stylesheet and theme definitions
├── js/
│   ├── auth.js         # Authentication logic (Login/Register/Session)
│   ├── cart.js         # Shopping cart and rental calculation logic
│   ├── main.js         # Application entry point and event initialization
│   ├── theme.js        # Theme toggle logic
│   ├── utils.js        # UI utilities and helper functions
│   └── data.js         # Mock data for car fleet
├── index.html          # Homepage
├── cars.html           # Fleet listing page
├── cart.html           # Shopping cart and checkout
├── login.html          # Authentication page
└── feedback.html       # Feedback submission form
```

## License
This project is licensed under the MIT License.
