# Ecom Frontend

Storefront (learning project) for an e-commerce platform where users can browse products, apply filters, manage their cart, register an account, log in, and complete purchases.  
Anonymous visitors can add items to the cart without logging in, and upon authentication, their cart is automatically transferred to their account.  
Built with React + TypeScript + Vite + TailwindCSS, fully integrated with a Spring Boot backend and Keycloak for secure authentication.

⚠️ **Educational only** — not production-ready.

## 📌 Description

This frontend allows customers to browse and purchase products from the e-commerce backend.  
It supports both anonymous and authenticated sessions, with cart persistence across login.

You can:
- Browse products with pagination and category/brand/price filters
- View product details
- Add/remove items to/from cart and adjust quantities
- Create an account and log in via Keycloak
- Automatically transfer cart from anonymous session to logged-in user
- Complete purchases (checkout)
- Track current orders and view order history

It communicates with a Spring Boot backend and uses Keycloak for authentication.

## 🧰 Tech Stack
- React + TypeScript + Vite
- TailwindCSS
- Axios (HTTP)
- React Router
- React Toastify (toasts)
- Framer Motion (animations)
- lucide-react (icons)

## 🚀 Getting Started

1) Clone the repository

```bash
git clone https://github.com/Matheus-Malara/ecom-frontend.git
cd ecom-frontend
```

2) Install dependencies

```bash
npm install
```

3) Run locally

```bash
npm run dev
```

Backend must be running at `http://localhost:8081` and Keycloak must be configured locally.  
Use `npm run preview` after building to test a production build locally.

## 🔧 NPM Scripts
- `dev` – start Vite dev server
- `build` – type-check and build production bundle
- `preview` – preview the built app
- `lint` – run ESLint

## ⚙️ Project Structure

```
src/
├─ components/     # Reusable UI elements (buttons, forms, modals, etc.)
├─ features/       # Feature-specific modules (cart, products, orders, auth)
├─ pages/          # Route-level pages (Home, Product Search, Cart, Checkout, Orders, Account)
├─ services/       # API clients, HTTP interceptors, domain services
├─ types/          # Shared TypeScript types/interfaces
├─ App.tsx         # Routes and top-level layout
├─ main.tsx        # App entry point
├─ index.css       # Tailwind base styles
└─ App.css         # Component-scoped/global overrides when needed
```

---

## 🔐 Authentication
Login and account creation are handled via backend endpoints that integrate with Keycloak.

Anonymous users can add items to the cart, and the cart is automatically transferred to their account upon login.

No `.env` is required here; the API base is `http://localhost:8081`.  
If you need a different URL, adjust the API client inside `src/services/`.

## 💡 Features
- Product listing with pagination and filters
- Product detail view
- Anonymous and authenticated carts with quantity management
- Cart transfer on login
- User registration and login via Keycloak
- Checkout flow
- Order tracking and history
- Responsive design with TailwindCSS

## 🧠 Learning Goals
Practice modern React with TypeScript, state management, API integration, authentication flows with backend + Keycloak, and building a responsive e-commerce UI.

## 🌐 Related Projects
- Admin Frontend: [ecom-frontend-admin](https://github.com/Matheus-Malara/ecom-frontend-admin)
- Backend (Spring Boot): [ecom-backend](https://github.com/Matheus-Malara/ecom-backend)

## ✅ Prerequisites
- Node.js (LTS recommended)
- Running backend at `http://localhost:8081`
- Local Keycloak instance configured for user authentication
